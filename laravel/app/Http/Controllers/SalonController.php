<?php

namespace App\Http\Controllers;

use App\Http\Resources\SalonResource;
use App\Salon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SalonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $salons = Salon::all();
        return SalonResource::collection($salons);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Salon::create($request->input());
        return $this->getUserSalon();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Display the authenticated salon
     *
     * @return SalonResource
     */
    public function getUserSalon()
    {
        return new SalonResource($this->getSalon());
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Salon $salon
     * @return SalonResource
     */
    public function update(Request $request, Salon $salon)
    {
        $salon->update($request->input());
        return $this->getUserSalon();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
