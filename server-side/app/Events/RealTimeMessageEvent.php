<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class RealTimeMessageEvent implements ShouldBroadcast
{
    use SerializesModels;

    public $userId;
    public $documentId;
    public $content;
    public $cursorPosition;

    public function __construct($userId, $documentId, $content, $cursorPosition)
    {
        $this->userId = $userId;
        $this->documentId = $documentId;
        $this->content = $content;
        $this->cursorPosition = $cursorPosition;
    }

    public function broadcastOn()
    {
        return new Channel("document-{$this->documentId}");
    }

    public function broadcastAs()
    {
        return 'message-sent';
    }
}