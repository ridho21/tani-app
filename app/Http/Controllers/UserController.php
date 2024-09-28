<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\KelompokTani;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Validation\Rules;
use Inertia\Response;
use Str;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $limit = $request->query("limit", 10);

        
        return Inertia::render("Users/index", [
            "user" => User::where('role','member')->paginate($limit)->appends(['limit' => $limit])
        ]);
    }

    public function destroy(User $user)
    {
        $user->delete();
    }

    public function create()
    {
        return Inertia::render("Users/create");
    }

    public function edit(User $user)
    {

        return Inertia::render("Users/edit", [
            "user" => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        $user->update([
            "name" => $request->name,
            "username" => $request->username
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:'.User::class,
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required|string',
            'nomor_kontak' => 'required|string',
            'nomor_identitas' => 'required|string',

        ]);

        User::create([
            'name' => $request->name,
            'username' => $request->username,
            'tanggal_lahir' => $request->tanggal_lahir,
            'alamat' => $request->alamat,
            'nomor_kontak' => $request->nomor_kontak,
            'nomor_identitas' => $request->nomor_identitas,
            'user_verified_at' => now(),
            'password' => Hash::make($request->username),
            'role' => "member"
        ]);

        return redirect(route('users.index', absolute: false));
    }
    // /**
    //  * Display the user's profile form.
    //  */
    // public function edit(Request $request): Response
    // {
    //     return Inertia::render('Profile/Edit', [
    //         'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
    //         'status' => session('status'),
    //     ]);
    // }

    // /**
    //  * Update the user's profile information.
    //  */
    // public function update(ProfileUpdateRequest $request): RedirectResponse
    // {
    //     $request->user()->fill($request->validated());

    //     if ($request->user()->isDirty('email')) {
    //         $request->user()->email_verified_at = null;
    //     }

    //     $request->user()->save();

    //     return Redirect::route('profile.edit');
    // }

    // /**
    //  * Delete the user's account.
    //  */
    // public function destroy(Request $request): RedirectResponse
    // {
    //     $request->validate([
    //         'password' => ['required', 'current_password'],
    //     ]);

    //     $user = $request->user();

    //     Auth::logout();

    //     $user->delete();

    //     $request->session()->invalidate();
    //     $request->session()->regenerateToken();

    //     return Redirect::to('/');
    // }
}
