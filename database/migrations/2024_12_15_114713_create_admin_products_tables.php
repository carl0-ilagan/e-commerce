// File: database/migrations/2024_01_25_000000_create_admin_products_tables.php

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('admin_products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('price', 8, 2);
            $table->string('category');
            $table->timestamps();
        });

        Schema::create('admin_product_sizes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('admin_products')->onDelete('cascade');
            $table->string('size');
            $table->integer('inventory');
            $table->timestamps();
        });

        Schema::create('admin_product_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained('admin_products')->onDelete('cascade');
            $table->string('image_path');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('admin_product_images');
        Schema::dropIfExists('admin_product_sizes');
        Schema::dropIfExists('admin_products');
    }
};