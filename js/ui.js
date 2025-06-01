function createMovieCard(movie) {
  const div = document.createElement("div");
  div.className =
    "movie-card bg-gray-800 rounded-xl overflow-hidden shadow-lg cursor-pointer";
  div.onclick = () => openMovieDetail(movie.id);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://via.placeholder.com/300x450/374151/ffffff?text=No+Image";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";

  div.innerHTML = `
        <div class="relative">
          <img src="${posterUrl}" alt="${
    movie.title
  }" class="w-full h-72 object-cover" />
          <div class="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-sm">
            <i class="fas fa-star text-yellow-400 mr-1"></i>
            ${rating}
          </div>
        </div>
        <div class="p-4">
          <h4 class="font-bold text-lg mb-2 line-clamp-2">${movie.title}</h4>
          ${year ? `<p class="text-gray-400 text-sm mb-2">${year}</p>` : ""}
          <p class="text-gray-300 text-sm line-clamp-3">
            ${movie.overview || "Tidak ada deskripsi tersedia."}
          </p>
        </div>
      `;

  return div;
}

function displayMovies(movies, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID ${containerId} not found.`);
    return;
  }
  container.innerHTML = "";
  if (movies.length === 0) {
    // Optionally display a "no movies found" message within the container
    container.innerHTML =
      '<p class="text-gray-400 text-center col-span-full">Tidak ada film ditemukan.</p>';
    return;
  }
  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie);
    container.appendChild(movieCard);
  });
}

async function displayMovieDetail(movie, trailer) {
  const apiKey = "5d476c1449223c5dea8e49b5c005808f";

  const creditsRes = await fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}&language=id-ID`
  );
  const creditsData = await creditsRes.json();

  // Cari nama sutradara
  const director =
    creditsData.crew.find((person) => person.job === "Director")?.name ||
    "Tidak diketahui";

  // Ambil 3 pemeran utama (bisa diubah lebih banyak)
  const actors =
    creditsData.cast
      .slice(0, 3)
      .map((actor) => actor.name)
      .join(", ") || "Tidak diketahui";

  const modalContent = document.getElementById("modal-content");
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750/374151/ffffff?text=No+Image";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";
  const runtime = movie.runtime ? `${movie.runtime} menit` : "";
  const genres = movie.genres ? movie.genres.map((g) => g.name).join(", ") : "";

  modalContent.innerHTML = `
        ${
          backdropUrl
            ? `
          <div class="relative h-64 bg-cover bg-center" style="background-image: url('${backdropUrl}')">
            <div class="absolute inset-0 bg-black bg-opacity-60"></div>
          </div>
        `
            : ""
        }
        
        <div class="p-6">
          <div class="flex flex-col md:flex-row gap-6">
            <div class="md:w-1/3">
              <img src="${posterUrl}" alt="${
                movie.title
            }" class="w-full rounded-xl shadow-lg" />
            </div>
            
            <div class="md:w-2/3">
              <h2 class="text-3xl font-bold mb-4">${movie.title}</h2>
              
              <div class="flex flex-wrap items-center gap-4 mb-6 text-sm">
                <div class="flex items-center bg-yellow-600 text-white px-3 py-1 rounded-full">
                  <i class="fas fa-star mr-1"></i>
                  ${rating}
                </div>
                ${
                  releaseYear
                    ? `<span class="text-gray-400">${releaseYear}</span>`
                    : ""
                }
                ${
                  runtime ? `<span class="text-gray-400">${runtime}</span>` : ""
                }
              </div>
              
              ${
                genres
                  ? `<p class="text-accent mb-4"><strong>Genre:</strong> ${genres}</p>`
                  : ""
              }

                <p class="text-accent mb-4"><strong>Sutradara:</strong> ${director}</p>
                <p class="text-accent mb-4"><strong>Pemeran:</strong> ${actors}</p>
                <p class="text-accent mb-4"><strong>Negara Produksi:</strong> ${
                    movie.production_countries?.map((c) => c.name).join(", ") ||
                    "Tidak diketahui"
                }</p>


                
              <div class="mb-6">
                <h3 class="text-xl font-semibold mb-2">Sinopsis</h3>
                <p class="text-gray-300 leading-relaxed">
                  ${movie.overview || "Tidak ada sinopsis tersedia."}
                </p>
              </div>
              
              <div class="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span class="text-gray-400">Tanggal Rilis:</span>
                  <p class="font-semibold">${
                    movie.release_date || "Tidak diketahui"
                  }</p>
                </div>
                <div>
                  <span class="text-gray-400">Jumlah Vote:</span>
                  <p class="font-semibold">${
                    movie.vote_count
                      ? movie.vote_count.toLocaleString()
                      : "Tidak ada"
                  }</p>
                </div>
              </div>
            </div>
          </div>
          
          ${
            trailer
              ? `
            <div class="mt-8">
              <h3 class="text-2xl font-bold mb-4">
                <i class="fas fa-play-circle text-red-500 mr-2"></i>
                Trailer
              </h3>
              <div class="aspect-w-16 aspect-h-9">
                <iframe 
                  src="https://www.youtube.com/embed/${trailer.key}" 
                  class="w-full h-64 md:h-96 rounded-xl"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
                </iframe>
              </div>
            </div>
          `
              : '<p class="mt-6 text-gray-400 text-center"><em>Trailer tidak tersedia</em></p>'
          }
        </div>
      `;
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
    type === "error"
      ? "bg-red-600"
      : type === "warning"
      ? "bg-yellow-600"
      : "bg-blue-600"
  } text-white`;
  notification.innerHTML = `
        <div class="flex items-center">
          <i class="fas ${
            type === "error"
              ? "fa-exclamation-circle"
              : type === "warning"
              ? "fa-exclamation-triangle"
              : "fa-info-circle"
          } mr-2"></i>
          ${message}
        </div>
      `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 10); // Small delay to ensure transition applies

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function showLoading(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.remove("hidden");
    element.classList.add("flex");
  }
}

function hideLoading(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.add("hidden");
    element.classList.remove("flex");
  }
}
