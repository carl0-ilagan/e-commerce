<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AdminProductSize extends Model
{
    use HasFactory;

    protected $table = 'admin_product_sizes';  // Add this line

    protected $fillable = [
        'product_id',
        'size',
        'inventory'
    ];

    public function product()
    {
        return $this->belongsTo(AdminProduct::class, 'product_id');
    }
}