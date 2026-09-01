# Integration boundaries

## Local validation

```bash
bunx clotho validate animation.json --strict
```

In code, parse with `animationDocumentSchema` or `parseDocument`, then run `validateDocument` for reference, tree, connector, asset, and timeline findings. Use `renderDocumentToSvg` at representative times for headless review.

## Editor

Open the document in Clotho Editor for visual editing. A host supplies an `AnimationRepository` with `list`, `load`, `create`, `save`, and `delete`, plus an optional `resolveImage(file)` hook. The editor is not the schema authority; save only documents accepted by Clotho.

## MCP or revisioned storage

Before updating, fetch the full document and current revision. Merge locally, validate the complete v1 document, then submit the changed top-level fields and returned revision. Treat `elements`, `chapters`, `effects`, and assets as replacement collections unless the API explicitly documents item patches.

Never change `id` or `clothoVersion` through a partial update. A stale revision requires another read and a new merge. Use a unique stable idempotency key for one logical create or update attempt; do not reuse it for different content.

Publication state such as draft/published belongs to the host record, not inside a Clotho document.

## Legacy documents

Documents with `version: 3` or `version: 4` require `migrateLegacyDocument` or the CLI migrate command. Review migration notes, validate the v1 result, and compare representative frames before replacing stored data.
