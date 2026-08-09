# Canyon Breeze Manor HOA

The resident-facing site for Canyon Breeze Manor in Spanish Fork, Utah.
Built by Brady Redfearn as a [Redfearn Group](https://redfearn.group)
property: his own tools, his own time, no HOA funding.

**Live:** [redfearn-group.github.io/canyon-breeze-manor-hoa](https://redfearn-group.github.io/canyon-breeze-manor-hoa/)

## What it's for

The community's irrigation system runs on four controllers across a lot
of common area, and the practical problem is that nobody can point at a
dead patch of lawn and say which zone it belongs to. So residents report
"the sprinkler by the mailboxes," which is not something a contractor can
act on.

This site is the shared map. It shows the watering zones, which
controller runs each one, when each zone waters, the trees and their
condition, and what is currently broken. It also gives residents a way to
report a problem that a contractor can actually use: a zone number.

Alongside that it carries the reference material owners ask for most:
dues and what they cover, insurance, the governing documents, and the
schedule of board meetings.

## What is deliberately not here

This repo is public, so it holds no board records. There are no meeting
agendas or minutes, no vendor names, no contracts, no expense ledger, no
resident names, and no unit numbers. Board records live in a separate
private repository.

Sources are limited to two: facts the property manager already publishes
on its own public page, and communications that were mailed to every
homeowner. Anything sourced from board records stays out.

```
data/association.yaml     # dues, coverage, insurance, fees, documents
data/meetings.yaml        # date, type, status. Nothing else
data/governance.yaml      # entity status and board roles, no names
data/policies.yaml        # adopted policies and resident notices
data/budget.yaml          # the adopted annual budget, which is published
data/irrigation/          # controllers, zones, schedule, assets, issues
data/trees.yaml           # common-area tree inventory
public/map/base.svg       # base map artwork, exported from Figma
public/documents/         # hosted copies of the governing documents
```

The site is Astro with no UI framework and no database. `src/lib/data.ts`
reads the YAML at build time and every page is static HTML. There is no
write path: the map is updated by editing YAML and committing it, so git
history is the audit trail.

## Development

```sh
npm install
npm run dev      # local dev server
npm run build    # static build to ./dist/
```

Deployed via GitHub Actions to GitHub Pages on every push to `main`.
