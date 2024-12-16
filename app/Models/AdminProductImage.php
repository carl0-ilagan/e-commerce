<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AdminProductImage extends Model
{
    use HasFactory;

    protected $table = 'admin_product_images';  // Add this line

    protected $fillable = [
        'product_id',
        'image_path'
    ];

    public function product()
    {
        return $this->belongsTo(AdminProduct::class, 'product_id');
    }
}