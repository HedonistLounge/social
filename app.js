const events = [
  {
    id: 1,
    mode: "event",
    typeLabel: "Public Event",
    title: "Techno Night at Hedonist Budapest",
    date: "2025-11-21 · 22:00",
    location: "Budapest · a&o Hostel City, Csengery utca 11",
    tags: ["Party", "Techno", "Local"],
    spots: "Open group",
    joinLink: "https://www.facebook.com/pages/Hedonist-Budapest/103888548802123/"
  },
  {
    id: 2,
    mode: "event",
    typeLabel: "Workshop",
    title: "Budapest Pottery Workshop x Hedonist",
    date: "2025-11-23 · 15:00",
    location: "Budapest · a&o Hostel area",
    tags: ["Art", "Workshop", "Afternoon"],
    spots: "Limited seats",
    joinLink: "mailto:gokhunerbek@hotmail.com?subject=Pottery%20Workshop%20reservation"
  },
  {
    id: 3,
    mode: "house",
    typeLabel: "House Party",
    title: "Wine and Vinyl Night",
    date: "2025-11-22 · 20:00",
    location: "Budapest · near Klauzál tér (exact address after join)",
    tags: ["Wine", "Chill", "Max 10"],
    spots: "6 spots left",
    joinLink: "mailto:gokhunerbek@hotmail.com?subject=Join%20Wine%20and%20Vinyl%20Night"
  },
  {
    id: 4,
    mode: "hangout",
    typeLabel: "Hangout",
    title: "Coffee and Walk by the Danube",
    date: "Tomorrow · 16:00",
    location: "Budapest · Liberty Bridge area",
    tags: ["Daytime", "Chill", "New People"],
    spots: "2–4 people",
    joinLink: "mailto:gokhunerbek@hotmail.com?subject=Join%20Coffee%20and%20Walk"
  },
  {
    id: 5,
    mode: "hangout",
    typeLabel: "Hangout",
    title: "Ruin Bar Crawl",
    date: "Tonight · 21:00",
    location: "Budapest · meeting at Deák Ferenc tér",
    tags: ["Bars", "Night", "Mixed Group"],
    spots: "5–12 people",
    joinLink: "https://www.google.com/maps/search/?api=1&query=De%C3%A1k+Ferenc+t%C3%A9r+Budapest"
  },
  {
    id: 6,
    mode: "house",
    typeLabel: "House Dinner",
    title: "International Dinner and Games",
    date: "2025-11-25 · 19:30",
    location: "Budapest · near a&o Hostel",
    tags: ["Food", "Games", "Intimate"],
    spots: "8 spots total",
    joinLink: "mailto:gokhunerbek@hotmail.com?subject=Join%20International%20Dinner"
  },
  {
    id: 7,
    mode: "event",
    typeLabel: "Comedy Night",
    title: "Stand-up and Drinks",
    date: "2025-11-26 · 20:00",
    location: "Budapest · district VII",
    tags: ["Comedy", "Drinks", "Night"],
    spots: "Open group",
    joinLink: "mailto:gokhunerbek@hotmail.com?subject=Join%20Comedy%20Night"
  }
];

const eventsContainer = document.getElementById("events-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("join-modal");
const modalTitle = document.getElementById("modal-title");
const modalLink = document.getElementById("modal-link");
const modalClose = document.getElementById("modal-close");

function renderEvents(filterMode = "all") {
  eventsContainer.innerHTML = "";

  const filtered = events.filter(event => {
    if (filterMode === "all") return true;
    return event.mode === filterMode;
  });

  if (filtered.length === 0) {
    eventsContainer.innerHTML = '<p style="opacity:0.75;font-size:0.9rem;">No events in this category yet. Add some in app.js.</p>';
    return;
  }

  filtered.forEach(event => {
    const card = document.createElement("article");
    card.className = "event-card";

    const tagsHtml = event.tags
      .map(tag => "<span class=\"tag\">" + tag + "</span>")
      .join("");

    card.innerHTML = `
      <div class="event-type">${event.typeLabel}</div>
      <h2 class="event-title">${event.title}</h2>
      <div class="event-meta">
        <span>📅 ${event.date}</span>
        <span>📍 ${event.location}</span>
      </div>
      <div class="event-tags">${tagsHtml}</div>
      <div class="event-footer">
        <span class="spots">${event.spots}</span>
        <button class="join-btn" data-id="${event.id}">Join</button>
      </div>
    `;

    eventsContainer.appendChild(card);
  });

  document.querySelectorAll(".join-btn").forEach(button => {
    button.addEventListener("click", () => {
      const id = Number(button.getAttribute("data-id"));
      const event = events.find(e => e.id === id);
      if (!event) return;

      modalTitle.textContent = event.title;
      modalLink.href = event.joinLink || "#";
      modal.classList.remove("hidden");
    });
  });
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.getAttribute("data-filter");
    renderEvents(filter);
  });
});

modalClose.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", event => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

document.querySelectorAll("[data-scroll-target]").forEach(element => {
  element.addEventListener("click", () => {
    const target = element.getAttribute("data-scroll-target");
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

renderEvents("all");
