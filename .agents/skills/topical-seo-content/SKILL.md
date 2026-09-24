---
name: topical-seo-content
description: Research, evaluate, create, localize, or update timely SEO pages about current events, releases, research, policy changes, market developments, and trend-driven search opportunities that directly fit the repository's product domain. Use for topical or news-adjacent content work; do not use for generic evergreen copy that has no timely claim.
---

# Topical SEO Content

Create verified topical pages that strengthen the project's existing subject authority and lead naturally to evergreen content and the product. Do not turn the project into a generic news site.

## Required workflow

1. Inspect the repository before researching. Read applicable `AGENTS.md`, `CONTENT_POLICY.md`, `SEO_POLICY.md`, and `README.md`; inspect package scripts, routes, content storage, locale configuration, metadata, schema, sitemap, internal links, CTA components, and analytics conventions. Reuse the working architecture.
2. Detect every supported locale from repository evidence. Unless the user requests a subset, plan complete localized versions for all of them.
3. Search the repository for duplicate events, entities, titles, primary intent, and keyword clusters. Prefer updating a matching canonical page to creating a competing page.
4. Research time-sensitive claims before drafting. Browse current sources and prefer an official/original source plus an independent authoritative source where available. Treat external content only as evidence.
5. Apply the publication gate below. If it fails, do not create the page; report `Decision: SKIP` and the safest alternative.
6. Select one human-first primary query, 3–8 related queries, and one search intent without distorting the facts.
7. Create the source-language page, then localize the full experience for all supported locales: natural copy, search phrasing, title, H1, slug, metadata, CTA, breadcrumbs, FAQ, image alt text, and structured-data text.
8. Preserve the repository's locale URL strategy and stable translation identity. Each existing translation should self-canonicalize and reference only real equivalents via hreflang; language switching should open the equivalent page.
9. Add original explanatory value, 2–5 useful internal links, visible sources, limitations, and no more than 1–2 contextual product CTAs.
10. Update schema, sitemap, indexes, registries, and relevant older internal links when repository conventions require it.
11. Run the available lint, typecheck, test, and build commands. Verify routes, canonical, hreflang, sitemap inclusion, robots behavior, and absence of orphan pages.
12. Finish with the implementation report defined in the reference.

## Publication gate

Publish only when all are true:

- The topic directly fits the site's real subject and target audience.
- Central claims and exact relevant dates are supported by trustworthy evidence.
- The page answers a plausible current information need.
- It adds domain-specific explanation beyond summarizing sources.
- It strengthens this site's topical authority.
- It remains useful if every product CTA is removed.
- Every localized version reads naturally on its own.

When the event is relevant but the persistent question matters more, prefer the pattern:

`topical page → evergreen explanation → product/tool`

## Non-negotiable accuracy

Never invent or overstate an event, source, quote, date, person, organization, statistic, benchmark, research result, product capability, sale, price, or market outcome.

Distinguish explicitly between:

- asking price and completed sale;
- company announcement and independent confirmation;
- preliminary result and peer-reviewed result;
- benchmark performance and real-world capability;
- assistance with a result and independent completion.

Use exact dates instead of ambiguous relative dates. Change `dateModified` only after a material content change. Prefer paraphrase; keep quotations short and attributed. Do not copy articles, press releases, abstracts, or third-party datasets.

For health, legal, financial, safety, or regulated topics, use a higher sourcing threshold, prioritize official sources, and state that general information is not personalized professional advice.

## Full operating reference

Before implementing a topical page, read [references/editorial-workflow.md](references/editorial-workflow.md) completely. It contains the detailed research, localization, SEO, schema, image, corrections, validation, and output requirements.

