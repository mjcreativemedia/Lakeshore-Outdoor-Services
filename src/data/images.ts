import manifest from "./images.remote.json";

export interface RemoteImage {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  credit?: string;
  creditUrl?: string;
  srcset?: string | string[];
  sizes?: string;
  [key: string]: unknown;
}

const manifestEntries = manifest as RemoteImage[];
const manifestById = new Map<string, RemoteImage>();

for (const entry of manifestEntries) {
  if (!entry || typeof entry !== "object") {
    throw new Error("Remote image manifest entries must be objects.");
  }

  if (!entry.id || typeof entry.id !== "string") {
    throw new Error("Each remote image entry requires a string `id` field.");
  }

  if (manifestById.has(entry.id)) {
    throw new Error(`Duplicate remote image id detected: "${entry.id}".`);
  }

  manifestById.set(entry.id, Object.freeze({ ...entry }));
}

export function getRemoteImage(id: string): RemoteImage {
  const image = manifestById.get(id);

  if (!image) {
    throw new Error(
      `Remote image with id "${id}" was not found. Add an entry to src/data/images.remote.json to use it.`,
    );
  }

  return image;
}

export function listRemoteImages(): RemoteImage[] {
  return Array.from(manifestById.values());
}
