# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

The **public**, resident-facing site for the Canyon Breeze Manor HOA in
Spanish Fork, Utah. Its reason to exist is the common-area landscaping
and irrigation map: zones, watering schedules, trees, and how a resident
reports a problem. Everything else on it is reference material residents
ask for anyway (dues, what they cover, insurance, governing documents,
meeting dates).

The board tracker is a **separate private repo**,
`redfearn-group/canyon-breeze-manor-hoa-private`. Meetings agendas and
minutes, contracts, vendors, expenses, budget detail, the resident
watchlist, and the board task list all live there. None of it belongs
here.

Deployed at `https://redfearn-group.github.io/canyon-breeze-manor-hoa/`.
A Redfearn Group property: Brady built it on his own tools and his own
time, with no HOA funding. It vendors `redfearn-brand`'s brand.css
(app-layer, dark) and follows the `redfearn-group-style` skill's voice
rules, including in the YAML.

## The rule that matters most

**Nothing in this repo may name a person or a company, or carry a unit
number, address, or an unpublished dollar figure.** Not in a value, not
in a comment, not in a slug or an id. **Slugs and ids are content.** Six
of the eight contract slugs this repo previously shipped encoded a vendor
or a person's name, in a file whose own header comment claimed it held
public metadata only. A per-vendor record with a stable key attracts
vendor identity every time someone adds a row, which is why there is no
contracts file here now.

An earlier version of this repo carried board data it should not have.
It was deleted and recreated from a clean tree rather than force-pushed,
because GitHub keeps unreachable objects fetchable by SHA and a rewritten
history is not a purge. Do not reintroduce that data, and do not restate
here what it was: a dated inventory of a past exposure is a map for
anyone hunting a cached copy. The detail lives in the private repo.

Three narrow exceptions, all of them facts the property manager already
publishes on its own public page at `https://www.tpmhoa.com/canyon-breeze/`:

- Dues of $90/month effective 2025-05-01, the $200 reinvestment fee, and
  the $75 setup fee.
- The master liability insurance carrier and its phone number.
- The adopted annual budget's line-item figures, because the property
  manager publishes that budget PDF and this site hosts a copy of it.

Everything sourced from board records is private, even when the topic
sounds resident-facing. Unresolved compliance questions, draft policies
that were never adopted and noticed to owners, and vendor contract status
are all board records.

**Before adding a fact, ask where it came from.** If the answer is
minutes, a board email, an invoice, or the monthly owner statement, it
goes in the private repo.

## Commands

```sh
npm run build      # static build to ./dist/, the only validity check (no test suite)
```

Dev server: `preview_start` with the `canyon-breeze-manor-hoa` entry in
the workspace `.claude/launch.json`, not `npm run dev` directly. Served
under its base path: `http://localhost:4325/canyon-breeze-manor-hoa/`.

## Architecture

Astro static site, same shape as garage-log and home-log: YAML read at
build time via `src/lib/data.ts`, every page static HTML, no database, no
write path. No UI framework and no runtime JS dependencies.

`src/lib/types.ts` carries a header stating that every field renders
publicly, since `data.ts` loads YAML straight through with no field-level
filtering. That header is the guardrail. Respect it.

### The map

`src/components/NeighborhoodMap.astro` inlines `public/map/base.svg` at
build time and draws data on top of it:

- **Zone shapes come from the SVG**, each carrying `id="zone-<id>"`. The
  base is exported from Brady's Figma file and is the one thing in this
  repo not authored here. Re-exporting it must not destroy annotations,
  which is why only the artwork lives in the SVG.
- **Pins come from YAML** (`x`/`y` in the SVG's viewBox space). These are
  not latitude and longitude. This site publishes no geographic
  coordinates, and it must not start.

Layer toggles are checkboxes driving classes on the SVG root. With
JavaScript off, every layer renders. Every layer also has a paired table
below the map: a map alone is not an accessible interface, and the tables
are what make the page useful in print.

### The itemType join

Seasonal service due-status matches `service.yaml`'s `itemType` against
events carrying the **same** `itemType`, the same pattern as garage-log
and home-log. An event with a good description but the wrong or missing
`itemType` is invisible to the calculation and the controller reads as
never serviced.

## Known gaps

- `public/map/base.svg` is a placeholder. The real Figma export has not
  landed yet. Swapping it is a one-file change as long as zone groups
  carry `id="zone-<id>"`.
- The recorded plat is not hosted. It is a scanned PDF with no text layer
  and could not be rendered in the environment where this was built, so
  it was never read. Do not publish it until someone has actually looked
  at it.
- The two resident notices in `data/policies.yaml` are marked `sent`
  based on an inference in the old board records, not a confirmation.
  Their delivery dates are deliberately not published for that reason.
