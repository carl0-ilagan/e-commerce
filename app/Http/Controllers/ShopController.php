<?php

namespace App\Http\Controllers;

use App\Models\AdminProduct;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    public function index()
    {
        return Inertia::render('Shop');
    }

    public function show($id)
    {
        $product = AdminProduct::with(['images', 'sizes'])->findOrFail($id);
        return Inertia::render('Shop/ProductDetail', [
            'product' => $product
        ]);
    }

    public function getProducts()
    {
        try {
            $products = AdminProduct::with(['images', 'sizes'])
                ->orderBy('created_at', 'desc')
                ->get();
            
            return response()->json([
                'success' => true,
                'products' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching products',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}