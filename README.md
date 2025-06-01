# Cine.FO 🎬 - Jelajahi Dunia Sinema Tanpa Batas

[![GitHub license](https://img.shields.io/github/license/alii16/movie-app?style=flat-square)](https://github.com/alii16/movie-app/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/alii16/movie-app?style=flat-square)](https://github.com/alii16/movie-app/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/alii16/movie-app?style=flat-square)](https://github.com/alii16/movie-app/network/members)
[![GitHub issues](https://img.shields.io/github/issues/alii16/movie-app?style=flat-square)](https://github.com/alii16/movie-app/issues)

## 🎥 Deskripsi Proyek

Cine.FO adalah portal web responsif dan modern yang dirancang untuk membantu Anda menjelajahi dunia sinema. Aplikasi ini memungkinkan pengguna untuk mencari film, melihat detail film trending, dan menelusuri berbagai genre film. Dibangun dengan fokus pada pengalaman pengguna yang intuitif dan desain yang menarik, Cine.FO adalah titik awal petualangan sinematik Anda.

## ✨ Fitur Utama

* **Carousel Film Trending (Flowbite)**: Tampilan hero yang dinamis menampilkan poster-poster film yang sedang trending dari TMDB API, dilengkapi dengan navigasi otomatis dan manual.
* **Pencarian Film Interaktif**: Cari film berdasarkan judul dengan input yang responsif dan tombol pencarian yang adaptif untuk mobile dan desktop.
* **Daftar Film Trending**: Jelajahi koleksi film yang sedang populer dengan tampilan grid yang menarik.
* **Detail Film Mendalam (Coming Soon)**: (Jika Anda berencana menambahkannya) Dapatkan informasi lengkap tentang setiap film, termasuk sinopsis, rating, daftar pemeran, dan lainnya.
* **Navigasi Genre (Coming Soon)**: (Jika Anda berencana menambahkannya) Telusuri film berdasarkan kategori genre favorit Anda.
* **Desain Responsif**: Antarmuka pengguna yang dioptimalkan untuk berbagai ukuran perangkat, dari mobile hingga desktop, berkat Tailwind CSS.

## 🚀 Demo Langsung

[Link ke Demo Langsung Anda (jika ada)](https://movie-app-ochre-three-77.vercel.app/)

## 🛠️ Teknologi yang Digunakan

* **HTML5**: Struktur dasar halaman web.
* **CSS3 (Tailwind CSS)**: Kerangka kerja CSS utilitas-first untuk desain yang cepat dan responsif.
* **JavaScript (Vanilla JS)**: Logika interaktivitas frontend.
* **The Movie Database (TMDB) API**: Sumber data untuk informasi film dan gambar poster.
* **Flowbite**: Komponen UI berbasis Tailwind CSS untuk fungsionalitas carousel.
* **Font Awesome**: Untuk ikon-ikon yang menarik.

## ⚙️ Instalasi Lokal

Untuk menjalankan proyek ini di lingkungan pengembangan lokal Anda, ikuti langkah-langkah berikut:

1.  **Clone repositori ini:**
    ```bash
    git clone [https://github.com/YOUR_USERNalii16AME/movie-app.git](https://github.com/alii16/movie-app.git)
    cd movie-app

2.  **Dapatkan API Key TMDB:**
    * Kunjungi [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api).
    * Daftar akun jika Anda belum punya.
    * Dapatkan API Key Anda.

3.  **Konfigurasi API Key:**
    * Buka file `js/ui.js` Anda.
    * Temukan baris berikut:
        ```javascript
        const API_KEY = 'YOUR_API_KEY'; // Ganti dengan API Key TMDB Anda
        const API_BASE_URL = '[https://api.themoviedb.org/3](https://api.themoviedb.org/3)';
        const IMAGE_BASE_URL = '[https://image.tmdb.org/t/p/](https://image.tmdb.org/t/p/)';
        ```
    * Ganti `'YOUR_API_KEY'` dengan kunci API TMDB Anda yang sebenarnya.

4.  **Buka di Browser:**
    * Anda dapat langsung membuka file `index.html` di browser Anda.
    * Atau, jika Anda memiliki ekstensi Live Server di VS Code atau server HTTP lokal lainnya (misalnya, `http-server` dari npm), Anda bisa menjalankannya untuk pengalaman pengembangan yang lebih baik:
        ```bash
        # Jika Anda menggunakan http-server
        npm install -g http-server
        http-server .
        ```
        Kemudian buka `http://localhost:8080` (atau port lain yang ditunjukkan) di browser Anda.

## 🤝 Kontribusi

Kontribusi selalu diterima! Jika Anda memiliki ide, perbaikan bug, atau ingin menambahkan fitur baru, silakan:

1.  Fork repositori ini.
2.  Buat branch baru: `git checkout -b feature/nama-fitur`
3.  Lakukan perubahan Anda.
4.  Commit perubahan Anda: `git commit -m 'feat: Tambahkan fitur baru XYZ'`
5.  Push ke branch Anda: `git push origin feature/nama-fitur`
6.  Buka Pull Request.

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).

## 📞 Kontak

Jika Anda memiliki pertanyaan atau saran, jangan ragu untuk menghubungi saya:

* **Ali Polanunu** - [Profil GitHub Anda](https://github.com/alii16)
* **alipolanunu077** - alipolanunu077@gmail.com

## 📄 Screenshot

![image](https://github.com/user-attachments/assets/73b58a46-105f-4ebe-b167-28b2ab1116e2)
