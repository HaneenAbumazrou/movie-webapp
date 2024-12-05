<?php

namespace App\Services;

use GuzzleHttp\Client;

class ChatGPTServices
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('OPENAI_API_KEY');
    }

    public function askChatGPT($message)
    {
        $response = $this->client->post('https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'gpt-4o', // Or 'gpt-4' depending on your preference
                'messages' => [
                    ['role' => 'system', 'content' => 'You are a movie review assistant. Please only provide information and reviews related to films.'],
                    ['role' => 'user', 'content' => $message],
                ],
                'max_tokens' => 200,
                'temperature' => 0.7,
            ],
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }
}
