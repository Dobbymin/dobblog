# 원본 대비 시각 정확도 대조 절차

`design-qa` 에이전트가 사용한다. 목적은 "비슷한가"가 아니라 **"무엇이 얼마나 다른가"**를 수치로 만드는 것이다.

## 왜 스크린샷만으로는 부족한가

두 스크린샷을 나란히 놓고 보면 사람은 큰 차이(레이아웃 붕괴)는 잘 잡지만 작은 차이(색상 3% 밝기, 자간 0.02em)는 놓친다. 그런데 클론의 완성도를 결정하는 건 후자다. 반대로 수치만 있고 스크린샷이 없으면 사용자가 결과를 납득할 근거가 없다. **둘 다 만든다** — 판정은 수치로, 근거 제시는 스크린샷으로.

## 1. 양쪽 탭 준비

```
mcp__Claude_Browser__tabs_create      → 원본용 탭
mcp__Claude_Browser__navigate         → {참조 사이트 URL}
mcp__Claude_Browser__tabs_create      → 로컬용 탭
mcp__Claude_Browser__navigate         → http://localhost:3000
```

`tabs_context`로 tabId를 확보해두고, 이후 모든 호출에 tabId를 명시한다. 탭을 헷갈리면 로컬을 원본으로 착각해 "완전 일치"라는 무의미한 리포트가 나온다.

## 2. 조건 고정

```
mcp__Claude_Browser__resize_window { preset: "desktop", colorScheme: "light" }
```

양쪽 탭 모두에 같은 값을 적용한다. 폭이 다르면 `vw` 기반 구름 반지름이 다르게 나오는데, 이건 구현 결함이 아니라 측정 실수다.

## 3. computed style 대조 스크립트

양쪽 탭에서 **같은 스크립트**를 실행하고 결과를 표로 병치한다. 셀렉터는 원본과 로컬이 다르므로, 역할 기준으로 매핑 테이블을 먼저 만든다.

```js
(() => {
  // 역할 → 셀렉터. 원본/로컬 각각에 맞게 채운다.
  const MAP = {
    'hero-bg':      'header',
    'hero-title':   'header h1',
    'cloud-front':  '[class*=cloud]:last-of-type',
    'body-text':    'main p',
    'post-card':    'article, [class*=card]',
    'code-block':   'pre',
  };
  const PROPS = ['color','background-color','background-image','font-family',
    'font-size','font-weight','line-height','letter-spacing',
    'padding','margin','border-radius','box-shadow'];
  const rgb2hex = v => {
    const m = v.match(/\d+(\.\d+)?/g);
    if (!m || m.length < 3) return v;
    return '#' + m.slice(0,3).map(n => (+n).toString(16).padStart(2,'0')).join('');
  };
  const out = {};
  for (const [role, sel] of Object.entries(MAP)) {
    const el = document.querySelector(sel);
    if (!el) { out[role] = null; continue; }
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    out[role] = {
      selector: sel,
      box: { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) },
      ...Object.fromEntries(PROPS.map(p => {
        const v = cs.getPropertyValue(p);
        return [p, p.includes('color') ? `${rgb2hex(v)} (${v})` : v.slice(0, 160)];
      })),
    };
  }
  return out;
})()
```

`null`이 나온 역할은 "차이 없음"이 아니라 **"셀렉터를 못 찾음"**이다. 리포트에 미측정으로 표시하고 셀렉터를 고쳐 재시도한다. 조용히 빼면 미구현 요소가 통과한다.

## 4. 구름 전용 대조

구름은 일반 속성 비교로는 부족하다. 레이어별로 아래를 뽑는다:

```js
(() => {
  const layers = [...document.querySelectorAll('[class*=cloud], header svg path, header > div')];
  return layers.map(el => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      cls: el.className?.baseVal ?? el.className,
      bgImage: cs.backgroundImage,          // radial-gradient 반지름이 여기 그대로 보인다
      bgColor: cs.backgroundColor,
      fill: el.getAttribute?.('fill'),
      d: el.getAttribute?.('d')?.slice(0, 300),
      top: Math.round(r.top), height: Math.round(r.height),
      z: cs.zIndex,
    };
  });
})()
```

비교 항목: 레이어 개수 → 레이어별 색 → 아치 반지름 → y 오프셋 → z 순서. **개수가 다르면 나머지 비교는 의미 없다.** 개수부터 맞춘 뒤 다음으로 간다.

## 5. 스크린샷

```
mcp__Claude_Browser__computer { action: "screenshot", tabId }
```

전체 페이지가 아니라 비교 대상 영역이 보이도록 스크롤 위치를 맞춘 뒤 캡처한다. 구름처럼 특정 영역만 볼 때는 `action: "zoom"` + `region`으로 확대 캡처하면 아치 곡률 차이가 눈에 보인다.

## 6. 판정 기준

| 항목 | 허용 오차 | 초과 시 |
|------|----------|--------|
| 색상 (RGB 채널) | ±2 | 결함 |
| 폰트 크기 | ±1px | 결함 |
| 간격 (padding/margin/gap) | ±2px 또는 ±2% 중 큰 값 | 결함 |
| 요소 박스 크기 | ±2% | 결함 |
| line-height | ±0.05 | 결함 |
| letter-spacing | ±0.01em | 결함 |
| font-family | — | 원본이 유료·독점 폰트면 `대체안`, 아니면 결함 |
| 구름 레이어 개수 | 0 (정확히 일치) | 결함(최상위 심각도) |

허용 오차 안이면 `허용 범위 내` 섹션에 참고로만 적고 결함으로 올리지 않는다. 노이즈를 결함으로 올리면 진짜 결함이 묻힌다.

## 7. 심각도 부여

| 심각도 | 기준 |
|--------|------|
| 치명 | 레이아웃 붕괴, 구름 레이어 개수 불일치, 요소 누락 |
| 높음 | 눈에 띄는 색상 차이(채널 ±10 이상), 폰트 스케일 전반 불일치 |
| 중간 | 간격·radius·그림자 차이 |
| 낮음 | 자간, 미세 색차(채널 ±3~9) |

## 8. 반응형·다크모드

`preset: "mobile"`(375×812)로 3~5단계를 반복한다. 데스크톱에서 완벽해도 모바일에서 구름이 화면을 뒤덮는 경우가 흔하다 — `vw` 단위와 고정 px가 섞이면 반드시 발생한다.

다크모드 구현이 있으면 `colorScheme: "dark"`로도 반복한다.

## 흔한 오분류

| 관찰 | 결함 아님 | 확인 방법 |
|------|----------|----------|
| 폰트가 다르게 보임 | 원본이 유료 폰트 사용 | `font-family` 원본 값을 확인, 웹폰트 라이선스 판단 |
| 색이 미묘하게 다름 | 스크린샷 색 프로파일 차이 | computed style 값으로 재확인 — 값이 같으면 무시 |
| 구름 크기가 다름 | 뷰포트 폭 불일치 | 양쪽 `window.innerWidth` 출력해 확인 |
| 요소가 없음 | 원본이 스크롤 후 지연 로딩 | 스크롤 후 재측정 |
