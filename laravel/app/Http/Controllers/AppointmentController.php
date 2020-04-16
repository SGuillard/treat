<?php

namespace App\Http\Controllers;

use App\AdminUser;
use App\Appointment;
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
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//        $newUser = AdminUser::create($request->input());

        $appointment = new Appointment();
        $appointment->salon()->associate($this->getSalon());
        // Admin User
        $adminPerson = AdminUser::findOrFail(1);
//        $adminPerson = AdminUser::findOrFail($request->input('admin_user'));
        $appointment->adminUser()->associate($adminPerson);
        // Service
//        $service = Service::findOrFail($request->input('service'));
        $service = Service::findOrFail(1);
        $appointment->service()->associate($service);

        $appointment->date = $request->input('date');
        $appointment->duration = 15;
        $appointment->save();
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
