<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Inertia\Inertia;

class AboutController extends Controller
{
    public function index()
    {
        $feedbacks = Feedback::with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('About', [
            'feedbacks' => $feedbacks
        ]);
    }
}