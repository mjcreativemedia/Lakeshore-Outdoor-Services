import type { APIRoute } from 'astro';
import { BUSINESS, phone_display } from '../../data/business';

export const prerender = true;

const WIDTH = 1200;
const HEIGHT = 630;
const BACKGROUND_GRADIENT_ID = 'bg';
const ACCENT_GRADIENT_ID = 'accent';

const svgTemplate = () => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">${BUSINESS.name}</title>
  <desc id="desc">Winter property maintenance specialists in Chicagoland</desc>
  <defs>
    <linearGradient id="${BACKGROUND_GRADIENT_ID}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#172554" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="${ACCENT_GRADIENT_ID}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.6" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feOffset dx="0" dy="18" />
      <feGaussianBlur stdDeviation="24" result="blur" />
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0.1  0 0 0 0 0.2  0 0 0 0.25 0" />
      <feBlend in="SourceGraphic" in2="blur" mode="normal" />
    </filter>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#${BACKGROUND_GRADIENT_ID})" rx="48" />
  <g filter="url(#shadow)">
    <rect x="96" y="96" width="${WIDTH - 192}" height="${HEIGHT - 192}" rx="32" fill="rgba(15, 23, 42, 0.65)" stroke="url(#${ACCENT_GRADIENT_ID})" stroke-width="4" />
  </g>
  <g transform="translate(140 200)">
    <text fill="#e2e8f0" font-family="'Inter', 'Segoe UI', sans-serif" font-size="64" font-weight="700" letter-spacing="0.02em">
      ${BUSINESS.name}
    </text>
    <text y="96" fill="#cbd5f5" font-family="'Inter', 'Segoe UI', sans-serif" font-size="32" font-weight="500" letter-spacing="0.04em">
      Snow &amp; ice management across Chicago neighborhoods
    </text>
    <text y="164" fill="#93c5fd" font-family="'Inter', 'Segoe UI', sans-serif" font-size="26" font-weight="500">
      Call ${phone_display}
    </text>
    <text y="214" fill="#bae6fd" font-family="'Inter', 'Segoe UI', sans-serif" font-size="24" font-weight="400">
      ${new URL(BUSINESS.site).hostname}
    </text>
  </g>
</svg>`;

export const GET: APIRoute = async () => {
  const svg = svgTemplate();
  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, immutable'
    }
  });
};
