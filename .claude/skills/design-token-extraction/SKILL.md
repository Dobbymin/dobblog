---
name: design-token-extraction
description: 원본 웹사이트(joshwcomeau.com 등)를 브라우저로 열어 getComputedStyle로 색상·타이포·간격·그림자를 실측하고 재현용 디자인 스펙 문서를 만드는 절차. "디자인 조사", "색상 뽑아줘", "원본 실측", "토큰 추출", "이 사이트처럼", "클론할 스펙 정리", "구름 어떻게 만들어졌는지" 같은 요청이면 반드시 이 스킬을 사용하라. 구름/파형 배경을 CSS로 재현하는 레시피도 포함한다.
---

# 디자인 토큰 실측

## 왜 실측하는가

스크린샷을 보고 "하늘색이니까 대충 #87CEEB" 로 적으면 클론은 실패한다. 사람 눈은 색을 5~10% 틀리게 읽고, 그 오차가 레이어 3개에 누적되면 원본과 확연히 달라 보인다. `getComputedStyle`이 반환하는 값은 오차가 0이다.

## 절차

### 1. 원본 열기

```
mcp__Claude_Browser__navigate → 대상 URL
```

### 2. 토큰 일괄 추출

CSS 변수를 쓰는 사이트라면 루트 변수만 뽑아도 절반이 끝난다. `javascript_tool`로 실행:

```js
(() => {
  const cs = getComputedStyle(document.documentElement);
  const vars = {};
  for (const sheet of document.styleSheets) {
    let rules; try { rules = sheet.cssRules } catch { continue }
    for (const r of rules ?? []) {
      if (!r.style) continue;
      for (const p of r.style) {
        if (p.startsWith('--')) vars[p] = cs.getPropertyValue(p).trim();
      }
    }
  }
  return vars;
})()
```

### 3. 요소별 실측

CSS 변수를 안 쓰거나 값이 계산식이면 실제 요소에서 뽑는다:

```js
(() => {
  const pick = ['color','background-color','background-image','font-family',
    'font-size','font-weight','line-height','letter-spacing',
    'padding','margin','border-radius','box-shadow','max-width'];
  const out = {};
  for (const sel of ['header','h1','h2','main','article','a','code','pre']) {
    const el = document.querySelector(sel); if (!el) continue;
    const cs = getComputedStyle(el);
    out[sel] = Object.fromEntries(pick.map(p => [p, cs.getPropertyValue(p)]));
  }
  return out;
})()
```

### 4. 다크모드 재측정

테마 토글 버튼을 찾아 클릭하거나, 직접 전환한다:

```js
document.documentElement.classList.toggle('dark');
// 또는 사이트가 쓰는 속성: data-color-mode, data-theme 등을 먼저 확인
document.documentElement.attributes
```

전환 후 2·3단계를 다시 실행한다.

### 5. 구름 그래픽 분해

무엇으로 만들어졌는지부터 확인한다:

```js
(() => {
  const els = [...document.querySelectorAll('header *, svg, [class*=cloud], [class*=wave]')];
  return els.slice(0, 40).map(el => ({
    tag: el.tagName,
    cls: el.className?.baseVal ?? el.className,
    bg: getComputedStyle(el).backgroundImage.slice(0, 120),
    fill: el.getAttribute?.('fill'),
    d: el.getAttribute?.('d')?.slice(0, 200),
    box: el.getBoundingClientRect().toJSON(),
  }));
})()
```

원본이 SVG여도 우리는 CSS로 재현한다. 그래서 **기하 정보를 반드시 남긴다**: 레이어 수, 레이어별 색상, 아치 반지름(px 및 뷰포트 폭 대비 %), 아치 중심 x 위치, 레이어별 y 오프셋.

## 구름 CSS 재현 레시피

상세 코드와 레이어 구성은 `references/cloud-css-recipes.md`를 읽어라. 요약:

- **권장 기법**: 개별 `radial-gradient`를 여러 개 나열해 크기·위치가 제각각인 아치를 만들고, 아래쪽은 `linear-gradient` 단색으로 채운다. 아치가 서로 겹칠 수 있고 반응형(`vw` 단위)이 자연스럽다.
- **쓰지 말 것**: 단일 `background-repeat`로 원을 타일링하는 방식. 타일 경계에서 원이 잘려 인접 아치가 겹치는 모양을 만들 수 없다.

## 출력 형식

`_workspace/01_design_spec.md`에 아래 구조로 쓴다. 모든 값에 출처 셀렉터를 병기한다 — 나중에 값이 의심스러울 때 재측정 지점을 찾을 수 있어야 한다.

```markdown
## 디자인 토큰
### 라이트
| 토큰 | 값(hex) | 값(oklch) | 출처 |
### 다크
| 토큰 | 값(hex) | 값(oklch) | 출처 |
### 타이포
| 역할 | font-family | size | weight | line-height | letter-spacing | 출처 |
### 간격 · radius · shadow

## 구름 그래픽 스펙
- 원본 구현 방식:
- 레이어 수:
| 레이어 | 색상 | 아치 반지름(px / vw) | 중심 x(%) | y 오프셋 | z 순서 |
- 권장 CSS 재현 기법:

## 레이아웃 스펙
## 컴포넌트 스펙
## 재현 불가 · 대체안
## 측정 근거
```

## 브라우저를 못 쓸 때

`WebFetch`로 HTML과 링크된 CSS를 받아 정적 분석한다. 이때 문서 최상단에 반드시 명시한다:

```
> ⚠️ 실측 불가 — 정적 분석 기반. 계산된 값이 아니므로 신뢰도 낮음.
```

추정값을 실측값인 것처럼 적으면 이후 모든 구현이 잘못된 기준 위에 쌓인다. 신뢰도를 숨기는 것이 값이 없는 것보다 나쁘다.
