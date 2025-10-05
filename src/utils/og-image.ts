import { Resvg } from "@resvg/resvg-js";
import { BUSINESS } from "../data/business";

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export interface OgImageOptions {
  title: string;
  subtitle: string;
  tagline: string;
  contact: string;
  brand?: string;
  width?: number;
  height?: number;
}

export interface RasterizeOptions {
  background?: string;
  scale?: number;
}

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      default:
        return char;
    }
  });

const wrapText = (value: string, maxChars = 28): string[] => {
  const normalized = value
    .split(/\r?\n/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  const lines: string[] = [];

  for (const segment of normalized) {
    const words = segment.split(/\s+/);
    let current = "";

    for (const word of words) {
      if (!current.length) {
        current = word;
        continue;
      }

      const next = `${current} ${word}`;
      if (next.length <= maxChars) {
        current = next;
      } else {
        lines.push(current);
        current = word;
      }
    }

    if (current.length) {
      lines.push(current);
    }
  }

  return lines.length ? lines : [value.trim()];
};

const createTspans = (lines: string[], x: number, y: number, lineHeight: number): string => {
  if (!lines.length) return "";

  return lines
    .map((line, index) => {
      const position = index === 0 ? `x="${x}" y="${y}"` : `x="${x}" dy="${lineHeight}"`;
      return `<tspan ${position}>${escapeHtml(line)}</tspan>`;
    })
    .join("");
};

const estimateLabelWidth = (label: string, fontSize: number, basePadding: number): number => {
  const averageGlyphWidth = fontSize * 0.62;
  return Math.round(label.length * averageGlyphWidth + basePadding);
};

export const createOgSvg = ({
  title,
  subtitle,
  tagline,
  contact,
  brand = BUSINESS.name,
  width = OG_IMAGE_WIDTH,
  height = OG_IMAGE_HEIGHT,
}: OgImageOptions): string => {
  const paddedWidth = width;
  const paddedHeight = height;
  const padding = 80;

  const brandLabel = brand.toUpperCase();
  const brandWidth = Math.max(estimateLabelWidth(brandLabel, 24, 80), 320);

  const titleLines = wrapText(title, 22);
  const subtitleLines = wrapText(subtitle, 32);

  const titleY = padding + 180;
  const subtitleY = titleY + Math.max(titleLines.length, 1) * 78 + 32;
  const taglineY = paddedHeight - padding * 1.35;

  const contactLabel = escapeHtml(contact);
  const taglineLabel = escapeHtml(tagline);

  const titleTspans = createTspans(titleLines, padding, titleY, 78);
  const subtitleTspans = createTspans(subtitleLines, padding, subtitleY, 54);

  const contactBoxWidth = Math.max(estimateLabelWidth(contact, 28, 160), 320);
  const contactX = padding;
  const contactY = paddedHeight - padding - 20;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${paddedWidth}" height="${paddedHeight}" viewBox="0 0 ${paddedWidth} ${paddedHeight}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="ogTitle">
  <title id="ogTitle">${escapeHtml(title)}</title>
  <desc>${escapeHtml(tagline)}</desc>
  <defs>
    <linearGradient id="bgGradient" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0B172A" />
      <stop offset="100%" stop-color="#11354A" />
    </linearGradient>
    <linearGradient id="accentGradient" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#22D3EE" />
      <stop offset="100%" stop-color="#38BDF8" />
    </linearGradient>
  </defs>
  <rect width="${paddedWidth}" height="${paddedHeight}" fill="url(#bgGradient)" />
  <rect x="${paddedWidth - 320}" y="${padding - 40}" width="260" height="260" rx="32" fill="#0F1F2D" opacity="0.45" />
  <rect x="${padding - 24}" y="${padding + 36}" width="${paddedWidth - padding * 2 + 48}" height="${paddedHeight - padding * 2 - 24}" rx="48" fill="#0E2435" opacity="0.45" />
  <path d="M${paddedWidth - 180} ${paddedHeight - 80} C${paddedWidth - 80} ${paddedHeight - 180} ${paddedWidth - 200} ${padding} ${paddedWidth - 60} ${padding}" stroke="url(#accentGradient)" stroke-width="6" stroke-linecap="round" opacity="0.45" />
  <rect x="${padding - 4}" y="${padding - 4}" width="${brandWidth}" height="52" rx="18" fill="#134E4A" opacity="0.35" />
  <text x="${padding + 16}" y="${padding + 30}" font-family="'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="24" font-weight="600" letter-spacing="0.14em" fill="#A5F3FC">${escapeHtml(brandLabel)}</text>
  <text font-family="'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="72" font-weight="700" fill="#F8FAFC" letter-spacing="0.01em">
    ${titleTspans}
  </text>
  <text font-family="'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="44" font-weight="500" fill="#E0F2FE" opacity="0.92">
    ${subtitleTspans}
  </text>
  <g>
    <rect x="${contactX}" y="${contactY - 64}" width="${contactBoxWidth}" height="72" rx="24" fill="rgba(15, 118, 110, 0.9)" />
    <text x="${contactX + 36}" y="${contactY - 20}" font-family="'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="36" font-weight="600" fill="#ECFEFF">
      ${contactLabel}
    </text>
  </g>
  <text x="${padding}" y="${taglineY}" font-family="'Inter', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif" font-size="32" font-weight="400" fill="#BAE6FD" opacity="0.95">
    ${taglineLabel}
  </text>
</svg>`;
};

export const rasterizeSvgToPng = async (
  svg: string,
  options: RasterizeOptions = {},
): Promise<Buffer> => {
  const { background = "rgba(0, 0, 0, 0)", scale = 1 } = options;

  const renderer = new Resvg(svg, {
    background,
    fitTo: scale === 1 ? { mode: "original" } : { mode: "zoom", value: scale },
    fonts: {
      loadSystemFonts: true,
    },
  });

  return Buffer.from(renderer.render().asPng());
};
