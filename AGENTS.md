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
