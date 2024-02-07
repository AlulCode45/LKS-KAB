<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use App\Models\Societies;
use App\Models\Spot_Vaccines;
use App\Models\Spots;
use App\Models\Vaccinations;
use App\Models\Vaccines;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class VaccinationController extends Controller
{
    function getSpots(Request $request)
    {
        $spots = [];
        foreach (Spots::all() as $key => $spot) {
            $available_vaccine = [];
            foreach (Vaccines::all() as $vaccine) {
                $available_vaccine[$vaccine->name] = Spot_Vaccines::where([
                    'spot_id' => $spot->id,
                    'vaccine_id' => $vaccine->id
                ])->count() >= 1 ? true : false;
            }
            $spots[$key] = $spot;
            $spots[$key]['available_vaccines'] = $available_vaccine;
        }

        return response()->json([
            'spots' => $spots
        ]);
    }
    function showSpots(Request $request, $id)
    {
        $request['date'] = isset($request->date) ? $request->date : date('Y-m-d');
        $spot = Spots::find($id);
        return response()->json([
            'date' => $request->date,
            'spot' => $spot,
            'vaccinations_count' => Vaccinations::where([
                'date' => $request->date,
                'spot_id' => $id
            ])->count()
        ]);
    }
    function requestVaccination(Request $request)
    {
        $request['date'] = isset($request->date) ? $request->date : date('Y-m-d');
        $user = Societies::where('login_tokens', $request->token)->first();
        $dose = Vaccinations::where('society_id', $user->id)->count() + 1;

        $data = [
            'dose' => $dose,
            'spot_id' => $request->spot_id,
            'date' => $request->date,
            'society_id' => $user->id,
            'vaccine_id' => 1,
            'doctor_id' => 1,
            'officer_id' => 1
        ];
        if ($request->date) {
            $validator = Validator::make($request->all(), [
                'date' => 'date',
                'spot_id' => 'required'
            ]);
        } else {
            $validator = Validator::make($request->all(), [
                'spot_id' => 'required'
            ]);
        }

        if ($validator->fails()) {
            return response()->json([
                "message" => "Invalid field",
                "errors" => $validator->errors()
            ], 401);
        }

        if ($dose > 1) {
            $firstVaccination = Vaccinations::where('society_id', $user->id)->orderBy('date', 'DESC')->first();
            $firstVaccination = Carbon::parse($firstVaccination->date);
            $secondVaccination = Carbon::parse($request->date);

            $jarakHari = $firstVaccination->diffInDays($secondVaccination);
            if ($jarakHari < 30) {
                return response()->json([
                    "message" => "Wait at least +30 days from 1st Vaccination"
                ], 401);
            }
        }

        if ($dose > 2) {
            return response()->json([
                "message" => "Society has been 2x vaccinated"
            ], 401);
        }

        if (Consultation::where([
            'society_id' => $user->id,
            'status' => 'accepted'
        ])->count() < 1) {
            return response()->json([
                "message" => "Your consultation must be accepted by doctor before"
            ], 401);
        }
        if (Vaccinations::insert($data)) {
            return response()->json([
                'message' => ($dose == 1 ? 'First' : 'Second') . ' vaccination registered successful'
            ]);
        }
    }
    function getVaccination(Request $request)
    {
        $user = Societies::where('login_tokens', $request->token)->first();
        $myVaccine = Vaccinations::with(['spot', 'spot.regional', 'vaccine', 'vaccinator'])
            ->where('society_id', $user->id)->orderBy('date', 'ASC')->get();

        $firstVaccination = count($myVaccine) >= 1 ? $myVaccine[0] : null;
        $secondVaccination = count($myVaccine) > 1 ? $myVaccine[1] : null;

        if ($firstVaccination) {
            $firstVaccination['status'] = 'done';
        }
        if ($secondVaccination) {
            $secondVaccination['status'] = 'done';
        }

        return response()->json([
            'vaccinations' => [
                'first' => $firstVaccination,
                'second' => $secondVaccination
            ]
        ]);
    }
}
