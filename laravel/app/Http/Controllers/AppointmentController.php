<?php

namespace App\Http\Controllers;

use App\Appointment;
use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Resources\AppointmentResource;
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
        return $this->getAppointmentList();
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
        return $this->getAppointmentList();
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
     * @param Appointment $appointment
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function update(Request $request, Appointment $appointment)
    {
        $appointment->update($request->input());
        return $this->getAppointmentList();
    }

    /**
     * @param Appointment $appointment
     * @throws \Exception
     */
    public function destroy(Appointment $appointment)
    {
        $appointment->delete();
        return $this->getAppointmentList();
    }

    private function getAppointmentList()
    {
        return AppointmentResource::collection($this->getSalon()->appointments);
    }
}
