# Canyon Breeze Manor HOA

A board tracker for Canyon Breeze Manor, built by Brady Redfearn to organize meetings, contracts, expenses, budget, and governance for the HOA he serves as president. Same shape as sibling projects [garage-log](https://github.com/redfearn-group/garage-log) and [home-log](https://github.com/redfearn-group/home-log): a static site with version-controlled data instead of a database.

**Live:** [redfearn-group.github.io/canyon-breeze-manor-hoa](https://redfearn-group.github.io/canyon-breeze-manor-hoa/)

## What it does

Tracks everything a board needs to stay organized between meetings: an agenda and status for every board and annual meeting, service contracts with renewal dates, logged expenses, the adopted budget by category, and the association's governance state, including officers, open compliance items, and phased CC&Rs enforcement policies.

## Public and private data are split by design

This is internal HOA business, not just Brady's own property, so the split is stricter than garage-log or home-log's. `data/*.yaml` holds only non-identifying metadata: dates, statuses, category names, agenda topics. `data/private/*.yaml` is gitignored and never committed; it holds resident names, unit numbers, dollar figures, vendor names and contact info, and meeting minutes. Every field that could name a specific resident, unit, dollar figure, or vendor rate goes there by default.

```
data/meetings.yaml          # public: date/type/status/agenda per meeting
data/contracts.yaml         # public: category/status/renewal date
data/expenses.yaml          # public: category/status only
data/budget.yaml            # public: category names only
data/governance.yaml        # public: entity status, officers, compliance items
data/policies.yaml          # public: phased enforcement policies and resident notices
data/tasks.yaml             # public: open board to-dos
data/private/               # gitignored: names, units, dollar figures, vendor terms, minutes
```

The site is pure Astro with no UI framework and no database driver. `src/lib/data.ts` reads the public YAML at build time and every page is static HTML; the private files are never read by the build at all.

```
src/
  pages/            # dashboard, meetings, contracts, expenses, budget, governance
  layouts/          # page shell
  lib/              # data loading, status-tag mapping, types
  styles/           # design tokens + shared CSS
```

Deployed via GitHub Actions to GitHub Pages on every push to `main`.

## Development

```sh
npm install
npm run dev      # local dev server at localhost:4325
npm run build    # static build to ./dist/
```

## Data status

Meetings, contracts, expenses, budget, and governance reflect real board history sourced from meeting minutes, board correspondence, and financial reports. The private counterparts to each public file hold the resident-specific and financial detail that stays out of the public repo.
