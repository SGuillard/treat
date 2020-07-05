<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePromotionRequest;
use App\Http\Resources\PromotionResource;
use App\Promotion;
use Illuminate\Http\Request;

class PromotionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->getAllPromotions();
    }

    /**
     * Get the the Colletion of all the promotions
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    private function getAllPromotions()
    {
        return PromotionResource::collection(Promotion::with('service')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePromotionRequest $request)
    {
        Promotion::create($request->input());
        return $this->getAllPromotions();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Promotion $promotion
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function update(Request $request, Promotion $promotion)
    {
        $promotion->update($request->input());
        return $this->getAllPromotions();
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
