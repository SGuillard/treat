<?php

namespace Tests;

use Carbon\Carbon;
use Exception;

abstract class AbstractTestCase extends TestCase
{

    private function catchFormDataErrors()
    {
        if (!isset($this->apiUrl)) {
            throw new Exception('Api Url is not defined');
        }
        if (!isset($this->record)) {
            throw new Exception('You must initiate the record you are testing in the set up function. 
            (e.g. $this->record = new Promotion)'
                . PHP_EOL);
        }
        if (!isset($this->submitMethod)) {
            throw new Exception('You must initiate the method you are testing in the set up function. 
            (e.g. $this->submitMethod = "PATCH")'
                . PHP_EOL);
        }
    }

    private function validateData()
    {
        try {
            $this->catchFormDataErrors();
        } catch (Exception $e) {
            echo $e;
            die;
        }
    }

    private function makeItFailsWithAString($field)
    {
        $this->validateData();
        $this->record->{$field} = 'this is a string. Not a date';
        $this->generateRequestValidationError($field);
    }

    protected function fieldIsTime(string $field)
    {
        $this->makeItFailsWithAString($field);
    }

    protected function fieldIsRequired(string $field)
    {
        $this->validateData();
        $this->record->{$field} = null;
        $this->generateRequestValidationError($field);
    }

    protected function fieldIsDateTime($field)
    {
        $this->makeItFailsWithAString($field);
    }

    protected function fieldIsString($field)
    {
        $this->validateData();
        $this->record->{$field} = 45;
        $this->generateRequestValidationError($field);
    }

    protected function fieldIsNumber($field)
    {
        $this->validateData();
        $this->record->{$field} = 'This is not a number';
        $this->generateRequestValidationError($field);
    }

    protected function fieldExists($field)
    {
        $this->validateData();
        $this->record->{$field} = 0;
        $this->generateRequestValidationError($field);
    }

    private function checkDataIsBetween($start, $end)
    {
        if(!\is_int($start) || !\is_int($end)) {
            throw new \Error('Arguments passed to function FieldIsBetween must be of type integer');
        }
        if($start >= $end) {
            throw new \Error('Argument one passed to function FieldIsBetween must be lower that argument two');
        }
    }

    protected function fieldIsBetween(string $field, int $start, int $end)
    {
        $this->validateData();
        try {
            $this->checkDataIsBetween($start, $end);
        } catch (\Exception $e) {
            echo $e; die;
        }

        $this->record->{$field} = $end + 1;
        $this->generateRequestValidationError($field);
    }

//>fieldIsNumber('day');
//$this->fieldIsBetween(0, 8);

    protected function firstDateIsAfterSecondDate($firstDateField, $secondDateField)
    {
        $this->validateData();
        $this->record->{$firstDateField} = Carbon::now();
        $this->record->{$secondDateField} = Carbon::now()->addHour();
        $this->generateRequestValidationError($firstDateField);
    }

    private function generateRequestValidationError($formAttribute)
    {
        $response = $this->{$this->submitMethod}($this->apiUrl, $this->record->toArray());
        $response->assertSessionHasErrors($formAttribute);
    }
}
