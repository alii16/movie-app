// js/main.js
let genres = [];
let currentPage = 'home';
let selectedGenre = null;

// --- Navigation Functions ---
function setActivePage(page) {
    document.getElementById('home-page').classList.add('hidden');
    document.getElementById('search-page').classList.add('hidden');
    document.getElementById('genre-page').classList.add('hidden');

    document.getElementById(`${page}-page`).classList.remove('hidden');

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    // Set active for desktop nav
    const desktopNavLink = document.getElementById(`nav-${page}`);
    if (desktopNavLink) desktopNavLink.classList.add('active');
    // Set active for mobile nav
    const mobileNavLink = document.getElementById(`mobile-nav-${page}`);
    if (mobileNavLink) mobileNavLink.classList.add('active');

    // Close mobile menu if open
    document.getElementById('mobile-menu').classList.add('hidden');

    currentPage = page;
}

function showHome() {
    setActivePage('home');
    loadTrendingMovies();
}

function showSearch() {
    setActivePage('search');
    loadRecommendations();
    // Reset search input and results when navigating to search page
    document.getElementById('search-input').value = '';
    document.getElementById('search-results-container').classList.add('hidden');
    document.getElementById('no-results').classList.add('hidden');
    document.getElementById('search-results').innerHTML = ''; // Clear previous results
}

async function showGenres(genreId = null, genreName = null) {
    setActivePage('genre');
    await loadGenresForDropdown(); // Ensure genres are loaded for the dropdown

    if (genreId && genreName) {
        await selectGenre(genreId, genreName);
    } else if (genres.length > 0) {
        // If no specific genre is passed, select the first genre if available
        // Or keep current selectedGenre if user navigated back to genre page
        if (selectedGenre) {
            await selectGenre(selectedGenre.id, selectedGenre.name);
        } else {
            // Default to the first genre if no genre was previously selected
            await selectGenre(genres[0].id, genres[0].name);
        }
    } else {
        // If genres are not loaded yet, wait for them
        console.log('Genres not loaded yet, attempting to load and select first.');
        // This case should be handled by loadGenresForDropdown before this point
    }
}

// --- Trending Movies ---
async function loadTrendingMovies() {
    showLoading('loading-trending');
    try {
        const movies = await fetchTrendingMovies();
        displayMovies(movies, 'trending-movies');
    } catch (error) {
        showNotification('Gagal memuat film trending: ' + error.message, 'error');
        console.error('Error loading trending movies:', error);
        document.getElementById('trending-movies').innerHTML = '<p class="text-red-400 text-center col-span-full">Gagal memuat film trending.</p>';
    } finally {
        hideLoading('loading-trending');
    }
}

// --- Genres ---
async function loadGenresForDropdown() {
    if (genres.length > 0) {
        displayGenreDropdown(genres);
        return;
    }

    showLoading('loading-genres-dropdown');
    showLoading('loading-genres-mobile-dropdown'); // For mobile dropdown
    try {
        genres = await fetchGenres();
        displayGenreDropdown(genres);
    } catch (error) {
        showNotification('Gagal memuat genre: ' + error.message, 'error');
        console.error('Error loading genres:', error);
        const dropdownListDesktop = document.getElementById('genre-dropdown-list');
        const dropdownListMobile = document.getElementById('mobile-genre-dropdown-list');
        if (dropdownListDesktop) dropdownListDesktop.innerHTML = '<div class="px-4 py-2 text-red-400">Gagal memuat genre.</div>';
        if (dropdownListMobile) dropdownListMobile.innerHTML = '<div class="px-4 py-2 text-red-400">Gagal memuat genre.</div>';
    } finally {
        hideLoading('loading-genres-dropdown');
        hideLoading('loading-genres-mobile-dropdown');
    }
}

function displayGenreDropdown(genreList) {
    const dropdownListDesktop = document.getElementById('genre-dropdown-list');
    const dropdownListMobile = document.getElementById('mobile-genre-dropdown-list');
    
    if (dropdownListDesktop) dropdownListDesktop.innerHTML = '';
    if (dropdownListMobile) dropdownListMobile.innerHTML = '';

    genreList.forEach(genre => {
        const createDropdownItem = (isMobile = false) => {
            const button = document.createElement('button');
            button.className = 'genre-dropdown-item px-4 py-2 text-sm w-full text-left';
            button.textContent = genre.name;
            button.onclick = () => {
                showGenres(genre.id, genre.name); // Navigate to genre page and select genre
                if (isMobile) {
                    // Close mobile dropdown after selection
                    document.getElementById('mobile-genre-dropdown-menu').classList.add('hidden');
                }
            };
            return button;
        };
        
        if (dropdownListDesktop) dropdownListDesktop.appendChild(createDropdownItem());
        if (dropdownListMobile) dropdownListMobile.appendChild(createDropdownItem(true));
    });
}

async function selectGenre(genreId, genreName) {
    selectedGenre = { id: genreId, name: genreName };
    const genreTitle = document.getElementById('genre-title');
    genreTitle.textContent = `🎬 ${genreName}`;

    showLoading('loading-genre-movies');
    document.getElementById('genre-movies').innerHTML = ''; // Clear previous movies

    try {
        const movies = await fetchMoviesByGenre(genreId);
        displayMovies(movies, 'genre-movies');
    } catch (error) {
        showNotification(`Gagal memuat film ${genreName}: ${error.message}`, 'error');
        console.error(`Error loading movies for genre ${genreName}:`, error);
        document.getElementById('genre-movies').innerHTML = '<p class="text-red-400 text-center col-span-full">Gagal memuat film untuk genre ini.</p>';
    } finally {
        hideLoading('loading-genre-movies');
    }
}

// --- Recommendations ---
async function loadRecommendations() {
    showLoading('loading-recommendations');
    try {
        const movies = await fetchPopularMovies();
        displayMovies(movies, 'recommended-movies');
    } catch (error) {
        showNotification('Gagal memuat rekomendasi: ' + error.message, 'error');
        console.error('Error loading recommendations:', error);
        document.getElementById('recommended-movies').innerHTML = '<p class="text-red-400 text-center col-span-full">Gagal memuat rekomendasi.</p>';
    } finally {
        hideLoading('loading-recommendations');
    }
}

// --- Search Functionality ---
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        searchMovies();
    }
}

async function searchMovies() {
    const query = document.getElementById('search-input').value.trim();
    if (!query) {
        showNotification('Masukkan judul film terlebih dahulu!', 'warning');
        return;
    }

    showLoading('loading-search');
    document.getElementById('search-results-container').classList.add('hidden');
    document.getElementById('no-results').classList.add('hidden');
    document.getElementById('search-results').innerHTML = ''; // Clear previous results

    try {
        const movies = await searchMoviesApi(query);

        if (!movies.length) {
            document.getElementById('no-results').classList.remove('hidden');
            return;
        }

        document.getElementById('search-results-container').classList.remove('hidden');
        document.getElementById('results-count').textContent = `${movies.length} film ditemukan`;
        displayMovies(movies, 'search-results');

    } catch (error) {
        showNotification('Terjadi kesalahan saat mencari film. Silakan coba lagi: ' + error.message, 'error');
        console.error('Error searching movies:', error);
        document.getElementById('search-results').innerHTML = '<p class="text-red-400 text-center col-span-full">Terjadi kesalahan saat mencari film.</p>';
    } finally {
        hideLoading('loading-search');
    }
}

// --- Movie Detail Modal ---
async function openMovieDetail(movieId) {
    const modal = document.getElementById('movie-modal');
    const modalContent = document.getElementById('modal-content');

    modal.classList.remove('hidden');
    modalContent.innerHTML = '<div class="p-8 text-center"><div class="loading-spinner mx-auto"></div><p class="mt-4">Memuat detail film...</p></div>';

    try {
        const movie = await fetchMovieDetail(movieId);
        const trailer = await fetchMovieVideos(movieId);
        displayMovieDetail(movie, trailer);
    } catch (error) {
        modalContent.innerHTML = `
          <div class="p-8 text-center">
            <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
            <p class="text-red-400">Gagal memuat detail film: ${error.message}</p>
          </div>
        `;
        showNotification('Gagal memuat detail film: ' + error.message, 'error');
        console.error('Error opening movie detail:', error);
    }
}

function closeModal() {
    document.getElementById('movie-modal').classList.add('hidden');
    const iframe = document.querySelector('#modal-content iframe');
    if (iframe) {
        // Stop YouTube video playback when closing modal
        iframe.src = '';
    }
}

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Mobile genre dropdown toggle
    const mobileGenreButton = document.getElementById('mobile-genre-button');
    const mobileGenreDropdownMenu = document.getElementById('mobile-genre-dropdown-menu');
    if (mobileGenreButton && mobileGenreDropdownMenu) {
        mobileGenreButton.addEventListener('click', () => {
            mobileGenreDropdownMenu.classList.toggle('hidden');
        });
    }

    // Close modal when clicking outside
    document.getElementById('movie-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Initial load
    showHome();
    loadGenresForDropdown(); // Load genres once for dropdowns
});

// Expose functions to global scope for HTML event handlers
window.showHome = showHome;
window.showSearch = showSearch;
window.showGenres = showGenres;
window.handleEnterKey = handleEnterKey;
window.searchMovies = searchMovies;
window.openMovieDetail = openMovieDetail;
window.closeModal = closeModal;
window.showNotification = showNotification; // for debugging if needed