<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateOpeningHoursRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        return [
            'open' => [
                function ($key, $value, $callback) use ($weekDays) {
                    $closeTime = $this->close ?? $this->route('openingHour')->close;
                    if (strtotime($value) < strtotime($closeTime)) return;
                    $callback('The opening time must be before closing time on ' . $weekDays[$this->route('openingHour')->day]);
                },
            ],
            'close' => [
                function ($key, $value, $callback) use ($weekDays) {
                    // If validation already appening on open, we don't need to check close
                    if ($this->open) {
                        return;
                    }
                    $openTime = $this->route('openingHour')->open;
                    if (strtotime($value) > strtotime($openTime)) return;
                    $callback('The closing time must be after opening time on ' . $weekDays[$this->route('openingHour')->day]);
                },
            ],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [];
    }
}
