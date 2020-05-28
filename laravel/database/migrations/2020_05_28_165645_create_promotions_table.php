<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePromotionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promotions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->boolean('active')->default(true);
            $table->string('name')->default('');
            $table->dateTime('start_date')->default(date_format(new DateTime(), 'Y-m-d H:i:s'));
            $table->dateTime('end_date')->default(date_format(new DateTime(), 'Y-m-d H:i:s'));
            $table->integer('day')->nullable();
            $table->time('start_hour')->nullable();
            $table->time('end_hour')->nullable();
            $table->integer('discount')->default(0);
            $table->unsignedBigInteger('service_id')->nullable();
            $table->foreign('service_id')->references('id')->on('services')->onDelete('set null');
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
        Schema::dropIfExists('promotions');
    }
}
