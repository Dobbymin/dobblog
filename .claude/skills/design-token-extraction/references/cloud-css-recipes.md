# 구름 배경 CSS 재현 레시피

참조 이미지의 구조: 위쪽은 하늘색 그라데이션, 아래로 갈수록 밝아지는 구름 아치가 **3개 레이어**로 겹쳐 쌓이고, 맨 앞 레이어는 흰색이며 화면 하단을 꽉 채운다. 각 아치는 크기가 제각각이고 서로 겹친다.

## 기법 A — 다중 radial-gradient (권장)

아치 하나 = `radial-gradient` 하나. 크기와 위치를 개별 지정하므로 불규칙한 구름을 그대로 재현할 수 있고, 아치끼리 자유롭게 겹친다.

```css
.cloud-layer {
  position: absolute;
  inset: 0;
  background:
    /* 아치들 — 위에 쓴 것이 앞에 온다 */
    radial-gradient(circle at 8% 100%,  var(--c) 0 26vw, transparent 26vw),
    radial-gradient(circle at 30% 100%, var(--c) 0 20vw, transparent 20vw),
    radial-gradient(circle at 52% 100%, var(--c) 0 24vw, transparent 24vw),
    radial-gradient(circle at 76% 100%, var(--c) 0 18vw, transparent 18vw),
    radial-gradient(circle at 95% 100%, var(--c) 0 22vw, transparent 22vw),
    /* 아치 아래를 단색으로 채움 */
    linear-gradient(var(--c), var(--c));
  background-repeat: no-repeat;
  background-position:
    bottom, bottom, bottom, bottom, bottom,
    bottom;
  background-size:
    100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%,
    100% var(--fill-h, 12vw);
}
```

**핵심 포인트**

- `circle at X% 100%` — 원의 중심을 레이어 **바닥**에 두면 위쪽 반원만 보여 아치가 된다.
- `var(--c) 0 26vw, transparent 26vw` — 색 정지점과 투명 정지점을 같은 위치에 두어 경계를 또렷하게 만든다. 간격을 주면 흐릿한 후광이 생긴다.
- 반지름 단위를 `vw`로 두면 화면 폭에 따라 구름 비율이 유지된다. `px`로 두면 모바일에서 구름이 거대해진다.
- 마지막 `linear-gradient`가 아치 아래 빈 공간을 채운다. `--fill-h`는 가장 낮은 아치의 바닥 두께.

**안티에일리어싱**: 정지점이 정확히 같으면 계단 현상이 보일 수 있다. 거슬리면 `transparent` 정지점만 `calc(26vw + 0.5px)`로 미세하게 띄운다.

## 레이어 3장 쌓기

각 레이어를 절대 위치로 겹치고, 뒤쪽일수록 위로 올린다(y 오프셋을 작게).

```css
.clouds {
  position: relative;
  background: linear-gradient(to bottom, var(--sky-top), var(--sky-bottom));
}
.clouds > .cloud-layer:nth-child(1) { --c: var(--cloud-back);  z-index: 1; }
.clouds > .cloud-layer:nth-child(2) { --c: var(--cloud-mid);   z-index: 2; top: 6vw; }
.clouds > .cloud-layer:nth-child(3) { --c: var(--cloud-front); z-index: 3; top: 12vw; }
```

레이어마다 `radial-gradient`의 x 위치와 반지름을 다르게 줘야 자연스럽다. 세 레이어가 같은 배치면 단순히 색만 다른 계단으로 보인다.

## 실측 전 임시 색상

`design-researcher`의 실측값으로 교체할 자리표시자. **그대로 출고하지 말 것.**

```css
--sky-top: #8ec5e8;
--sky-bottom: #b3d9f0;
--cloud-back: #cfe4f5;
--cloud-mid: #e2eff9;
--cloud-front: #ffffff;
```

## 섹션 구분용 구름 (본문 사이)

헤더와 달리 본문 사이 구름은 **아래쪽 섹션 배경색**으로 아치를 그린다. 위 섹션 위로 아래 섹션이 솟아오르는 모양이다. `--c`를 아래 섹션 배경으로 두고, 컨테이너 높이를 아치 반지름 정도로 잡은 뒤 `margin-bottom: -1px`로 이음새 틈을 막는다.

## 기법 B — SVG data URI (백업)

아치가 단순 원이 아니라 비대칭 곡선이면 A로는 한계가 있다. 그때만 SVG path를 `background-image: url("data:image/svg+xml,...")`로 넣는다. 여전히 이미지 파일이 아니므로 "CSS로 구현" 요구를 만족한다. `preserveAspectRatio="none"`을 넣어야 폭에 맞게 늘어난다.

## 접근성 · 성능

- 구름은 순수 장식이다. `aria-hidden="true"`를 붙여 스크린리더가 읽지 않게 한다.
- 그라데이션 레이어가 많으면 저사양 기기에서 페인트 비용이 오른다. 레이어당 아치는 6개 이내로 유지한다.
- 구름에 애니메이션을 넣는다면 `prefers-reduced-motion: reduce`에서 정지시킨다.
