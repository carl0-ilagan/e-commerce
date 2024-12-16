<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'user' => [
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'profile_image_url' => $request->user()->profile_image_url,
            ],
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $validated = $request->validated();

        // Handle profile image upload
        if ($request->hasFile('profile_image')) {
            // Delete old image if exists
            if ($user->profile_image) {
                Storage::disk('public')->delete('uploaded/profile-images/' . $user->profile_image);
            }

            $file = $request->file('profile_image');
            $filename = 'profile-' . time() . '.' . $file->getClientOriginalExtension();
            
            // Store the new image
            $file->storeAs('uploaded/profile-images', $filename, 'public');
            $validated['profile_image'] = $filename;
        }

        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        return Redirect::route('profile.edit')->with('status', 'profile-updated');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        // Delete profile image if exists
        if ($user->profile_image) {
            Storage::disk('public')->delete('uploaded/profile-images/' . $user->profile_image);
        }

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    /**
     * Update the user's profile image.
     */
    public function updateProfileImage(Request $request): RedirectResponse
    {
        $request->validate([
            'profile_image' => ['required', 'image', 'max:2048'], // 2MB max
        ]);

        $user = $request->user();

        // Delete old image if exists
        if ($user->profile_image) {
            Storage::disk('public')->delete('uploaded/profile-images/' . $user->profile_image);
        }

        $file = $request->file('profile_image');
        $filename = 'profile-' . time() . '.' . $file->getClientOriginalExtension();
        
        // Store the new image
        $file->storeAs('uploaded/profile-images', $filename, 'public');
        
        $user->update([
            'profile_image' => $filename
        ]);

        return Redirect::back()->with('status', 'profile-image-updated');
    }

    /**
     * Delete the user's profile image.
     */
    public function deleteProfileImage(Request $request): RedirectResponse
    {
        $user = $request->user();

        if ($user->profile_image) {
            Storage::disk('public')->delete('uploaded/profile-images/' . $user->profile_image);
            $user->update(['profile_image' => null]);
        }

        return Redirect::back()->with('status', 'profile-image-deleted');
    }
}