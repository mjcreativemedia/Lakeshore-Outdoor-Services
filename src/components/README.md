# Components

## Open Graph image workflow

The default Open Graph image is generated on-demand by the `/og/` endpoint (`src/pages/og/index.astro`). The handler builds an SVG layout with `createOgSvg` and rasterizes it to PNG pixels via `rasterizeSvgToPng`, which wraps [`@resvg/resvg-js`](https://github.com/yisibl/resvg-js). Requests can override copy by providing `title`, `subtitle`, `tagline`, or `contact` query parameters. All responses are cached for a day with immutable caching headers.

`SEO.astro` automatically points `og:image` and `twitter:image` to this endpoint when no custom `image` prop is provided, ensuring every page exposes a PNG asset sized `1200x630`.

### Overriding with designer-provided assets

If the design team supplies bespoke artwork:

1. Export the final image as a 1200×630 PNG (or larger while maintaining that 1.91:1 aspect ratio).
2. Add the file to `public/` (e.g., `public/og/services.png`).
3. Pass its absolute URL to the `SEO` component: `<SEO image={new URL('/og/services.png', BUSINESS.site).toString()} {...props} />`.
4. Optionally disable the generated art for that route by setting `image` wherever the page calls `<SEO />`.

You can still keep the dynamic generator for other routes—the fallback only activates when `image` is undefined.
