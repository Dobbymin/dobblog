import Image from 'next/image';

import { EXTERNAL_ROUTES_PATH } from '@/constants';
import { ArrowUpRight, GraduationCap, Trophy } from 'lucide-react';

import { Cloud, GithubIcon } from '../common';
import { Badge } from '../ui';

type Project = {
  award?: string;
  description: string;
  highlights: readonly string[];
  logo: string;
  logoAlt: string;
  logoBackground?: 'light';
  name: string;
  period?: string;
  program?: string;
  technologies: readonly string[];
};

const projects: readonly Project[] = [
  {
    description:
      '실시간 암호화폐 시세를 바탕으로 시장 분석과 모의 매매를 경험하는 투자 플랫폼',
    highlights: [
      'Upbit 시세와 WebSocket을 결합하고, 뉴스 분석부터 모의 투자까지 하나의 흐름으로 연결',
      'REST 캔들과 실시간 틱을 결합한 차트, 서버가 검증하는 주문 데이터, AI 기반 뉴스 분석 파이프라인 구현',
    ],
    logo: '/images/projects/dobbit-logo.svg',
    logoAlt: 'Dobbit logo',
    name: 'Dobbit',
    period: '2026',
    technologies: [
      'Next.js',
      'TypeScript',
      'NestJS',
      'PostgreSQL',
      'Socket.io',
    ],
  },
  {
    award: 'DIVE 2025 2nd Global Data Hackathon · 주택보증공사 발제사 3위',
    description:
      '전세 계약 전 위험 요소를 분석해 더 안전한 의사결정을 돕는 전세 사기 예방 플랫폼',
    highlights: [
      'Zustand를 도입해 여러 API와 복잡한 데이터 흐름을 정리하고 불필요한 리렌더링을 줄이는 방향으로 설계',
      'GitHub Actions와 Gemini API로 PR 자동 요약을 구축하고, 전체 타입 검사를 pre-commit 훅에 추가',
    ],
    logo: '/images/projects/lighthouse-logo.webp',
    logoAlt: 'Lighthouse logo',
    name: 'Lighthouse',
    period: '2025',
    technologies: [
      'React',
      'Vite',
      'TypeScript',
      'Zustand',
      'TanStack Query',
      'Tailwind CSS',
    ],
  },
  {
    award: 'SEEK Squre 2024 우수상 · 경북대학교 IT대학 전자공학부장',
    description:
      '절약과 봉사를 일상의 챌린지로 만들고, 실천 기록과 리뷰·랭킹으로 참여를 이어가는 서비스',
    highlights: [
      '챌린지 탐색·참여부터 실천 기록과 리뷰 작성까지 이어지는 사용자 흐름을 구현',
      '전체·개인 랭킹과 등급 정보를 제공해 실천을 지속할 수 있도록 참여 동기를 설계',
    ],
    logo: '/images/projects/zzansuni-logo.svg',
    logoAlt: 'ZZANSUNI logo',
    logoBackground: 'light',
    name: '짠순이',
    period: '2024',
    technologies: ['React', 'Vite', 'TypeScript', 'Emotion'],
  },
  {
    description:
      '세대 간 디지털 격차를 줄이기 위해 전화 한 통으로 도움을 요청할 수 있게 만든 콜백 서비스',
    highlights: [
      '시니어와 젊은 세대를 연결하는 콜백·안부 전화 서비스를 제공',
      'S3·CloudFront·PWA·GitHub Actions CI/CD를 구성하고 Lazy Loading과 Skeleton UI로 초기 로딩 경험 개선',
    ],
    logo: '/images/projects/sinitto-logo.png',
    logoAlt: '나만의 작은 시니또 logo',
    logoBackground: 'light',
    name: '나만의 작은 시니또',
    period: '2024',
    program: 'Kakao tech campus 2nd',
    technologies: [
      'React',
      'Vite',
      'TypeScript',
      'Chakra UI',
      'PWA',
      'TanStack Query',
    ],
  },
];

const techStack = [
  { icon: '/images/tech/react.svg', label: 'React' },
  { icon: '/images/tech/typescript.svg', label: 'TypeScript' },
  { icon: '/images/tech/nextjs.svg', label: 'Next.js' },
  { icon: '/images/tech/chakraui.svg', label: 'Chakra UI' },
  { icon: '/images/tech/tailwindcss.svg', label: 'Tailwind CSS' },
  { icon: '/images/tech/zustand.png', label: 'Zustand' },
  { icon: '/images/tech/tanstack.svg', label: 'TanStack Query' },
] as const;

const activities = [
  {
    logo: '/images/activities/gdg-on-campus.png',
    logoAlt: 'GDG on Campus logo',
    period: '2023 ~ 2025',
    title: 'GDG on Campus KNU',
  },
  {
    logo: '/images/activities/kakao-tech-campus.png',
    logoAlt: 'Kakao Tech Campus logo',
    period: '2024',
    title: 'Kakao tech campus 2nd',
  },
] as const;

const awards = [
  {
    period: '2025',
    title: 'DIVE 2025 2nd Global Data Hackathon · 주택보증공사 3위',
    detail: '부산광역시, (재)부산테크노파크',
  },
  {
    period: '2024',
    title: 'SEEK Squre 2024 우수상',
    detail: '경북대학교 IT대학 전자공학부장',
  },
  {
    period: '2024',
    title: 'GDSC 다함께 솔챌톤 우수상',
    detail: 'Google Developer Student Clubs',
  },
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
            새로운 기술이나 아이디어를 발견하면 직접 만들어 보며 이해하는
            프론트엔드 개발자입니다.
            <br />
            사용자 경험에서 시작해 데이터 흐름과 운영 환경까지, 궁금한 문제를
            하나씩 제품으로 풀어봅니다.
            <br />
            작은 호기심을 꾸준한 실험과 기록으로 이어가고 있습니다.
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
            <p>Tech Stack</p>
            <h2>주로 사용하는 기술</h2>
          </header>
          <div className='about-tech-list'>
            {techStack.map(({ icon, label }) => (
              <Badge className='about-tech-badge' key={label} variant='outline'>
                <Image
                  alt={`${label} logo`}
                  height={24}
                  src={icon}
                  width={24}
                />
                {label}
              </Badge>
            ))}
          </div>
        </section>

        <section className='about-section'>
          <header className='about-section-header'>
            <p>Activities</p>
            <h2>활동</h2>
          </header>

          <ul className='about-record-list about-activity-list'>
            {activities.map(({ logo, logoAlt, period, title }) => (
              <li key={title}>
                <span className='about-activity-logo'>
                  <Image alt={logoAlt} height={40} src={logo} width={40} />
                </span>
                <div>
                  <p>{period}</p>
                  <h3>{title}</h3>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className='about-section'>
          <header className='about-section-header'>
            <p>Awards</p>
            <h2>수상 경력</h2>
          </header>

          <ul className='about-record-list'>
            {awards.map(({ detail, period, title }) => (
              <li key={title}>
                <Trophy aria-hidden='true' size={20} />
                <div>
                  <p>{period}</p>
                  <h3>{title}</h3>
                  <span>{detail}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className='about-section'>
          <header className='about-section-header'>
            <p>Project</p>
            <h2>프로젝트 기록</h2>
          </header>
          <div className='about-project-list'>
            {projects.map(
              ({
                award,
                description,
                highlights,
                logo,
                logoAlt,
                logoBackground,
                name,
                period,
                program,
                technologies,
              }) => (
                <article className='about-project-card' key={name}>
                  <header className='about-project-card-header'>
                    <div
                      className={`about-project-logo ${name === '나만의 작은 시니또' ? 'about-project-logo-sinitto' : ''}`}
                      data-background={logoBackground}
                    >
                      <Image alt={logoAlt} height={72} src={logo} width={72} />
                    </div>
                    <div>
                      {period ? (
                        <p className='about-project-period'>{period}</p>
                      ) : null}
                      <h3>{name}</h3>
                    </div>
                  </header>
                  <p className='about-project-description'>{description}</p>
                  <ul className='about-project-highlights'>
                    {highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                  <div className='about-project-technologies'>
                    {technologies.map((technology) => (
                      <Badge key={technology} variant='outline'>
                        {technology}
                      </Badge>
                    ))}
                  </div>
                  {award ? (
                    <p className='about-project-award'>
                      <Trophy aria-hidden='true' size={16} />
                      {award}
                    </p>
                  ) : null}
                  {program ? (
                    <p className='about-project-program'>
                      <GraduationCap aria-hidden='true' size={16} />
                      {program}
                    </p>
                  ) : null}
                </article>
              ),
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
