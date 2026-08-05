---
name: blog-clone-build
description: joshwcomeau.com 스타일 개발 블로그(dobby-blog)를 구축하는 오케스트레이터. 원본 디자인 실측 → codex 위임 구현 → 빌드 검증을 팀으로 조율한다. "블로그 만들어", "구름 헤더", "랜딩 구현", "글 목록/글 상세 페이지", "joshwcomeau처럼", "디자인 적용", "이 부분 다시 만들어", "블로그 수정", "재실행", "업데이트", "보완", "색상 바꿔", "레이아웃 고쳐" 같은 요청이면 반드시 이 스킬을 사용하라. 단순 질문이나 파일 한 줄 수정은 직접 처리해도 된다.
---

# dobby-blog 구축 오케스트레이터

## 프로젝트 고정 사실

| 항목 | 값 |
|------|-----|
| 스택 | Next.js 16.3 App Router / React 19 / TypeScript |
| 스타일 | Tailwind CSS v4 (`@theme inline`, config 파일 없음) + shadcn |
| 콘텐츠 | 로컬 MDX (`@next/mdx` 설치됨) |
| 배포 | `output: 'export'` 정적 export → GitHub Pages |
| 패키지 매니저 | pnpm |
| 클론 범위 | 랜딩 + 글 목록 + 글 상세 |

**구현은 전부 codex에게 위임한다.** Claude(메인 및 모든 에이전트)는 `src/` 아래 앱 코드를 직접 쓰지 않는다. 유일한 예외는 `_workspace/` 산출물이다.

## 실행 모드

**에이전트 팀** (4명). 팀원이 서로 스펙을 질의하고 결함을 되던지는 왕복이 잦아 서브 에이전트 반환값만으로는 조율이 안 된다.

| 에이전트 | 역할 |
|---------|------|
| `design-researcher` | 원본 실측 → 디자인 스펙 문서 |
| `codex-dispatcher` | 지시서 작성 → `codex exec` → 결과 검수 |
| `build-verifier` | 빌드·타입·경계면 검증 → 결함 리포트 |
| `design-qa` | 원본 대비 픽셀·수치 대조 → 시각 차이 리포트 |

`build-verifier`와 `design-qa`는 다른 것을 본다. 전자는 "코드가 돌아가는가", 후자는 "보이는 것이 원본과 같은가"다. 빌드가 통과해도 색은 틀릴 수 있고 컴파일러는 그걸 잡아주지 않는다.

모든 Agent 호출에 `model: "opus"`를 명시한다.

**에이전트 정의를 방금 만들었거나 고쳤다면** `subagent_type`으로 못 부른다 — 에이전트 레지스트리는 세션 시작 시 로드되므로 `Agent type not found` 에러가 난다. 세션을 재시작하거나, `subagent_type: "general-purpose"`로 스폰하면서 프롬프트 첫 줄에 "`.claude/agents/{name}.md`를 먼저 읽고 그 역할대로 행동하라"를 넣는다. 후자는 정의 파일이 단일 진실 원천으로 남으므로 품질 차이가 없다.

## Phase 0: 컨텍스트 확인

`_workspace/` 상태로 실행 모드를 정한다.

| 상태 | 모드 |
|------|------|
| `_workspace/` 없음 | **초기 실행** — Phase 1부터 |
| 있음 + 부분 수정 요청 | **부분 재실행** — 해당 에이전트만 재호출 |
| 있음 + 새 디자인 방향 요청 | **새 실행** — `_workspace/`를 `_workspace_prev_{N}/`로 옮기고 Phase 1부터 |

부분 재실행 매핑:
- "색이 다르다", "간격이 이상하다" → `design-qa` 대조 → (스펙 자체가 의심되면 `design-researcher` 재측정) → dispatcher 재위임
- "구현이 스펙과 다르다" → `codex-dispatcher`만
- "빌드가 깨진다" → `build-verifier` → dispatcher 재위임
- "원본이랑 안 닮았다" (구체적 지목 없음) → `design-qa` 전면 대조로 차이 목록부터 확보

## Phase 1: 사전 정리

팀 구성 전에 메인이 직접 확인한다.

1. `git status` — 작업 트리가 지저분하면 사용자에게 커밋/스태시 여부를 묻는다. codex diff와 기존 변경이 섞이면 검수가 불가능하다.
2. 알려진 결함 확인: `src/app/layout.tsx`의 `localFont` src가 `../../public/fonts/`인데 실제 디렉토리는 `public/font/`다. 이 불일치를 Phase 3 첫 지시서에 수정 항목으로 포함한다.
3. `_workspace/` 생성.

## Phase 2: 디자인 실측

**담당:** `design-researcher` (단독)

```
Agent(subagent_type: "design-researcher", model: "opus", run_in_background: false)
```

지시: `https://www.joshwcomeau.com/` 랜딩 + 글 목록 + 글 상세 1개를 실측하고 `_workspace/01_design_spec.md`를 작성하라. 라이트/다크 양쪽. 구름 그래픽은 기하 정보까지 분해하라.

**게이트:** 스펙 문서를 사용자에게 요약 제시하고 진행 승인을 받는다. 색상·타이포가 원본과 다르면 이후 모든 구현이 잘못된 기준 위에 쌓인다. 여기서 확인받는 비용이 나중에 재위임하는 비용보다 훨씬 싸다.

## Phase 3: 구현 위임

**담당:** `codex-dispatcher` + `build-verifier` (팀)

구현 단위를 순서대로 처리한다. 단위마다 위임 → 검증 → (실패 시) 재위임을 완결하고 다음으로 넘어간다. 전부 만들고 마지막에 한 번 검증하면 결함 원인 격리가 불가능하다.

| # | 단위 | 산출물 |
|---|------|--------|
| 01 | 디자인 토큰 + 폰트 경로 수정 | `globals.css` `@theme inline`, `layout.tsx` |
| 02 | 구름 헤더 + 섹션 구름 컴포넌트 | `src/components/` |
| 03 | 랜딩 페이지 | `src/app/page.tsx` |
| 04 | MDX 파이프라인 + 글 목록 | `content/posts/`, 목록 라우트 |
| 05 | 글 상세 (MDX 렌더, 코드 하이라이팅, 목차) | 상세 라우트 |

각 단위:
1. dispatcher가 `codex-delegation` 스킬을 읽고 지시서 작성 → `codex exec` → 검수 리포트
2. verifier가 검증 → `_workspace/03_verify_report.md`
3. verifier PASS면 `design-qa`가 원본 대비 시각 대조 → `_workspace/04_visual_diff.md`
   - 순서가 중요하다. 빌드가 깨진 상태에서 dev 서버를 띄워 비교하면 빌드 문제를 시각 결함으로 오분류한다
   - 시각 결과물이 없는 단위(예: 01 토큰 정의)는 이 단계를 건너뛴다
4. FAIL 또는 DIFF면 dispatcher가 재위임 (**최대 2라운드**). 두 리포트의 결함을 하나의 지시서로 합쳐 넘긴다
5. 2라운드 후에도 미해결이면 멈추고 사용자에게 보고한다. 계속 돌리지 않는다

## Phase 4: 사용자 확인

1. `design-qa`가 전체 페이지 기준 최종 대조를 수행한다 (desktop + mobile, 다크모드 구현 시 양쪽)
2. `pnpm dev` 실행하고 URL과 함께 `04_visual_diff.md`의 차이 요약·스크린샷을 제시한다
3. 사용자가 허용 범위로 판단한 차이는 리포트에 `사용자 승인`으로 표시한다 — 다음 라운드에서 다시 결함으로 올리지 않기 위해서다
4. 추가 피드백은 Phase 0의 부분 재실행으로 되돌린다

## 데이터 흐름

```
[메인] Phase 1 사전 정리
   ↓
[design-researcher] → _workspace/01_design_spec.md
   ↓ (사용자 승인 게이트)
[codex-dispatcher] → 02_codex_brief_NN.md → codex exec → 02_codex_review_NN.md
   ↕ (SendMessage: 스펙 질의 / 결함 반송)
[build-verifier] → 03_verify_report.md
   ↓ (PASS일 때만)
[design-qa] → 04_visual_diff.md  ──DIFF──> dispatcher 재위임
   ↓
[메인] pnpm dev → 사용자 확인
```

전달 방식: 산출물은 파일 기반(`_workspace/`), 실시간 질의는 `SendMessage`, 진행 추적은 `TaskCreate`.

`_workspace/`는 지우지 않는다. 위임 이력이 곧 감사 추적이다. `.gitignore`에 추가해 커밋에서만 제외한다.

## 에러 핸들링

| 상황 | 대응 |
|------|------|
| 원본 사이트 접속 불가 | WebFetch 정적 분석으로 폴백, 스펙 문서에 신뢰도 경고 명시, 사용자에게 알림 |
| `codex exec` 실패 | 1회 재시도 → 재실패 시 해당 단위 건너뛰고 보고. **직접 구현으로 우회 금지** |
| 2라운드 후에도 스펙 미충족 | 미해결로 보고. 지시서 자체가 잘못됐을 가능성을 사용자와 검토 |
| codex가 범위 밖 파일 수정 | 되돌리지 말고 사용자에게 보고 후 판단 요청 |
| 빌드 환경 문제 (의존성 등) | `pnpm install` 1회 → 코드 결함과 분리해 보고 |
| dev 서버 기동 실패로 시각 대조 불가 | 빌드 문제로 분류해 `build-verifier`에 넘김. 시각 결함으로 오분류 금지 |
| 라운드를 거듭해도 시각 차이 개수가 안 줄어듦 | 지시 전달이 잘못됐다는 신호. 재위임 대신 사용자에게 지시서를 검토받는다 |

원칙: 실패는 숨기지 않는다. 부분 완성이라도 무엇이 되고 무엇이 안 됐는지 명시한다.

## 테스트 시나리오

**정상 흐름**
"블로그 랜딩 만들어줘" → Phase 0 초기 실행 판정 → git 정리 확인 → researcher가 실측 → 사용자 승인 → dispatcher가 단위 01~03 위임 → verifier PASS → `pnpm dev` 안내

**에러 흐름**
"구름 색이 원본이랑 달라" → Phase 0 부분 재실행 → `design-qa`가 원본/로컬 구름 레이어를 대조해 레이어별 hex 차이를 수치화 → dispatcher가 기대값을 박은 지시서로 단위 02 재위임 (라운드 2) → verifier PASS → design-qa 재대조 MATCH
