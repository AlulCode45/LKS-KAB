<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Models\Societies;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class ConsultationController extends Controller
{
    function requestConsultation(Request $request)
    {
        $user =  Societies::where('login_tokens', $request->token)->first();
        $data = [
            'society_id' => $user->id,
            'doctor_id' => 1,
            'status' => 'pending',
            'disease_history' => $request->disease_history,
            'current_symptoms' => $request->current_symptoms,
            'doctor_notes' => ''
        ];

        if (Consultation::insert($data)) {
            return response()->json([
                "message" => "Request consultation sent successful"
            ]);
        }
    }

    function getConsultation(Request $request)
    {
        $user =  Societies::where('login_tokens', $request->token)->first();
        $consultation = Consultation::with('doctor')->where('society_id', $user->id)->get();
        // $data = [];
        foreach ($consultation as $key => $d) {
            unset($consultation[$key]['doctor_id']);
        }
        return response()->json([
            'consultation' => $consultation
        ]);
    }
}
