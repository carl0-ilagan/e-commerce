<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AdminProduct extends Model
{
    use HasFactory;

    protected $table = 'admin_products';  // Add this line

    protected $fillable = [
        'name',
        'price',
        'category'
    ];

    public function sizes()
    {
        return $this->hasMany(AdminProductSize::class, 'product_id');
    }

    public function images()
    {
        return $this->hasMany(AdminProductImage::class, 'product_id');
    }
}