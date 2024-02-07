<?php

namespace App\Http\Controllers;

use App\Models\Societies;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    function Login(Request $request)
    {
        $user = Societies::where('id_card_number', $request->id_card_number)->first();
        if ($user && Hash::check($request->password, $user->password)) {
            $token = md5($request->id_card_number);
            $user->login_tokens = $token;
            $user->save();
            return response()->json([
                'name' => $user->name,
                'born_date' => $user->born_date,
                'gender' => $user->gender,
                'address' => $user->address,
                'token' => $token,
                'regional' => $user->regional
            ]);
        } else {
            return response()->json([
                "message" => "ID Card Number or Password incorrect"
            ], 401);
        }
    }
    function Logout(Request $request)
    {
        $user = Societies::where('login_tokens', $request->token)->first();
        if ($user) {
            $user->login_tokens = '';
            $user->save();
            return response()->json([
                "message" => "Logout success"
            ]);
        } else {
            return response()->json([
                "message" => "Invalid token"
            ]);
        }
    }
}