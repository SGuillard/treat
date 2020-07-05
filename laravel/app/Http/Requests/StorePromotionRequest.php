<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePromotionRequest extends FormRequest
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
            'name' => 'string | required',
            'start_date' => 'required | date',
            'end_date' => 'required | date | after:start_date',
            'day' => 'integer | between:0,8',
            'start_hour' => 'date_format:H:i:s',
            'end_hour' => 'date_format:H:i:s',
            'discount' => 'integer',
            'service' => 'required | exists:services'
        ];
    }
}
