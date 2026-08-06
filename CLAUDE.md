@AGENTS.md

## 하네스: dobby-blog (개발 블로그 UI 클론)

**목표:** 참조 개발 블로그의 UI를 실측해 스펙화하고, 구현은 전량 codex에 위임한 뒤 빌드·시각 대조로 검증한다.

**트리거:** 블로그 UI·페이지·디자인 관련 작업 요청 시 `blog-clone-build` 스킬을 사용하라. 단순 질문이나 한 줄 수정은 직접 응답 가능.

**위임 원칙:** `src/` 아래 앱 코드는 Claude가 직접 쓰지 않는다. codex가 구현하고 Claude는 지시·검수만 한다.

**변경 이력:**
| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-08-05 | 초기 구성 (에이전트 3, 스킬 3) | 전체 | - |
| 2026-08-05 | design-qa 에이전트 추가 + Phase 3·4 검증 단계 삽입 | agents/design-qa.md, skills/blog-clone-build, design-token-extraction/references/visual-diff.md | 초기 선택 번복 — 픽셀 정확도 검증 필요 |
| 2026-08-05 | `public/font` → `public/fonts` rename | public/ | layout.tsx localFont 경로 불일치 해소 |
| 2026-08-05 | 참조 사이트명 일반화 (하드코딩 URL 제거) | 전체 | 사용자 요청 — 특정 사이트 대신 "참조 사이트"로 파라미터화 |
| 2026-08-05 | 리서처에 "구현 기법 결정 금지" + "미완 항목 상단 보고" 원칙 추가 | agents/design-researcher.md, skills/blog-clone-build | 1회차 실행에서 리서처가 재현 기법을 임의 결정하고 미측정을 "측정 중"으로 숨김 |
| 2026-08-05 | dispatcher에 판정 권한 박탈 + exec 전후 스냅샷 차집합 + 렌더 경로 역추적 원칙 추가 | agents/codex-dispatcher.md, skills/codex-delegation | 라운드 1에서 dispatcher가 빌드 실패를 "통과 확정"으로 판정, 타 세션 변경을 codex 소행으로 오인, Header 미연결(구름 미렌더)을 놓침 |
| 2026-08-05 | 구름 레시피에 `ellipse` 강제 + 양 끝 아치 화면 밖 배치 (치명적 함정 1·2) | design-token-extraction/references/cloud-css-recipes.md | `circle`+`vw` 반지름+고정 높이 조합이 뷰포트 1373px 초과 시 아치를 잘라먹음 |
| 2026-08-05 | design-qa 검증 폭을 5개(375~2560px)로 확대 + preset 함정 명시 | agents/design-qa.md | desktop/mobile 두 점만 보면 특정 폭 초과에서만 나타나는 잘림을 구조적으로 놓침 |
| 2026-08-05 | 구름 레시피를 px 고정 + repeat-x 타일링으로 전면 개정 (함정 1·2·3 명시) | design-token-extraction/references/cloud-css-recipes.md | 아치 개수 고정 방식은 2560px에서 구름이 소멸, top 오프셋 vw는 앞 레이어를 컨테이너 밖으로 밀어냄 |
| 2026-08-05 | "반응형 CSS 도형은 위임 전 브라우저에서 값 확정" 원칙 추가 | skills/blog-clone-build | 코드만 보고는 깨지는 폭을 알 수 없어 위임 3라운드가 전부 헛돌았음 |
| 2026-08-05 | 레시피에 "치명적 함정 5"(레이어 바닥 고정 금지) + 지시 시 레이아웃 컨텍스트 동봉 원칙 추가 | cloud-css-recipes.md, skills/blog-clone-build | height 조건 누락으로 구현자가 bottom:0을 써서 세 레이어 바닥이 한 점에 모여 층이 사라짐 |
| 2026-08-06 | 구름을 CSS gradient → 인라인 SVG 타원 겹치기로 전환 (기법 S 신설, CSS 타일링은 대안으로 강등) | cloud-css-recipes.md, src/components/Cloud.tsx | radial-gradient는 균일 타원만 그려 벽지처럼 보임. 사용자가 원본이 SVG임을 확인하고 SVG 채택 |
| 2026-08-06 | 기법 S를 참조 사이트 실측 기법으로 재작성 (`min(5120px,670vw)` 반응형 + 방향 기반 제어점 비대칭) + 함정 S1~S3 | cloud-css-recipes.md, src/components/Cloud.tsx | 타원 겹치기는 원본과 형태가 달랐음. 원본 실측 결과 고정폭 전략과 제어점 규칙(0.66/0.80 ↔ 0.14/0.32)을 확인해 재현 |
