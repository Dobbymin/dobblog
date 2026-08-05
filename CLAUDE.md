@AGENTS.md

## 하네스: dobby-blog (joshwcomeau.com 스타일 개발 블로그)

**목표:** 원본 디자인을 실측해 스펙화하고, 구현은 전량 codex에 위임한 뒤 빌드로 검증한다.

**트리거:** 블로그 UI·페이지·디자인 관련 작업 요청 시 `blog-clone-build` 스킬을 사용하라. 단순 질문이나 한 줄 수정은 직접 응답 가능.

**위임 원칙:** `src/` 아래 앱 코드는 Claude가 직접 쓰지 않는다. codex가 구현하고 Claude는 지시·검수만 한다.

**변경 이력:**
| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-08-05 | 초기 구성 (에이전트 3, 스킬 3) | 전체 | - |
| 2026-08-05 | design-qa 에이전트 추가 + Phase 3·4 검증 단계 삽입 | agents/design-qa.md, skills/blog-clone-build, design-token-extraction/references/visual-diff.md | 초기 선택 번복 — 픽셀 정확도 검증 필요 |
| 2026-08-05 | `public/font` → `public/fonts` rename | public/ | layout.tsx localFont 경로 불일치 해소 |
