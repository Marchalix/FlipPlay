const API_URL = "https://ghibliapi.dev/films";

const cardGrid = document.getElementById("card-grid");
const searchInput = document.getElementById("anime-search");
const loadingState = document.getElementById("loading-state");
const errorState = document.getElementById("error-state");
const resultCount = document.getElementById("result-count");
const auraButtons = document.querySelectorAll(".aura-btn");

let allFilms = [];
let activeAura = "all";

async function fetchFilms() {
    loadingState.classList.remove("hidden");
    errorState.classList.add("hidden");

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Gagal mengambil data film.");
        }

        allFilms = await response.json();

        const totalFilms = document.getElementById("total-films");

        if (totalFilms) {
            totalFilms.textContent = `${allFilms.length} films in the collection`;
        }

        loadingState.classList.add("hidden");
        renderFilms();
    } catch (error) {
        loadingState.classList.add("hidden");
        errorState.textContent =
            "Film gagal dimuat. Periksa koneksi internet, lalu refresh halaman.";
        errorState.classList.remove("hidden");
        console.error(error);
    }
}

//arraylist : filter
function getAuraFilms(films) {
    if (activeAura === "energy") {
        return films.filter((film) => {
            const text =
                `${film.title} ${film.description}`.toLowerCase();

            return /adventure|battle|war|journey|fight|rescue|chase|quest/.test(text);
        });
    }

    if (activeAura === "melancholy") {
        return films.filter((film) => {
            const text =
                `${film.title} ${film.description}`.toLowerCase();

            return /loss|lonely|memory|sad|death|grief|separation|farewell|goodbye/.test(text);
        });
    }

    if (activeAura === "binge") {
        return films.filter((film) => {
            const duration = Number(film.running_time);

            return duration > 0 && duration <= 120;
        });
    }

    return films;
}


const filmModal = document.getElementById("film-modal");
const closeModalButton = document.getElementById("close-modal");

function openFilmModal(film) {
    document.getElementById("modal-image").src =
        film.movie_banner || film.image || "";

    document.getElementById("modal-image").alt = film.title || "Film poster";
    document.getElementById("modal-title").textContent = film.title || "Untitled";
    document.getElementById("modal-meta").textContent =
        `${film.release_date || "Year unknown"} · ${film.running_time || "?"} min`;

    document.getElementById("modal-description").textContent =
        film.description || "No description available.";

    document.getElementById("modal-director").textContent =
        film.director || "Unknown";

    document.getElementById("modal-score").textContent =
        film.rt_score ? `${film.rt_score}/100` : "Not available";

    document.getElementById("modal-producer").textContent =
        film.producer || "Unknown";

    console.log("Modal dibuka:", film.title);
    console.log("Elemen modal:", filmModal);

    filmModal.classList.remove("hidden");
    filmModal.classList.add("flex");
    document.body.style.overflow = "hidden";

    console.log("Class modal:", filmModal.className);
    console.log("Ukuran modal:", filmModal.getBoundingClientRect());
    console.log("Display modal:", getComputedStyle(filmModal).display);
}

function closeFilmModal() {
    filmModal.classList.add("hidden");
    filmModal.classList.remove("flex");
    document.body.style.overflow = "";
}

closeModalButton.addEventListener("click", closeFilmModal);

filmModal.addEventListener("click", (event) => {
    if (event.target === filmModal) {
        closeFilmModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !filmModal.classList.contains("hidden")) {
        closeFilmModal();
    }
});

function renderFilms() {
    const keyword = searchInput.value.trim().toLowerCase();

    const searchedFilms = allFilms.filter((film) =>
        film.title.toLowerCase().includes(keyword)
    );

    const filteredFilms = getAuraFilms(searchedFilms);

    cardGrid.innerHTML = "";

    resultCount.textContent =
        `Showing ${filteredFilms.length} films`;

    if (filteredFilms.length === 0) {
        cardGrid.innerHTML = `
            <p class="col-span-full py-10 text-center text-white/60">
                Film tidak ditemukan. Coba kata kunci atau filter lain.
            </p>
        `;
        return;
    }

    //arraylist : foreach
    filteredFilms.forEach((film) => {
        const card = document.createElement("article");

        card.className = `
            group overflow-hidden rounded-2xl
            border border-white/10
            bg-[#101815]
            transition-all duration-300
            hover:-translate-y-1
            hover:border-emerald-400/50
            hover:shadow-xl hover:shadow-emerald-950/30
        `;

        const image = film.movie_banner || film.image;

        card.innerHTML = `
            <div class="relative overflow-hidden">
                <img
                    src="${image}"
                    alt="${film.title}"
                    class="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                >

                <div class="absolute inset-0 bg-gradient-to-t from-[#101815] via-transparent to-black/10"></div>

                <span class="absolute left-4 top-4 rounded-full border border-emerald-300/30 bg-black/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-200 backdrop-blur">
                    Studio Ghibli
                </span>

                <span class="absolute bottom-3 right-3 rounded-lg bg-black/60 px-2.5 py-1 text-xs text-white/80 backdrop-blur">
                    ${film.rt_score || "—"} / 100
                </span>
            </div>

            <div class="p-5">
                <p class="mb-2 text-xs tracking-wide text-emerald-300/80">
                    ${film.release_date || "Year unknown"} · ${film.running_time || "?"} min
                </p>

                <h2 class="mb-3 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-emerald-200">
                    ${film.title}
                </h2>

                <div class="mb-5">
                    <p class="film-description line-clamp-3 text-sm leading-6 text-white/60">
                        ${film.description || "No description available."}
                    </p>

                    <button
                        type="button"
                        class="read-more mt-2 text-xs font-medium text-emerald-300 hover:text-emerald-200"
                        aria-expanded="false"
                    >
                        Read more
                    </button>
                </div>

                <div class="border-t border-white/10 pt-3">
                    <p class="text-xs text-white/40">
                        Directed by
                    </p>
                    <p class="mt-1 text-sm text-white/80">
                        ${film.director || "Unknown"}
                    </p>
                </div>
            </div>
        `;

        cardGrid.appendChild(card);

        card.addEventListener("click", (event) => {
            if (
                event.target.closest(".read-more") ||
                event.target.closest("button")
            ) {
                return;
            }

            openFilmModal(film);
            
        });

        const description = card.querySelector(".film-description");
        const readMoreButton = card.querySelector(".read-more");

        readMoreButton.addEventListener("click", () => {
            const isExpanded =
                readMoreButton.getAttribute("aria-expanded") === "true";

            description.classList.toggle("line-clamp-3", isExpanded);

            readMoreButton.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            readMoreButton.textContent = isExpanded
                ? "Read more"
                : "Show less";
        });
    });
}

//search
searchInput.addEventListener("input", renderFilms);

//buton filter
//arraylist : for each
auraButtons.forEach((button) => {
    button.addEventListener("click", () => {
        activeAura = button.dataset.aura;

        auraButtons.forEach((item) => {
            const isActive = item === button;

            item.setAttribute("aria-pressed", String(isActive));
            item.classList.toggle("border-primary", isActive);
            item.classList.toggle("bg-primary/10", isActive);
            item.classList.toggle("text-primary", isActive);
            item.classList.toggle("border-white/20", !isActive);
        });

        renderFilms();
    });
});

fetchFilms();