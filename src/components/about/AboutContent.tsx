import { EXTERNAL_ROUTES_PATH } from '@/constants';
import { ArrowUpRight } from 'lucide-react';

import { Cloud, GithubIcon } from '../common';
import { Badge } from '../ui';

const activities = [
  {
    year: '2025',
    items: [
      '부산 글로벌 데이터 해커톤 - DIVE (주택보증공사 발제사) : 3위 수상 🏅',
    ],
  },
  {
    year: '2024',
    items: [
      '해달XGDSCX멋쟁이사자처럼X앱동XGETIT 연합 GLOW 해커톤',
      '카카오 테크 캠퍼스 2nd : Frontend 수료',
      'GDG on Campus KNU 4기 Frontend Core (2024 ~ 2025)',
      'IT대학 전자공학부 SEEK Square 2024 : 우수상 🏅',
    ],
  },
  {
    year: '2023',
    items: [
      'GDSC KNU 3기 FE Member (2023 ~ 2024)',
      '경북대학교 IT대학 학술동아리 해달 (2023 ~ 2024)',
      'GDSC 영남권 연합 아이디어톤 - 다함께 솔챌톤 : 우수상 🏅',
      '해달 growth 해커톤 : 최우수상, 아이디어상 🏅',
    ],
  },
] as const;

const techStack = [
  { color: '#61dafb', label: 'React' },
  { color: '#3178c6', label: 'TypeScript' },
  { color: '#06b6d4', label: 'Tailwind CSS' },
  { color: '#111111', label: 'Next.js' },
] as const;

export function AboutContent() {
  return (
    <main>
      <section className='about-hero'>
        <div className='site-shell about-hero-content'>
          <h1 className='flex items-baseline gap-4'>
            김강민
            <span className='text-2xl'>Dobbymin</span>
          </h1>
          <p>
            웹 프론트엔드 개발자를 꿈꾸고 있습니다.
            <br />
            React와 TypeScript를 주로 공부하고 있습니다.
          </p>
          <a
            className='about-github-link'
            href={EXTERNAL_ROUTES_PATH.GITHUB}
            rel='noreferrer'
            target='_blank'
          >
            <GithubIcon height={18} width={18} />
            GitHub profile
            <ArrowUpRight aria-hidden='true' size={16} />
          </a>
        </div>
        <div className='about-hero-clouds'>
          <Cloud height='357px' variant='article' viewBoxHeight={357} />
        </div>
      </section>

      <div className='site-shell about-content'>
        <section className='about-section'>
          <header className='about-section-header'>
            <p>Activity experience</p>
            <h2>배우고, 만들고, 함께한 경험</h2>
          </header>
          <div className='about-timeline'>
            {activities.map(({ items, year }) => (
              <article className='about-year' key={year}>
                <h3>{year}</h3>
                <ul>
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className='about-section'>
          <header className='about-section-header'>
            <p>Tech Stack</p>
            <h2>주로 사용하는 기술</h2>
          </header>
          <div className='about-tech-list'>
            {techStack.map(({ color, label }) => (
              <Badge className='about-tech-badge' key={label} variant='outline'>
                <span
                  aria-hidden='true'
                  className='about-tech-dot'
                  style={{ backgroundColor: color }}
                />
                {label}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
