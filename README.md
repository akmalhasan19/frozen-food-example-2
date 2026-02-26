# MVP Frozen Food

Aplikasi MVP e-commerce Frozen Food berbasis Next.js (App Router), TypeScript, dan Tailwind CSS.
Menggunakan `localStorage` sebagai sumber data untuk keranjang dan pesanan (SSR-safe).

## 🚀 Cara Menjalankan

1. Clone atau download repositori ini
2. Install dependencies:
   ```bash
   npm install
   ```
3. Buat file environment:
   Copy `.env.example` ke `.env` (atau `.env.local`) dan sesuaikan nilainya:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=opsional_sementara
   NEXT_PUBLIC_SUPABASE_ANON_KEY=opsional_sementara
   ADMIN_PASSWORD=rahasia
   ```
4. Jalankan server lokal:
   ```bash
   npm run dev
   ```
5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## ⭐ Fitur yang Tersedia

- **Storefront**: Landing page hero, search, filter (kategori, harga, stok), sorting, dan pagination.
- **Katalog & Detail Produk**: Halaman dinamis dengan perlindungan stok produk dan rekomendasi kategori sejenis.
- **Keranjang**: Hitung subtotal dinamis, penyesuaian on-change quantity, persist di lokal.
- **Checkout Pembeli**: Form divalidasi dengan `zod` + `react-hook-form`, memilih opsi pengiriman (Reguler/Instan) dan pembayaran.
- **Pesanan**: Redirect ke halaman sukses dan riwayat order di `/akun/pesanan`.
- **Admin Dashboard Lengkap**: Menggunakan gate auth password lokal (`/admin`), manajemen status order (DIPROSES, DIKIRIM, SELESAI), dan CRUD simulasi inventori produk lokal.

## 🔐 Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL`: Setup URL Supabase (digunakan pada fase lanjutan).
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Key Anon Supabase (digunakan pada fase lanjutan).
- `ADMIN_PASSWORD`: Diperlukan untuk login admin. Pastikan sinkron dengan API verifikasi jika ganti password.

## 🛡️ Admin Access

1. Buka route [`/admin`](http://localhost:3000/admin).
2. Masukkan password yang ada di `.env` (contoh: `rahasia`).
3. Sesi admin disimpan dalam browser dan akan hilang jika logout atau clear session.

## 🎟️ Promo & Kupon
- Kode: **`FROZEN10`**
- Manfaat: Diskon 10% dari subtotal
- Maksimal Potongan: Rp20.000

## 📦 Struktur Data Minimal

Sistem ini memiliki *type definition* kuat via TypeScript (lihat `types/index.ts`):
- `Product`: Memiliki field `id`, `name`, `price`, `stock`, `category`, `image`, dll.
- `CartItem`: Berisi relasi dengan `product` beserta `quantity`.
- `Order`: Termasuk data customer, list order items, shipping details, diskon (kupon), status, dan timestamp.
- `OrderStatus`: `'DIPROSES' | 'DIKIRIM' | 'SELESAI' | 'DIBATALKAN'`.

## 🗺️ Roadmap (TODO Fase Selanjutnya)

Berhubung masih berbentuk MVP lokal, update fase berikutnya:
- [ ] Migrasi seluruh data (Product & Order) ke Supabase PostgreSQL database secara penuh.
- [ ] Implementasi Supabase Auth untuk multi-role Login (Admin / Registered User).
- [ ] Integrasi rill dengan Payment Gateway (Misal: Midtrans).
- [ ] Integrasi dengan CDN/Storage Bucket (misal: Supabase Storage) untuk upload dan render image dinamis alih-alih simulasi URL.
