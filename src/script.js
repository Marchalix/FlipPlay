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

const cardBaseClasses =
    "group relative h-[280px] overflow-hidden rounded-[20px] border border-white/15 bg-white/[0.07] isolate backdrop-blur-[16px] transition-transform duration-300 hover:-translate-y-1.5 hover:border-primary/40";

const cardImageClasses =
    "absolute inset-0 z-[-2] h-full w-full object-cover object-top transition-transform duration-400 group-hover:scale-105";

const cardOverlayClasses =
    "absolute inset-0 z-[-1] bg-[linear-gradient(to_bottom,rgba(6,11,10,0.05)_20%,rgba(6,11,10,0.45)_55%,#060B0A_100%)]";

const cardContentClasses = "flex h-full flex-col justify-end p-[22px]";

const badgeClasses =
    "absolute left-[18px] top-[18px] rounded-full border border-primary/20 bg-background/50 px-[9px] py-[5px] text-[8px] uppercase tracking-[1px] text-primary";

const cardTitleClasses = "m-0 mb-1.5 text-[20px] font-medium";

const cardDescriptionClasses =
    "m-0 max-w-[430px] pr-[35px] text-[10px] leading-[1.6] text-white/60";

const cardArrowClasses =
    "absolute bottom-5 right-5 grid h-9 w-9 place-items-center rounded-full border border-primary/20 bg-primary/10 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100";

//render data to card
//template
//arraylist : map
cardGrid.innerHTML = mediaData.map((media) => {
    const cardContent = `
        <img
            src="${media.image}"
            alt="${media.title} entertainment"
            class="${cardImageClasses}"
        >

        <div class="${cardOverlayClasses}" aria-hidden="true"></div>

        <div class="${cardContentClasses}">
            <span class="${badgeClasses}">${media.badge}</span>
            <h3 class="${cardTitleClasses}">${media.title}</h3>
            <p class="${cardDescriptionClasses}">${media.description}</p>

            <span class="${cardArrowClasses}" aria-hidden="true">↗</span>
        </div>
    `;

    if (media.title === "Anime") {
        return `
            <a href="anime/index.html" class="${cardBaseClasses}">
                ${cardContent}
            </a>
        `;
    }

    return `
        <article class="${cardBaseClasses}">
            ${cardContent}
        </article>
    `;
}).join("");