@RTK.md

<!-- BEGIN RTK CODEX WORKFLOW -->
## Terminal output
Read `RTK.md` for the RTK integration. Prefer RTK for supported shell commands
(e.g. `rtk git status`, `rtk git diff`, `rtk npm run build`). The project hook
rewrites supported commands automatically only after Codex trusts it. If it is
not active, use the explicit `rtk` prefix; do not assume automatic interception.
Use `rtk proxy <command>` or the original command when exact, unfiltered output
is needed for correctness. If RTK is unavailable, run the original command.
Check the process exit code, not just the condensed summary: RTK 0.51 can
report zero errors even for a failed Next.js invocation. Use `rtk npm run build`
for the project build; `rtk next` already invokes build, so do not append `build`.
<!-- END RTK CODEX WORKFLOW -->

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
