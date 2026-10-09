const mediaData = [

    {
        title: "Anime",
        badge: "Featured",
        description:
            "Discover exciting worlds, unforgettable characters, and stories from different genres.",
        image:
            "https://i.pinimg.com/736x/e8/d9/46/e8d9465bfc5cb7ee081ad7f475fac148.jpg"
    },

    {
        title: "Drama",
        badge: "Watch",
        description:
            "Stories, characters, and moments worth getting emotionally invested in.",
        image:
            "https://i.pinimg.com/736x/e2/78/25/e2782518d0110471d2266cae1a7995b8.jpg"
    },

    {
        title: "Manga",
        badge: "Read",
        description:
            "Explore illustrated stories and discover new worlds.",
        image:
            "https://i.pinimg.com/1200x/0f/f2/c5/0ff2c5a3da732a0c5cd293fc16d65a3b.jpg"
    },

    {
        title: "Light Novel",
        badge: "Stories",
        description:
            "Dive deeper into detailed stories and imaginative worlds.",
        image:
            "https://i.pinimg.com/1200x/6d/a1/41/6da1417485331771d35d1677071a5b3b.jpg"
    },

    {
        title: "Movies",
        badge: "Watch",
        description:
            "Find memorable films, new releases, and stories worth watching.",
        image:
            "https://i.pinimg.com/736x/25/0c/1e/250c1ea288e69805cfc401a9bbf2c009.jpg"
    },

    {
        title: "Series",
        badge: "Binge",
        description:
            "Follow longer stories, evolving characters, and episodes worth continuing.",
        image:
            "https://i.pinimg.com/1200x/87/53/e7/8753e705a1aff121f01e4902b6145805.jpg"
    },

    {
        title: "Games",
        badge: "Play",
        description:
            "Discover games, challenges, and new worlds to explore.",
        image:
            "https://i.pinimg.com/736x/d5/66/35/d56635698589a94481e9620acf8528d4.jpg"
    },

    {
        title: "Songs",
        badge: "Listen",
        description:
            "Discover songs, artists, and sounds that match your mood.",
        image:
            "https://i.pinimg.com/1200x/aa/7a/54/aa7a5407a469b5fd84a8c87e7a7887c2.jpg"
    }

];


const cardGrid = document.getElementById("card-grid");


cardGrid.innerHTML = mediaData.map((media) => `

    <article class="media-card">

        <img
            src="${media.image}"
            alt="${media.title} entertainment"
            class="media-card-image"
        >

        <div class="media-card-overlay"></div>

        <div class="media-card-content">

            <span class="badge">
                ${media.badge}
            </span>

            <h3 class="media-card-title">
                ${media.title}
            </h3>

            <p class="media-card-description">
                ${media.description}
            </p>

            <span class="media-card-arrow">
                ↗
            </span>

        </div>

    </article>

`).join("");