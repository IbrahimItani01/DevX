<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('collaborations', function (Blueprint $table) {
            $table->unsignedBigInteger('collaborater_id');
            $table->unsignedBigInteger('file_id');
            $table->enum('privilige', ['editor', 'viewer']);
            $table->primary(['collaborater_id', 'file_id']);
            $table->foreign('collaborater_id')->references('id')->on('users')->onUpdate('cascade');
            $table->foreign('file_id')->references('file_id')->on('files')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('collaborations');
    }
};
