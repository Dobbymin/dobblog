# 작업 오류 기록

## 2026-08-06 — 헤더 variant CSS의 font override 누락

### 발생한 오류

- 공통 `.wordmark`에 `Fira Code`를 적용했지만 홈·아티클·About 헤더에서는 기존 variant 선택자가 `Pretendard`를 다시 적용했다.

### 원인

- 공통 스타일만 수정하고 더 높은 specificity를 가진 `.home-site-header .wordmark`, `.article-site-header .wordmark`, `.about-site-header .wordmark` override를 함께 점검하지 않았다.

### 수정 및 반복 방지 규칙

1. 공통 컴포넌트 스타일 변경 시 variant·responsive override를 함께 검색한다.
2. CSS font 변경 후 실제 적용 대상 선택자와 specificity를 확인한다.

## 2026-08-06 — Fira Code의 `next/font/local` 파서 호환성

### 발생한 오류

- `public/fonts/FiraCode-VariableFont_wght.woff2`를 `next/font/local`로 등록한 production build가 `unexpected data version`으로 실패했다.

### 원인

- local font 파일이 존재하고 시스템 font scanner가 읽을 수 있다는 점만 확인하고, Next.js font loader의 파서 호환성을 확인하지 않았다.

### 수정 및 반복 방지 규칙

1. 새 local font는 적용 직후 production build로 `next/font/local` 파싱을 확인한다.
2. loader가 특정 WOFF2를 처리하지 못하면 public asset의 `@font-face` 선언으로 범위를 제한해 적용하고, Next.js font loader 등록은 제거한다.

## 2026-08-06 — 도구 결과 구조 추정

### 발생한 오류

- 웹 검색 도구 결과를 `content` 배열로 가정해 읽으려다 `TypeError: Cannot read properties of undefined (reading 'map')`가 발생했다.

### 원인

- 도구별 반환 형식을 확인하지 않고 공통 결과 구조를 추정했다.

### 수정 및 반복 방지 규칙

1. 새 도구 결과는 먼저 반환 객체의 실제 필드를 확인한 뒤 후속 처리를 작성한다.
2. 도구 호출을 전달하는 래퍼에서는 누락 가능한 필드에 안전한 fallback을 둔다.

## 2026-08-06 — GitHub Pages deployment queue timeout

### 발생한 오류

- 커밋 `8496f0a`의 test, lint, build, artifact 업로드는 성공했지만 `actions/deploy-pages@v5`가 `deployment_queued` 상태에서 10분간 진행되지 않아 실패했다.
- deploy action이 기본 제한인 600,000ms에 도달해 Pages deployment를 취소했다.
- 실패한 deploy job만 재실행했지만 같은 `pages_build_version`과 artifact를 재사용해 기존 canceled deployment가 반환됐고, 12초 만에 `Deployment cancelled.`로 다시 실패했다.

### 원인

- workflow나 정적 산출물 오류가 아니라 GitHub Pages backend가 생성된 deployment를 처리하지 못한 외부 queue 지연이었다.
- GitHub Status의 Actions와 Pages는 operational이었으므로 전체 서비스 장애 신호는 없었다.
- canceled Pages deployment를 같은 commit SHA로 재시도하면 새 deployment가 생성될 것이라고 잘못 판단했다.

### 수정 및 반복 방지 규칙

1. build와 deploy 실패를 구분하고 첫 `deployment_queued` timeout에서는 workflow 제한 시간을 늘리거나 Pages 설정을 재생성하지 않는다.
2. canceled Pages deployment는 실패 job 재실행 전에 commit SHA와 Pages build version 재사용 여부를 확인한다.
3. 같은 build version이 즉시 `Deployment cancelled.`를 반환하면 새 commit SHA로 전체 workflow와 artifact를 다시 생성한다.
4. 성공 후 공개 asset과 실제 스크롤 UI를 다시 검증한다.

## 2026-08-06 — 아티클 스크롤 헤더의 투명 배경

### 발생한 오류

- 게시물 상세 페이지에서 스크롤할 때 본문 글자가 고정 헤더 뒤로 그대로 비쳤다.
- `.article-site-header`가 공통 헤더의 불투명 배경을 `transparent`로 덮었고, `useHeader`도 article 변형을 스크롤 감지 대상에서 제외했다.

### 원인

- 아티클 상단의 하늘색 배경 위에서 헤더가 자연스럽게 보이는 초기 상태만 확인했다.
- 본문이 헤더 아래를 통과하는 스크롤 상태와 라이트·다크 배경 전환을 검증하지 않았다.

### 수정 및 반복 방지 규칙

1. sticky 또는 fixed 헤더는 상단·전환 경계·본문 중간 스크롤 상태를 각각 확인한다.
2. 아티클 헤더는 히어로 영역에서 불투명한 하늘색 배경을 사용하고, 본문이 헤더에 닿으면 테마 배경으로 전환한다.
3. 헤더 variant를 추가하거나 분기할 때 스크롤 hook과 대응 CSS 선택자를 함께 점검한다.
4. 라이트·다크 테마 모두에서 헤더 아래 본문이 비치지 않는지 브라우저로 검증한다.

## 2026-08-06 — GitHub Pages 배포 API 경로 추정

### 발생한 오류

- Pages 배포 상태를 확인하면서 존재 여부를 확인하지 않은 `/repos/{owner}/{repo}/pages/deployments` 엔드포인트를 호출해 404가 발생했다.
- 실행 중인 Actions job의 원인을 확인하려고 job logs 엔드포인트를 호출했지만, 완료 전에는 로그 archive가 제공되지 않아 404가 발생했다.

### 원인

- GitHub Pages 설정 API와 Deployments API를 하나의 Pages 전용 경로로 제공할 것이라고 추정했다.
- 공식 REST API 경로를 확인하기 전에 추정한 엔드포인트를 호출했다.

### 수정 및 반복 방지 규칙

1. Pages 설정은 `/pages`, 배포 실행 상태는 표준 `/deployments`와 `/deployments/{id}/statuses`에서 확인한다.
2. 처음 사용하는 GitHub REST API는 공식 문서나 `gh api --verbose`로 지원 경로를 확인한 뒤 호출한다.
3. 404가 발생하면 권한 문제로 단정하지 않고 경로·리소스 존재 여부·인증 범위를 순서대로 분리해 확인한다.
4. Actions job logs archive는 job 완료 후 조회하고, 실행 중에는 run/job 상태와 deployment status를 사용한다.

## 2026-08-06 — GitHub Actions pnpm 버전 중복 지정

### 발생한 오류

- 첫 Pages workflow의 `pnpm/action-setup`에서 `version: 10`과 `package.json`의 `packageManager: pnpm@10.32.1`을 동시에 사용해 배포가 중단됐다.
- 함께 사용한 `actions/checkout@v4`, `pnpm/action-setup@v4`에는 Node.js 20 deprecation 경고가 발생했다.

### 원인

- 기존 원격 workflow와 Next.js 템플릿을 참고하면서 현재 `pnpm/action-setup`의 중복 버전 검증 동작을 확인하지 않았다.
- 각 Action의 최신 release를 조회했지만 검증된 기존 예시를 우선해 구 major를 선택했다.

### 수정 및 반복 방지 규칙

1. `packageManager`가 있는 프로젝트에서는 `pnpm/action-setup`의 `version`을 중복 지정하지 않는다.
2. workflow 작성 시 공식 release와 runner deprecation 경고를 함께 확인한다.
3. Pages workflow는 실제 GitHub-hosted runner에서 한 번 성공할 때까지 배포 완료로 판단하지 않는다.

## 2026-08-06 — 원격 템플릿 파일 경로 추정 조회

### 발생한 오류

- Next.js GitHub Pages 공식 템플릿의 설정 파일명을 `next.config.js`로 추정해 GitHub API 404와 base64 decode 오류가 연속 발생했다.
- 실제 tree API를 다시 조회하면서 query string이 포함된 경로를 quote하지 않아 zsh의 `no matches found` 오류가 발생했다.

### 원인

- 원격 저장소의 실제 파일 트리를 먼저 확인하지 않고 일반적인 파일명을 사용했다.
- 첫 API 호출 성공 여부와 무관하게 decode 명령을 연결했다.

### 수정 및 반복 방지 규칙

1. 원격 파일을 읽기 전에 contents 또는 tree API로 실제 경로를 확인한다.
2. API 응답을 pipe로 후처리할 때 앞 단계 실패가 뒤 단계의 추가 오류로 이어지지 않도록 명령을 분리한다.
3. `?`, `&` 등 shell glob·제어 문자가 포함된 API 경로는 항상 quote한다.

## 2026-08-06 — Static export 런타임 검증의 잘못된 200 판정

### 발생한 오류

- Python 정적 서버에서 `/articles/design-system/` 응답이 200이라는 사실만 보고 상세 페이지가 정상 제공된다고 판단했다.
- 실제 산출물은 `out/articles/design-system.html`이며, trailing slash URL은 정적 서버의 디렉터리 목록을 반환할 수 있다.

### 원인

- HTTP 상태만 확인하고 응답 본문에 페이지 제목·본문·Next.js asset이 포함됐는지 확인하지 않았다.
- GitHub Pages의 extensionless URL 처리와 로컬 Python 서버의 디렉터리 처리 차이를 구분하지 않았다.

### 수정 및 반복 방지 규칙

1. 정적 사이트 검증은 상태 코드와 페이지 고유 콘텐츠를 함께 확인한다.
2. `out` 파일 구조를 먼저 확인하고 `/path`, `/path/`, `/path.html` 중 실제 배포 URL을 검증한다.
3. GitHub Pages 배포 후 공개 URL에서 홈·하위 경로·asset을 다시 확인한다.

## 2026-08-06 — 하네스 명령의 RTK prefix 누락

### 발생한 오류

- `out` 디렉터리 확인 명령을 연결하면서 shell builtin `echo`에 필수 `rtk` prefix를 적용하지 않았다.

### 원인

- 출력 확인용 보조 명령도 하네스 규칙 적용 대상이라는 점을 명령 작성 단계에서 놓쳤다.

### 수정 및 반복 방지 규칙

1. 실행 명령뿐 아니라 파이프·조건문에 연결하는 보조 명령도 각각 `rtk`를 거친다.
2. 단순 상태 확인은 불필요한 `echo`를 붙이지 않고 원래 명령의 종료 코드와 출력으로 판단한다.

## 2026-08-06 — Static export 프로젝트에 `next start` 사용

### 발생한 오류

- 별도 포트에서 `next start`를 다시 실행했지만 `output: 'export'` 설정에서는 지원되지 않아 실패했다.

### 원인

- 하네스 점검에서 scripts와 Next.js 문서는 확인했지만 `next.config.ts`의 배포 방식을 확인하지 않았다.

### 수정 및 반복 방지 규칙

1. Next.js 런타임 검증 전 `next.config.*`의 `output`, `basePath`, `assetPrefix`를 확인한다.
2. `output: 'export'` 프로젝트는 `next build` 후 `out` 디렉터리를 정적 HTTP 서버로 검증한다.
3. package script 이름만 보고 실행 방식을 결정하지 않는다.

## 2026-08-06 — 런타임 검증 포트 충돌

### 발생한 오류

- production 서버 검증을 기본 포트 3000으로 시작해 `EADDRINUSE`가 발생했다.

### 원인

- 기존 개발 서버가 3000번 포트를 사용할 수 있다는 하네스 상태를 확인하지 않았다.

### 수정 및 반복 방지 규칙

1. 로컬 서버를 추가로 시작하기 전에 사용할 포트를 확인한다.
2. 기존 프로세스를 임의로 종료하지 않는다.
3. 포트가 사용 중이면 검증 서버에 별도 포트를 명시한다.

## 2026-08-06 — Node 네이티브 TypeScript 테스트와 tsconfig 불일치

### 발생한 오류

- 검색 유틸 테스트 자체는 통과했지만 `tsc --noEmit`에서 `TS5097`이 발생했다.
- Node가 TypeScript 모듈을 직접 찾도록 테스트에서 `./search-posts.ts`를 import했으나, 프로젝트의 `tsconfig.json`은 `.ts` 확장자 import를 허용하지 않는다.

### 원인

- 테스트 실행 방식과 TypeScript 컴파일 설정의 호환성을 먼저 확인하지 않고 `.ts` 테스트 파일을 추가했다.
- 작은 검증 하나를 위해 프로젝트 전체 모듈 해석 설정을 바꿀 필요가 있는지 사전에 비교하지 않았다.

### 수정 및 반복 방지 규칙

1. Node 네이티브 TypeScript 실행을 도입하기 전에 `tsc --noEmit`과 Node 실행을 모두 시험한다.
2. 단일 유틸 검증을 위해 `allowImportingTsExtensions`나 package module type 같은 프로젝트 전역 설정을 추가하지 않는다.
3. 현재 하네스에서는 Node가 직접 실행할 최소 `.mjs` 테스트에서 TypeScript 구현을 import하고, 전체 소스 타입 안정성은 별도 `tsc --noEmit`으로 검증한다.
4. 새 검증 명령은 test, typecheck, lint 순서 전체를 연속 실행해 서로 다른 도구의 설정 충돌까지 확인한다.

## 2026-08-06 — 카테고리 다크 테마 및 헤더 요구사항 오해

### 발생한 오류

- 사용자는 카테고리 영역의 다크 테마 수정을 요청했지만, 라이트 테마를 포함한 카테고리 UI 전체를 임의로 변경했다.
- 원본 사이트와 비교해야 하는 작업에서 일부 CSS 값만 확인하고, 최종 라이트·다크 화면을 모두 대조하지 않았다.
- 메인 페이지와 상세 페이지의 헤더를 동일하게 유지해야 한다는 요구사항의 범위를 확인하지 않고 서로 다른 타이포그래피와 위치 규칙을 유지했다.
- 요구사항이 애매하면 질문하라는 명시적 지침이 있었지만, 추측으로 구현을 진행했다.

### 원인

- “다크 테마 수정”을 “컴포넌트 전체 재설계”로 잘못 확대 해석했다.
- 원본 사이트의 측정값보다 기존 구현을 정리하려는 판단을 우선했다.
- “동일한 헤더”가 타이포그래피·아이콘·위치·스크롤 이벤트 중 어디까지 포함하는지 확인하지 않았다.

### 반복 방지 규칙

1. 테마 수정 요청은 요청된 테마 선택자 안에서만 수정한다. 공통 스타일 변경이 필요하면 먼저 사용자에게 범위를 확인한다.
2. “원본과 동일” 요청은 원본 사이트를 직접 조작하고 라이트·다크, 메인·상세, 데스크톱·모바일 상태를 각각 측정한다.
3. 기존 요청과 새 요청이 충돌하거나 “동일하게”, “이 부분”처럼 범위가 여러 의미를 가질 수 있으면 코드를 수정하기 전에 질문한다.
4. 사용자가 질문을 요구한 경우 합리적 추정으로 대체하지 않는다.
5. 수정 전 변경 대상과 변경하지 않을 대상을 명시하고, 수정 후 두 범위를 모두 검증한다.
6. 원본에 없는 시각 효과, hover 효과, 배경, 테두리, 이동 애니메이션을 임의로 추가하지 않는다.

### 이번 수정의 고정 범위

- 카테고리 제목은 `Category`로 변경한다.
- 카테고리 영역은 원본 사이트의 라이트·다크 스타일을 각각 따른다.
- 화면 전체와 구름 UI에는 페이지 전환 애니메이션을 적용하지 않는다.
- 헤더 변경 범위는 사용자 확인 후 확정한다.

## 2026-08-06 — 검색 기능 삭제 범위 및 About 테마 오류

### 발생한 오류

- 사용자가 독립된 검색 페이지를 제거해 달라고 했지만, 페이지와 별개인 헤더 검색 버튼·검색 오버레이·검색 상태까지 함께 삭제했다.
- About 히어로와 헤더에 다크 색상을 직접 입력해 라이트 테마에서도 다크 화면만 나타나게 했다.

### 원인

- 삭제 전 실제 라우트와 공통 인터랙션을 분리해 확인하지 않고 “검색 페이지”의 범위를 임의로 확대했다.
- 테마에 따라 달라져야 하는 색상을 CSS 변수로 정의하지 않고 컴포넌트와 공통 CSS에 고정값으로 작성했다.

### 반복 방지 규칙

1. 페이지 삭제 요청은 먼저 실제 라우트 파일과 해당 라우트의 참조만 확인한다. 모달·오버레이·헤더 액션처럼 라우트가 아닌 기능은 별도 요구가 없으면 유지한다.
2. 삭제 대상 이름이 기존 기능 이름과 겹치면 실제 파일 목록과 사용자 진입 흐름을 확인해 범위를 구분한다.
3. 테마 대응 영역에는 라이트·다크 CSS 변수를 사용하며, 공통 선택자에 한 테마의 색상을 하드코딩하지 않는다.
4. 테마 수정 후 라이트·다크 양쪽에서 배경색·문자색·주요 액션의 가시성을 직접 검증한다.

### 이번 수정의 고정 범위

- `/search` 페이지는 만들지 않는다.
- 헤더 검색 버튼과 기존 상단 검색 오버레이만 복원한다.
- About의 콘텐츠와 배치는 유지하고 색상만 라이트·다크 테마에 맞게 분리한다.

## 2026-08-06 — 헤더 SVG 정적 자산 경로 불일치

### 발생한 오류

- 헤더 CSS는 `/images/dobbymin3-_2_.svg`를 참조했지만, 저장된 정적 자산 파일명은 `public/images/logo.svg`였다.

### 원인

- 자산을 추가한 뒤 실제 대상 파일명을 다시 확인하지 않고 CSS 참조 경로를 고정했다.

### 수정 및 반복 방지 규칙

1. `public` 자산을 추가·이동한 뒤 CSS와 JSX의 URL이 실제 파일명과 일치하는지 `find` 또는 `ls`로 검증한다.
2. static asset 변경은 production build 이전에 직접 URL 참조와 파일 존재 여부를 함께 점검한다.

## 2026-08-06 — RTK `test` 명령 충돌

### 발생한 오류

- `rtk test -f out/images/logo.svg`가 셸의 `test` builtin이 아닌 RTK 명령으로 해석되어 파일 존재 검증 대신 도움말을 출력했다.

### 원인

- RTK가 같은 이름의 내장 명령을 가질 수 있음을 확인하지 않고 셸 builtin 호출을 그대로 감쌌다.

### 수정 및 반복 방지 규칙

1. RTK와 이름이 겹칠 수 있는 셸 builtin은 `rtk proxy`를 통해 실행한다.
2. 검증 명령은 종료 코드와 기대 출력 모두 확인한다.

## 2026-08-06 — MDX에 GFM/하이라이팅 플러그인 미연결

### 발생한 오류

- `src/content/articles/*.mdx`의 표(`| a | b |`)와 취소선(`~~text~~`)이 렌더되지 않고 원문 그대로 출력됐다. 코드펜스에 언어를 지정해도 토큰 하이라이팅이 없었다.

### 원인

- `next.config.ts`의 `createMDX({ extension: /\.mdx$/ })`에 `options.remarkPlugins` / `options.rehypePlugins`가 비어 있었다. `@next/mdx`는 CommonMark만 처리하며 GFM(표·취소선·autolink·footnote)은 `remark-gfm` 없이는 파싱되지 않는다. 기본 설정으로 마크다운 전체가 지원된다고 가정한 것이 오류였다.

### 수정 및 반복 방지 규칙

1. `remark-gfm` + `rehype-prism-plus`를 `createMDX` options에 연결했다.
2. **Turbopack에서는 플러그인을 함수로 import해 넘길 수 없다.** JS 함수는 Rust로 전달되지 않으므로 반드시 문자열 이름(`'remark-gfm'`, `['rehype-prism-plus', { ignoreMissing: true }]`)으로 지정한다.
3. `ignoreMissing: true`로 Prism 미지원 언어명이 빌드를 깨뜨리지 않게 한다. 단 언어명은 소문자여야 하이라이팅이 적용된다(`typeScript` → `typescript`).
4. MDX 파서 설정 변경 후에는 빌드 산출물에서 `grep -c '<table' out/articles/*.html`처럼 **결과 HTML로** 검증한다. dev 서버 렌더만 보고 통과 판정하지 않는다.

## 2026-08-06 — About JSX 교체 후 이전 꼬리 잔존

### 발생한 오류

- About 프로젝트 영역을 새 카드 구조로 교체한 뒤, 기존 활동 타임라인 JSX의 끝부분이 파일에 남아 컴포넌트가 중복·불완전한 구조가 됐다.

### 원인

- 부분 패치 적용 후 파일 전체를 확인하지 않아, 교체 범위 밖에 남은 JSX를 놓쳤다.

### 수정 및 반복 방지 규칙

1. JSX의 큰 블록을 교체한 뒤에는 해당 컴포넌트 전체와 파일 끝을 확인한다.
2. 타입 검사 또는 린트 전에 잔존한 이전 식별자와 중복 `return`/닫는 태그를 검색한다.

## 2026-08-06 — About 프로젝트 배열의 선택 필드 추론 오류

### 발생한 오류

- `projects.map()`에서 `award`와 `period`를 읽을 때 TypeScript가 `TS2339`를 보고했다.

### 원인

- `as const` 배열의 일부 항목에만 선택 필드를 선언해, TypeScript가 해당 속성이 없는 객체를 포함한 좁은 union으로 추론했다.

### 수정 및 반복 방지 규칙

1. 같은 렌더링 경로에서 선택 필드를 읽는 데이터 배열은 공통 타입에 `?:`로 계약을 먼저 선언한다.
2. JSX 반복 렌더링 전 `pnpm build`로 union 추론까지 포함한 타입 검사를 실행한다.

## 2026-08-06 — 원본 About 화면 대조 결과 미반영

### 발생한 오류

- 원본 About 페이지를 직접 확인해 최하단 구름이 흰색인 것을 봤지만, 구현에서는 다크 색으로 남겼다.

### 원인

- 원본 화면의 레이어별 색을 구현 항목으로 분해하지 않고, 다크 분위기라는 넓은 인상만 반영했다.

### 수정 및 반복 방지 규칙

1. 참고 페이지를 사용한 UI 작업은 화면을 직접 확인한 뒤, 배경·각 레이어·테두리·모서리·텍스트 색을 체크리스트로 기록하고 모두 반영했는지 대조한다.
2. 시각적 참조의 구체 요소를 확인했으면 추정으로 대체하지 않는다. 불명확한 요소만 사용자에게 질문한다.
3. 구현 뒤 같은 영역을 다시 캡처해 원본과 나란히 확인한 후 완료로 보고한다.

## 2026-08-07 — TanStack 공통 로고를 Query 로고로 사용

### 발생한 오류

- TanStack Query 기술 태그에 TanStack 공통 브랜드 아이콘을 넣어 Query 전용 로고와 달랐다.

### 원인

- 제품명과 공통 브랜드명을 구분하지 않고 CDN의 첫 검색 결과를 사용했다.

### 수정 및 반복 방지 규칙

1. 제품별 기술 로고는 해당 제품의 공식 저장소 또는 브랜드 가이드에서 전용 자산을 확인해 사용한다.
2. 유사한 공통 브랜드와 제품 로고가 있을 때는 자산의 제목·파일 경로·시각 결과를 모두 대조한다.

## 2026-08-07 — Pages 배포 큐 지연의 원인 확인 전 타임아웃 확장

### 발생한 오류

- Pages 배포가 `deployment_queued` 상태에서 10분 후 실패한 로그를 확인하고, 큐 지연의 원인을 조사하기 전에 `actions/deploy-pages`의 대기 제한을 30분으로 늘렸다.
- 변경 후 수동 배포를 시작해, 근본 원인 확인 전 더 긴 대기와 불필요한 배포를 발생시켰다.

### 원인

- 타임아웃은 증상을 연장하는 우회책인데도, Pages 환경의 배포 대기열·동시성 설정·환경 보호 규칙·GitHub 서비스 상태를 먼저 분리해 확인하지 않았다.
- 이후 확인에서 GitHub 상태 페이지가 `Incident with Pages - Deployment Lag`를 공지했다. 저장소 빌드·권한·환경 보호 규칙이 아니라 GitHub Pages 서비스의 배포 대기열 장애가 직접 원인이었다.

### 수정 및 반복 방지 규칙

1. CI/CD 대기·타임아웃 오류는 제한값을 바꾸기 전에 대기열, workflow concurrency, environment protection, 서비스 상태를 먼저 확인한다.
2. 외부 배포를 수동 실행하기 전에는 실행이 실제로 필요한지와 배포 대상 브랜치를 확인한다.
3. 원인이 확인되지 않은 상태에서는 타임아웃 확장·재시도 같은 우회 변경을 커밋·푸시하지 않는다.
4. GitHub Pages 장애가 활성 상태면 설정 변경이나 재배포 대신 상태 페이지의 복구 공지를 기다린다.
