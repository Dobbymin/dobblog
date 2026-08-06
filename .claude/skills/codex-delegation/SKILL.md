---
name: codex-delegation
description: codex CLI(codex exec)에 구현 작업을 위임하는 규약. 자족적 지시서 작성 템플릿, exec 호출 플래그, 결과 diff 검수 절차, 재위임 루프를 담는다. "codex에게 맡겨", "codex로 구현", "위임", "codex exec", "지시서 작성", "codex 결과 검수", "재위임", "다시 codex 돌려" 같은 요청이면 반드시 이 스킬을 사용하라. codex 산출물이 스펙과 어긋나 고쳐야 할 때도 이 스킬의 재위임 절차를 따른다.
---

# codex 위임 규약

## 왜 지시서를 파일로 쓰는가

`codex exec`는 새 세션에서 시작한다. 이 대화의 맥락, 앞서 측정한 색상값, 사용자가 말한 제약을 codex는 하나도 모른다. 지시서에 없는 정보는 codex에게 존재하지 않는 정보다. 그래서 지시서는 **그 파일만 읽고도 작업이 되는** 자족적 문서여야 한다.

파일로 남기는 두 번째 이유는 감사다. 코드의 출처가 "어느 지시서의 몇 번째 라운드"로 추적되면, 잘못된 구현의 원인이 지시 누락인지 codex의 실수인지 구분된다.

## 지시서 템플릿

`_workspace/02_codex_brief_{NN}_{unit}.md`로 저장한다.

```markdown
# 작업: {한 줄 목표}

## 프로젝트 컨텍스트
- 경로: /Users/gimgangmin/Desktop/Dev/sidePJ/dobby-blog
- Next.js 16.3 App Router / React 19 / TypeScript
- **Next.js 16은 학습 데이터와 API가 다르다. 코드 작성 전 `node_modules/next/dist/docs/`의 관련 가이드를 읽어라.**
- Tailwind CSS v4 — `tailwind.config.js` 없음. 토큰은 `src/app/globals.css`의 `@theme inline` 블록에 추가한다.
- `next.config.ts`에 `output: 'export'` — 정적 export. 서버 액션·route handler·ISR·미들웨어 사용 불가. 동적 라우트는 `generateStaticParams` 필수.
- 패키지 매니저: pnpm
- 경로 별칭: `@/*` → `src/*`
- 포매팅: prettier (import 정렬 플러그인 적용). 작업 후 `pnpm exec prettier --write {건드린 파일}`

## 해야 할 일
{번호 매긴 구체적 작업}

## 디자인 스펙 (그대로 사용할 것 — 임의 변경 금지)
{색상값·크기·간격을 값 그대로 인라인. "스펙 문서 참고"라고 쓰지 말고 값을 복사해 넣는다}

## 하지 말 것
- 이미지 파일로 구름 구현 (반드시 CSS)
- 새 의존성 추가 (기존 package.json 범위 내에서 해결)
- 지정 파일 밖 수정
- `AGENTS.md`의 nextjs-agent-rules 블록 삭제

## 수용 기준
- [ ] `pnpm exec tsc --noEmit` 통과
- [ ] `pnpm build` 통과 (`out/` 생성)
- [ ] {스펙 수치가 코드에 반영됐는지 검증 가능한 항목}

## 완료 보고
마지막에 변경한 파일 목록과 각 파일에서 무엇을 했는지 3줄 이내로 요약하라.
```

## exec 호출

```bash
codex exec --sandbox workspace-write -c model_reasoning_effort=high \
  "$(cat _workspace/02_codex_brief_01_cloud-header.md)" \
  2>&1 | tee _workspace/02_codex_log_01_cloud-header.txt
```

- `--sandbox workspace-write` — 워크스페이스 안에서만 쓰기. `danger-full-access`는 쓰지 않는다. 정적 export 블로그에 워크스페이스 밖 쓰기 권한이 필요한 이유가 없고, 권한을 넓히면 잘못된 지시가 프로젝트 밖을 건드릴 수 있다.
- 실행 전 `git status`로 작업 트리를 확인하고, 로그에 시작 시점 커밋 해시를 남긴다 — diff 범위 특정에 필요하다.
- 5분 넘게 걸리는 단위는 `run_in_background: true`로 돌린다.
- **참조 이미지를 codex에 넘길 때**는 `-i {경로}`를 추가한다. 단, 이미지는 보조일 뿐 스펙 수치를 대신하지 않는다 — 지시서에 값을 반드시 적는다.

## 결과 검수

**exec 전에** 스냅샷을 떠둔다 — 이게 없으면 codex 변경을 특정할 수 없다:

```bash
git rev-parse HEAD > _workspace/02_codex_before_{NN}.txt
git status --short >> _workspace/02_codex_before_{NN}.txt
```

exec 종료 후:

1. `git status --short`를 다시 찍고 **before 스냅샷과의 차집합**을 취한다. 같은 시간대에 메인 세션이나 다른 에이전트가 파일을 고칠 수 있으므로, 단순 `git diff`는 무관한 변경까지 codex 탓으로 올린다
2. 각 변경 파일을 실제로 읽는다. codex의 완료 보고를 믿지 않는다 — 보고와 코드가 어긋나는 경우가 실제로 있다
3. **UI 컴포넌트를 만들었다면 렌더 경로를 역추적한다.** 파일 존재는 검증이 아니다. 누가 import하는지, 그 소비자가 라우트에 연결돼 있는지 확인하고, 가장 확실하게는 빌드 산출물에서 특징 문자열을 grep한다 (`grep -c radial-gradient out/index.html`)
4. 수용 기준을 하나씩 **실제로 명령을 돌려** 대조하고 `_workspace/02_codex_review_{NN}_{unit}.md`에 표로 기록
5. 범위 밖 파일이 변경됐으면 되돌리지 말고 리포트에 표시 후 사용자 확인

### 판정 권한 없음

검수 리포트에 "통과", "확정", "PASS" 같은 최종 판정을 쓰지 마라. 수용 기준별 충족/미충족과 근거만 적는다. 판정은 `build-verifier`(빌드)와 `design-qa`(시각)가 내린다.

특히 **수용 기준의 명령이 실패했는데 "기존 코드 문제이므로 통과"로 처리하지 마라.** 원인이 어디에 있든 종료 코드가 0이 아니면 미충족이다. 원인 분류는 별도 열에 적되, 충족 여부를 바꾸지 않는다. 이 구분이 무너지면 깨진 빌드가 통과 판정을 달고 다음 단위로 흘러간다.

## 재위임 루프

미충족 항목이 있으면 새 번호로 지시서를 만든다. 이전 지시서를 수정하지 않는다.

재위임 지시서에는 원본 지시서 내용을 다시 전부 넣고(codex는 이전 세션을 기억하지 못한다), 앞에 다음 섹션을 추가한다:

```markdown
## 이전 라운드 결과 — 아래를 고쳐라
| 파일:라인 | 현재 코드 | 기대값 | 왜 틀렸는지 |
```

"왜 틀렸는지"를 빼면 codex가 같은 실수를 반복한다. 증상만 주면 증상만 덮는다.

**라운드 상한 2회.** 2라운드 후에도 미충족이면 멈추고 사용자에게 보고한다. 무한 재위임은 토큰만 태우고, 지시서 자체가 잘못됐다는 신호일 가능성이 높다.

## codex:rescue 서브에이전트를 쓸 때

`codex exec`가 반복 실패하거나 원인 불명 버그를 파고들어야 할 때는 `codex:rescue` 서브에이전트를 쓴다. 구분 기준:

| 상황 | 도구 |
|------|------|
| 스펙이 명확한 신규 구현 | `codex exec` |
| 여러 파일에 걸친 정형 작업 | `codex exec` |
| 원인 불명 버그, 2라운드 실패 | `codex:rescue` |
| 진단만 필요 (구현 X) | `codex:rescue` |

## 흔한 실패와 원인

| 증상 | 원인 | 대응 |
|------|------|------|
| Tailwind 클래스가 안 먹음 | v4에서 config 파일 방식으로 토큰 추가 시도 | 지시서에 `@theme inline` 명시 |
| 빌드는 되는데 `out/`이 비어있음 | 동적 라우트에 `generateStaticParams` 누락 | 수용 기준에 `out/` 확인 포함 |
| 색이 스펙과 다름 | 지시서가 스펙 문서를 "참고하라"고만 함 | 값을 인라인으로 복사 |
| 엉뚱한 파일이 함께 바뀜 | 작업 단위가 너무 큼 | 단위 분할 |
