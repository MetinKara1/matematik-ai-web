# Public AI access and content representations

`npm run build` runs Next.js and then exports Markdown from its current prerendered public HTML. Only canonical, indexable public pages are exported. Scripts, navigation, SVG and interactive buttons are omitted; text, headings, links and TeX annotations remain. The pipeline does not add a review date or an author. Existing dates and bylines are retained.

Generated `public/ai-markdown/`, `public/llms.txt` and `public/llms-full.txt` are ignored by Git. They must be copied with public assets on deploy. Do not skip the post-build export. Default HTML remains unchanged. An explicit acceptable `text/markdown` request receives the corresponding document through the public proxy. Invalid/absent Accept preferences keep HTML. Representations vary on Accept and public Markdown uses a one-hour shared cache. Private APIs, admin pages and private solutions are excluded.

VPS uses the generated public files; Cloudflare sites use their ASSETS binding, with filesystem fallback for local Next previews. A missing document falls back to the real HTML rather than exporting private sources or inventing content. Robots rules preserve private exclusions and explicitly allow the currently open public policy for search/assistant/training bots. This is not authentication or proof of access from actual bot IPs.

Run `npm run test:ai`, build, and validate production responses for text/markdown, text/html, q=0, Vary, cache, canonical, schemas, social images and robots. Root-level llms documents and the generated internal Markdown paths are not new editorial pages; canonical links point to public HTML pages.
