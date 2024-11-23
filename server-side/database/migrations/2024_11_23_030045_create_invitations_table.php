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
        Schema::create('invitations', function (Blueprint $table) {
            $table->id('invitation_id');
            $table->enum('status', ['pending', 'accepted', 'rejected']);
            $table->string('sender_email', 45);
            $table->string('receiver_email', 45);
            $table->unsignedBigInteger('file_id');
            $table->foreign('file_id')->references('file_id')->on('files')->onDelete('no action');


        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitations');
    }
};
