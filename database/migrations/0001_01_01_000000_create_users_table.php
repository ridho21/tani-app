<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        Schema::create('kelompok_tani', function (Blueprint $table) {
            $table->id();
            $table->string('nama'); // 'nama' field
            $table->string('seketaris'); // 'nama' field
            $table->string('ketua'); // 'nama' field
            $table->string('bendahara'); // 'nama' field
            $table->string('alamat_seketariat'); // 'nama' field
            $table->integer('tahun'); // 'nama' field
            $table->string('kecamatan'); // 'nama' field
            $table->string('no_reg'); // 'nama' field
            $table->string('pendamping'); // 'nama' field

            $table->timestamps(); // 'created_at' and 'updated_at' fields
        });

        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->date('tanggal_lahir');
            $table->string('alamat');
            $table->string('nomor_kontak');
            $table->string('nomor_identitas');
            $table->string('name');
            $table->string('username')->unique();
            $table->timestamp('user_verified_at')->nullable();
            $table->string('password');

            $table->rememberToken();
            $table->timestamps();
            $table->enum("role", ["admin", "member"]);
            $table->foreignId('kelompok_tani_id')->nullable()->constrained('kelompok_tani')->onDelete('set null');
        });



        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('username')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->index();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });

       
        Schema::create('hasil_tani', function (Blueprint $table) {
            $table->id();
            $table->string('nama'); // 'nama' field
            $table->integer('jumlah'); // 'nama' field
            $table->string('image'); // 'nama' field
            $table->foreignId('kelompok_id')->constrained("kelompok_tani"); // Foreign key to 'users' table
            $table->timestamps(); // 'created_at' and 'updated_at' fields
        });

        Schema::create("tanaman_pangan", function (Blueprint $table) {
            $table->id();
            $table->float("padi_irigasi")->default(0);
            $table->float("padi_tadah_hujan")->default(0);
            $table->float("jagung")->default(0);
            $table->foreignId('kelompok_id')->constrained("kelompok_tani"); // Foreign key to 'users' table
            $table->timestamps(); // 'created_at' and 'updated_at' fields

        });
        Schema::create("tanaman_perkebunan", function (Blueprint $table) {
            $table->id();
            $table->float("luas")->default(0);
            $table->foreignId('kelompok_id')->constrained("kelompok_tani"); // Foreign key to 'users' table
            $table->timestamps(); // 'created_at' and 'updated_at' fields

        });

        Schema::create("tanaman_hortikultura", function (Blueprint $table) {
            $table->id();
            $table->float("sayuran")->default(0);
            $table->float("buah")->default(0);
            $table->foreignId('kelompok_id')->constrained("kelompok_tani"); // Foreign key to 'users' table
            $table->timestamps(); // 'created_at' and 'updated_at' fields

        });
        
        Schema::create("ternak", function (Blueprint $table) {
            $table->id();
            $table->float("unggas")->default(0);
            $table->float("kecil")->default(0);
            $table->float("besar")->default(0);
            $table->foreignId('kelompok_id')->constrained("kelompok_tani"); // Foreign key to 'users' table
            $table->timestamps(); // 'created_at' and 'updated_at' fields

        });

        Schema::create('agenda', function (Blueprint $table) {
            $table->id();
            $table->string('nama'); // 'nama' field
            $table->string('detail_agenda'); // 'nama' field
            $table->date('tanggal'); // 'nama' field
            $table->foreignId('kelompok_id')->constrained("kelompok_tani"); // Foreign key to 'users' table
            $table->timestamps(); // 'created_at' and 'updated_at' fields
        });

        Schema::create('berita', function (Blueprint $table) {
            $table->id();
            $table->string('judul'); // 'nama' field
            $table->longText('isi'); // 'nama' field
            $table->string('image'); // 'nama' field
            $table->timestamps(); // 'created_at' and 'updated_at' fields
        });

        Schema::create('opsi', function (Blueprint $table) {
            $table->id();
            $table->string('nama'); // 'nama' field
            $table->string('isi'); // 'nama' field
            $table->timestamps(); // 'created_at' and 'updated_at' fields
        });
    }

    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('hasil_tani');
        Schema::dropIfExists('kelompok_tani');
        Schema::dropIfExists('opsi');
        Schema::dropIfExists('agenda');
        Schema::dropIfExists('berita');
        Schema::dropIfExists('tanaman_pangan');
        Schema::dropIfExists('tanaman_hortikultura');
        Schema::dropIfExists('tanaman_perkebunan');
        Schema::dropIfExists('ternak');
    }
};
