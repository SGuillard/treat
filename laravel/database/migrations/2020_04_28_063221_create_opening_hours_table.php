<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOpeningHoursTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('opening_hours', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('salon_id')->nullable();
            $table->foreign('salon_id')->references('id')->on('salons')->onDelete('set null');
            $table->integer('day')->default(0);
            $table->time('open', 0)->default('00:00:00');
            $table->time('close', 0)->default('00:00:00');;
            $table->boolean('is_close', 0)->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('opening_hours');
    }
}
