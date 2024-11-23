<?php
namespace App\Http\Controllers;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class JwtController extends Controller
{
    private $secretKey = 'your-secret-key';

    public function decodeToken(Request $request)
    {
        $authorizationHeader = $request->header('Authorization');

        if (!$authorizationHeader) {
            return response()->json(['error' => 'Authorization header missing'], 400);
        }

        $token = str_replace('Bearer ', '', $authorizationHeader);

        try {
            $decoded = JWT::decode($token, new Key($this->secretKey, 'HS256'));
            return response()->json(['payload' => (array) $decoded], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid token: ' . $e->getMessage()], 400);
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }


        $payload = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ];

        $token = JWT::encode($payload, $this->secretKey, 'HS256');

        return response()->json(['token' => $token], 200);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password), // Hashing the password
        ]);

        $payload = [
            'name' => $user->name,
            'email' => $user->email,
        ];

        $token = JWT::encode($payload, $this->secretKey, 'HS256');

        return response()->json(['token' => $token], 201);
    }
}
