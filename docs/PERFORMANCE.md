# Performance & Delivery Notes

Measured at S21 (next build, production server, Node 24, Windows).

## SSR HTML weight (gzip, server-rendered bytes)

| Route | Raw | gzip |
| --- | --- | --- |
| `/` | 27.4 KB | 5.3 KB |
| `/recipes/pizza-napoletana` | 53.1 KB | 8.9 KB |
| `/explore/naples` | 35.4 KB | 6.8 KB |
| `/history/biryani-long-march` | 40.3 KB | 7.4 KB |
| `/history` | 50.5 KB | 7.0 KB |
| `/dishes` | 41.6 KB | 7.6 KB |
| `/kitchen` | 34.3 KB | 7.3 KB |
| `/market` | 25.1 KB | 5.1 KB |
| `/planner` | 32.3 KB | 6.0 KB |
| `/ingredients` | 38.3 KB | 6.3 KB |
| `/tools` | 28.6 KB | 6.3 KB |
| `/saved` | 21.4 KB | 4.7 KB |
| `/assistant` | 21.1 KB | 4.5 KB |
| **13 routes** | | **83.1 KB total** |

All data-driven pages except `/recipes` are statically rendered at build time
(`generateStaticParams` + `dynamicParams = false`); `/recipes` stays dynamic to
honor the `?region=` deep link.

## Delivery strategy
- `next.config.ts`: `poweredByHeader: false`, response compression on, static
  asset `immutable` caching for `/_next/static/*`, short TTL + stale-while-
  revalidate for `/media/*` (procedural posters, content can be re-tagged).
- Motion has been removed from the runtime (no framer-motion, no scroll/reveal
  libraries): transitions are pure CSS and respect `prefers-reduced-motion`
  automatically. Lightweight, zero animation JS after hydration.
- No heavy runtime data: recipe/region/history/ingredient data is compiled into
  the build (static). Live postgres/Redis/YouTube/grocery calls remain
  `BLOCKED_EXTERNAL_DEPENDENCY` and are not part of page rendering.
- Procedural SVG posters rather than photo downloads keep first paint light and
  avoid third-party asset latency.

## Re-measure command
```
node -e "const fs=require('fs'),path=require('path'),zlib=require('zlib');const r='.next/server/app';
const slugs=['/','/recipes/pizza-napoletana','/explore/naples','/history'];let t=0;
for(const s of slugs){const f=path.join(r,s==='/'?'index.html':s.slice(1)+'.html');const b=fs.readFileSync(f);const g=zlib.gzipSync(b).length;t+=g;console.log(s,(b.length/1024).toFixed(1)+'KB','gzip '+(g/1024).toFixed(1)+'KB')}console.log('total gzip KB: '+(t/1024).toFixed(1));"
```
Run after `npm run build`.