// js/api.js
const API_KEY = '5d476c1449223c5dea8e49b5c005808f';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchTrendingMovies() {
    const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=id-ID`);
    if (!res.ok) throw new Error('Gagal memuat film trending');
    const data = await res.json();
    return data.results.slice(0, 20); // Limit to 20 movies
}

async function fetchGenres() {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=id-ID`);
    if (!res.ok) throw new Error('Gagal memuat genre');
    const data = await res.json();
    return data.genres;
}

async function fetchMoviesByGenre(genreId) {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&sort_by=popularity.desc&language=id-ID&page=1`);
    if (!res.ok) throw new Error('Gagal memuat film genre');
    const data = await res.json();
    return data.results.slice(0, 20); // Limit to 20 movies
}

async function fetchPopularMovies() {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=id-ID&page=1`);
    if (!res.ok) throw new Error('Gagal memuat rekomendasi');
    const data = await res.json();
    return data.results.slice(0, 10); // Limit to 10 movies
}

async function searchMoviesApi(query) {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=id-ID`);
    if (!res.ok) throw new Error('Gagal mengambil data film');
    const data = await res.json();
    return data.results;
}

async function fetchMovieDetail(movieId) {
    const movieRes = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=id-ID`);
    if (!movieRes.ok) throw new Error('Gagal memuat detail film');
    return await movieRes.json();
}

async function fetchMovieVideos(movieId) {
    const videoRes = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
    if (!videoRes.ok) throw new Error('Gagal memuat video film');
    const videoData = await videoRes.json();
    return videoData.results.find(v => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser'));
}