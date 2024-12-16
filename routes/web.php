<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\AdminProductController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\CartController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');
Route::post('/contact', [PageController::class, 'submitContact'])->name('contact.submit');

// Shop Routes
Route::controller(ShopController::class)->group(function () {
    Route::get('/shop', 'index')->name('shop');
    Route::get('/shop/products/{id}', 'show')->name('shop.product.show');
    Route::get('/api/shop/products', 'getProducts')->name('api.shop.products');
});

// Cart Routes
Route::controller(CartController::class)->group(function () {
    Route::get('/cart', 'index')->name('cart.index');
    Route::post('/cart/add', 'store')->name('cart.add');
    Route::put('/cart/update/{id}', 'update')->name('cart.update');
    Route::delete('/cart/remove/{id}', 'destroy')->name('cart.remove');
});

// Feedback Public Route
Route::get('/api/feedback', [FeedbackController::class, 'index'])->name('api.feedback.index');

// Auth Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Authenticated Feedback Routes
    Route::post('/feedback', [FeedbackController::class, 'store'])->name('feedback.store');
});

// Admin Routes
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    // Products Management
    Route::controller(AdminProductController::class)->group(function () {
        Route::get('/products', 'index')->name('admin.products.index');
        Route::post('/products', 'store')->name('admin.products.store');
        Route::put('/products/{id}', 'update')->name('admin.products.update');
        Route::delete('/products/{id}', 'destroy')->name('admin.products.destroy');
        Route::delete('/products/{productId}/images/{imageId}', 'removeImage')
            ->name('admin.products.removeImage');
        
        // API endpoints for AJAX requests
        Route::get('/api/products', 'index')->name('api.admin.products.index');
        Route::post('/api/products', 'store')->name('api.admin.products.store');
        Route::put('/api/products/{id}', 'update')->name('api.admin.products.update');
        Route::delete('/api/products/{id}', 'destroy')->name('api.admin.products.destroy');
    });

    Route::get('/cart', [CartController::class, 'index'])->name('cart.index');

    // Feedback Management
    Route::controller(FeedbackController::class)->group(function () {
        Route::get('/feedback', 'index')->name('admin.feedback.index');
        Route::delete('/feedback/{id}', 'destroy')->name('admin.feedback.destroy');
    });

    // Orders Management
    Route::get('/orders', function () {
        return Inertia::render('Admin/Orders/Index');
    })->name('admin.orders.index');

    // Users Management
    Route::get('/users', function () {
        return Inertia::render('Admin/Users/Index');
    })->name('admin.users.index');

    // Settings
    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings');
    })->name('admin.settings');
});

// Authentication Routes
require __DIR__.'/auth.php';