# Clotho Docs

[Clotho](https://github.com/shinkeonkim/clotho)와 [Clotho Editor](https://github.com/shinkeonkim/clotho-editor)의 사용자 문서입니다.

```bash
bun install --frozen-lockfile
bun run dev
bun run build
```

문서의 실행 예제는 npm에 공개된 `@kokoa/clotho`를 직접 사용합니다. library 내부 설계와 schema 결정 기록은 Clotho 저장소의 `docs`에서 관리합니다.

## Cloudflare Workers 배포

Astro가 만든 정적 파일은 Cloudflare Workers Static Assets로 배포합니다.

```bash
bun run dev:cloudflare
bun run deploy:cloudflare
```

Cloudflare Dashboard에서 GitHub 저장소를 연결할 때는 다음 명령을 사용합니다.

- Build command: `bun run build`
- Deploy command: `npx wrangler deploy`

Worker 이름은 `clotho-docs`이며 배포 대상은 `dist`입니다. Astro는 정적 사이트이므로 존재하지 않는 경로는 `404.html`과 HTTP 404로 응답하고, HTML 경로는 directory index에 맞춰 trailing slash를 자동 처리합니다.

custom domain은 설정 파일에 넣지 않습니다. Dashboard의 Worker 설정에서 `clotho-docs.shinkeonkim.com`을 Custom Domain으로 연결해주세요. Dashboard에서 관리하는 domain 설정이 이후 CLI 배포에 의해 덮어써지지 않도록 `routes`도 선언하지 않습니다.
