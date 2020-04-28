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
        return [
            'open' => [
                function ($key, $value, $callback) {
                    // Get the current id if there is one
                    $closeTime = $this->close ?? $this->route('openingHour')->close;
                    if(strtotime($value) < strtotime($closeTime)) return;
                    $callback('The opening time must be before closing time');
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
        return [
            'open.before' => 'OK TOP',
            'body.required' => 'A message is required',
        ];
    }
}
