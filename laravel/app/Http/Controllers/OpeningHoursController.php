<?php

namespace App\Http\Controllers;

use App\Http\Resources\OpeningHoursResource;
use App\OpeningsHours;
use Illuminate\Http\Request;

class OpeningHoursController extends Controller
{
    public function getList()
    {
        $salonHours = OpeningsHours::where('salon_id', $this->getSalon()->id)
            ->orderBy('day', 'ASC')
            ->get();
        return OpeningHoursResource::collection($salonHours);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->getList();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
        //
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
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param OpeningsHours $openingsHours
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, OpeningsHours $openingsHours)
    {
        $openingsHours->update($request->input());
        return $this->getList();
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
