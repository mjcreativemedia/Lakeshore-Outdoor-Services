# Images

The repository avoids committing binary image assets so the default clone stays lightweight and text-only. When you need to
test Astro's `<Picture />` pipeline locally, generate temporary placeholders on your machine and keep them out of version
control.

## Hero placeholder workflow

The home page hero includes a commented example that expects a file at `src/assets/generated/hero-placeholder.png`. Follow the
steps below to create (and later remove) that file as needed.

1. Create the working directory:
   ```bash
   mkdir -p src/assets/generated
   ```
2. Choose one of the following approaches to place a lightweight image in that directory:
   - **Download a placeholder:**
     ```bash
     curl "https://dummyimage.com/1200x800/60a5fa/eff6ff.png&text=Snow+Crew" \
       --output src/assets/generated/hero-placeholder.png
     ```
     This produces a ~50–70 KB PNG with a gradient background and text label that is sufficient for development.
   - **Generate a gradient with Sharp:**
     ```bash
     npm install --save-dev sharp
     node <<'NODE'
     import sharp from "sharp";

     const width = 1200;
     const height = 800;

     const gradient = Buffer.from(
       `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">\n` +
         '<defs>\n' +
         '  <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">\n' +
         '    <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.75"/>\n' +
         '    <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0.9"/>\n' +
         '  </linearGradient>\n' +
         '</defs>\n' +
         `<rect width="${width}" height="${height}" fill="url(#g)" rx="48"/>\n` +
         '</svg>'
     );

     await sharp(gradient)
       .png({ compressionLevel: 9 })
       .toFile("src/assets/generated/hero-placeholder.png");
     NODE
     ```
     Remove `sharp` from `devDependencies` after you finish if you installed it solely for generating placeholders.

## Using the placeholder with `<Picture />`

Once the image exists locally, uncomment or adapt the example in `src/pages/index.astro`:

```astro
import { Picture } from "astro:assets";

<Picture
  src={Astro.resolve("../assets/generated/hero-placeholder.png")}
  widths={[480, 768, 1024]}
  sizes="(max-width: 960px) 100vw, 520px"
  formats={["avif", "webp", "png"]}
  alt="Snow removal crew clearing a driveway"
  class="hero-picture"
/>
```

## Clean up before committing

Delete any generated binaries when you're done or keep them ignored under `src/assets/generated/`. The `.gitignore` file is
configured to skip that folder so placeholders never reach the repository.
