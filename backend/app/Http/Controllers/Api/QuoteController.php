<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;

class QuoteController extends Controller
{
    public function random()
    {
        $response = Http::get('https://zenquotes.io/api/random');

        if ($response->successful()) {
            $quote = $response->json()[0];
            return response()->json([
                'quote' => $quote['q'],
                'author' => $quote['a']
            ]);
        }

        return response()->json(['error' => 'Não foi possível obter a citação.'], 500);
    }
}
