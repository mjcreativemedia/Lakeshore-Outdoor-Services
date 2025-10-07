# Remote images

The site intentionally keeps binary assets out of the repository. Production imagery is hosted on a CDN and described through a
small manifest so Astro pages can reference them without shipping large files in git.

## Workflow

1. **Prepare the asset locally.** Export or edit the image, then optimize it (e.g., with ImageOptim, Squoosh, or Sharp) so it is
   web-ready.
2. **Upload to the CDN.** Place the optimized file in the CDN bucket or media library that serves the site. Copy the final public
   URL.
3. **Add a manifest entry.** Update `src/data/images.remote.json` with an object that includes:
   - `id`: Stable identifier (e.g., `"hero-crew"`).
   - `src`: The CDN URL.
   - `alt`: Human-readable alternative text.
   - Optional metadata you expect to reuse such as `width`, `height`, `credit`, `creditUrl`, `srcset`, or `sizes`.
4. **Consume the image in templates.** Import and render `<RemotePicture id="…" />` in Astro components or pages. The component
   pulls manifest data via `getRemoteImage()` and renders an `<img>` with the configured attributes. Provide any optional HTML
   attributes (class names, loading hints, etc.) as props.

## Runtime helpers

- `getRemoteImage(id)` throws an error when an unknown identifier is requested, guiding you to add the missing entry.
- `listRemoteImages()` returns the manifest array if you need to iterate over available assets (e.g., in a gallery).

This flow keeps the repo lightweight, ensures consistent alt text, and centralizes CDN metadata in one place.
