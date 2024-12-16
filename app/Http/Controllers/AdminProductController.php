<?php

namespace App\Http\Controllers;

use App\Models\AdminProduct;
use App\Models\AdminProductImage;
use App\Models\AdminProductSize;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class AdminProductController extends Controller
{
    public function index()
    {
        try {
            $products = AdminProduct::with(['sizes', 'images'])->get();
            return response()->json([
                'success' => true,
                'products' => $products
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching products: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch products'
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            DB::beginTransaction();
    
            // Log the entire request for debugging
            Log::info('Incoming request data:', [
                'all' => $request->all(),
                'files' => $request->hasFile('images') ? 'Has files' : 'No files',
                'content-type' => $request->header('Content-Type')
            ]);
    
            // Validate the request
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'category' => 'required|string',
                'sizeInventory' => 'required',
                'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);
    
            // Create the product
            $product = AdminProduct::create([
                'name' => $request->name,
                'price' => $request->price,
                'category' => $request->category,
            ]);
    
            // Process size inventory
            $sizeInventory = is_string($request->sizeInventory) 
                ? json_decode($request->sizeInventory, true) 
                : $request->sizeInventory;
    
            if (empty($sizeInventory)) {
                throw new \Exception('Size inventory cannot be empty');
            }
    
            // Create size records
            foreach ($sizeInventory as $sizeData) {
                AdminProductSize::create([
                    'product_id' => $product->id,
                    'size' => $sizeData['size'],
                    'inventory' => (int)$sizeData['inventory']
                ]);
            }
    
            // Handle image uploads
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    if ($image->isValid()) {
                        $path = $image->store('products', 'public');
                        AdminProductImage::create([
                            'product_id' => $product->id,
                            'image_path' => $path
                        ]);
                    }
                }
            }
    
            DB::commit();
    
            return response()->json([
                'success' => true,
                'message' => 'Product created successfully',
                'product' => $product->fresh(['sizes', 'images'])
            ], 201);
    
        } catch (\Illuminate\Validation\ValidationException $e) {
            DB::rollBack();
            Log::error('Validation error: ' . json_encode($e->errors()));
            return response()->json([
                'success' => false,
                'error' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
    
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Product creation error: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to create product: ' . $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $product = AdminProduct::findOrFail($id);

            $product->update([
                'name' => $request->name,
                'price' => $request->price,
                'category' => $request->category,
            ]);

            $sizeInventory = json_decode($request->sizeInventory, true);
            
            $product->sizes()->delete();
            
            foreach ($sizeInventory as $sizeData) {
                AdminProductSize::create([
                    'product_id' => $product->id,
                    'size' => $sizeData['size'],
                    'inventory' => (int)$sizeData['inventory']
                ]);
            }

            $existingImageIds = $request->input('existing_images', []);
            
            foreach ($product->images as $image) {
                if (!in_array($image->id, $existingImageIds)) {
                    Storage::disk('public')->delete($image->image_path);
                    $image->delete();
                }
            }

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    if ($image->isValid()) {
                        $path = $image->store('products', 'public');
                        AdminProductImage::create([
                            'product_id' => $product->id,
                            'image_path' => $path
                        ]);
                    }
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Product updated successfully',
                'product' => $product->fresh(['sizes', 'images'])
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Product update error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to update product'
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            DB::beginTransaction();

            $product = AdminProduct::with('images')->findOrFail($id);

            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image->image_path);
            }

            $product->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully'
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Product deletion error: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'error' => 'Failed to delete product'
            ], 500);
        }
    }
}