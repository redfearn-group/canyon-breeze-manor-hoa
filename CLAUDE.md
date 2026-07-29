# CLAUDE.md

This file provides guidance to Claude Code when working in this repository.

## What this is

Board tracker for the Canyon Breeze Manor HOA — meetings (agenda/minutes),
service contracts, expenses, and budget. Brady is HOA Vice President
(Craig Jorgensen is President, Greg Robbins is Secretary, per the
2025-11-10 Cover Memo to the Board); built 2026-07-28 as a sibling of
garage-log/home-log but
**deliberately not branded as Redfearn Group** — this represents the HOA
as an organization, not Brady's personal brand, so it does not vendor
`redfearn-brand`'s brand.css.

Deployed at `https://redfearn-group.github.io/canyon-breeze-manor-hoa/`
(same GitHub account as the other properties — there was no separate org
to create it under).

## Commands

```sh
npm run build      # static build to ./dist/, the only validity check (no test suite)
```

Dev server: `preview_start` with a `canyon-breeze-manor-hoa` entry in
`.claude/launch.json` (add one if missing), not `npm run dev` directly.
Served under its base path: `http://localhost:<port>/canyon-breeze-manor-hoa/`.

## Public/private split

Same principle as garage-log/home-log, applied more broadly here because
this data is about the HOA and its residents, not just Brady's own
property:

- `data/*.yaml` (committed, public): meeting dates/type/status, agenda
  topics, contract category/status/renewal date, expense category/status,
  budget category names. Safe to publish.
- `data/private/*.yaml` (gitignored, never committed): meeting minutes
  (may reference specific residents/disputes), vendor names, dollar
  amounts, contract terms, invoice numbers, budgeted-vs-actual figures.

**When adding a new fact, ask whether it names a specific resident, unit,
dollar figure, or vendor rate before putting it in a public `data/*.yaml`
file.** Default to private when in doubt — this is the opposite failure
mode from a vehicle's mileage log, where being wrong costs nothing.

## Architecture

Astro static site, same shape as garage-log/home-log: YAML read at build
time via `src/lib/data.ts`, every page static HTML, no database, no write
path in the deployed site. `getStaticPaths()` in `src/pages/meetings/[id].astro`
generates one page per meeting from `data/meetings.yaml`.

## Current data state (2026-07-28)

Scaffolded with placeholder/empty data — no real contracts, expenses, or
budget entries yet, and tonight's (2026-07-28) meeting has an empty
agenda pending Brady's notes. Don't invent any of it; ask instead, same
rule as home-log's starter data.
