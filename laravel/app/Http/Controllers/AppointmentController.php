<?php

namespace App\Http\Controllers;

use App\AdminUser;
use App\Appointment;
use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Resources\Admin\AdminUserResource;
use App\Http\Resources\AppointmentResource;
use App\Service;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return AppointmentResource::collection($this->getSalon()->appointments);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreAppointmentRequest $request)
    {
        $appointment = Appointment::create($request->input());
        $salon = $this->getSalon();
        $salon->appointments()->save($appointment);
        return AppointmentResource::collection($this->getSalon()->appointments);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
