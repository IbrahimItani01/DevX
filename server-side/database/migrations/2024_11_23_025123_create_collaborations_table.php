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
            $table->integer('collaborater_id');
            $table->unsignedBigInteger('file_id');
            $table->enum('privilige', ['editor', 'viewer']);
            $table->primary(['collaborater_id', 'file_id']);
            $table->foreign('collaborater_id')->references('user_id')->on('users')->onDelete('no action');
            $table->foreign('file_id')->references('file_id')->on('files')->onDelete('no action');
            $table->timestamps();
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
