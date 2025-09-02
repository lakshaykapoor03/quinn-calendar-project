const STORAGE_KEY = "hair_diary_entries_v1";

const subscribers = new Set();

function loadInitialData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
    try {
      const seed = require("../data/journalEntries");
      const list = Array.isArray(seed.journalEntries)
        ? seed.journalEntries
        : [];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      save(list);
      return list;
    } catch (e) {
      return [];
    }
  } catch (e) {
    return [];
  }
}

let entries = loadInitialData();

function save(next) {
  entries = next;
  subscribers.forEach((fn) => {
    try {
      fn(entries);
    } catch (_) {}
  });
}

export function subscribe(listener) {
  subscribers.add(listener);
  return () => subscribers.delete(listener);
}

export function getAll() {
  return entries.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
}

export function getByDate(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const key = `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(
    2,
    "0"
  )}`;
  return entries.filter((e) => e.date === key);
}

export function add(entry) {
  const id = entry.id ?? Date.now();
  const normalized = normalizeEntry({ ...entry, id });
  save([...entries, normalized]);
  return normalized;
}

export function update(id, patch) {
  save(
    entries.map((e) => (e.id === id ? normalizeEntry({ ...e, ...patch }) : e))
  );
}

export function remove(id) {
  save(entries.filter((e) => e.id !== id));
}

function normalizeEntry(entry) {
  let dateStr = entry.date;
  if (typeof dateStr === "string" && dateStr.includes("/")) {
    const [mm, dd, yyyy] = dateStr.split("/");
    dateStr = `${yyyy}-${String(mm).padStart(2, "0")}-${String(dd).padStart(
      2,
      "0"
    )}`;
  }
  if (entry.date instanceof Date) {
    const d = entry.date;
    dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  }
  return {
    id: entry.id,
    imageUrl: entry.imageUrl || entry.imgUrl || "",
    rating: Number(entry.rating ?? 0),
    categories: Array.isArray(entry.categories) ? entry.categories : [],
    description: entry.description ?? "",
    date: dateStr,
  };
}

export function clearAll() {
  save([]);
}
