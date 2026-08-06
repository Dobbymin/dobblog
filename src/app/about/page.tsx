import type { Metadata } from 'next';

import { Footer, Header } from '@/layout';
import { ArrowUpRight, Code2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About | dobbymin',
  description: 'dobbymin 개발 블로그 소개.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className='site-shell about-page page-content'>
        <p className='eyebrow'>About</p>
        <h1>
          안녕하세요,
          <br />
          <em>dobbymin</em>입니다.
        </h1>
        <p className='about-lede'>
          개발 경험을 기록합니다. 문제를 해결한 과정, 프로젝트를 운영하며 배운
          점, 도구를 더 잘 쓰는 방법을 남깁니다.
        </p>
        <div className='about-links'>
          <a
            href='https://github.com/dobbymin'
            rel='noreferrer'
            target='_blank'
          >
            <Code2 size={19} /> GitHub <ArrowUpRight size={16} />
          </a>
          <a
            href='https://wiki.dobbymin.cloud/'
            rel='noreferrer'
            target='_blank'
          >
            Wiki <ArrowUpRight size={16} />
          </a>
        </div>
        <section className='about-interests'>
          <p className='eyebrow'>Interests</p>
          <ul>
            <li>AI Agents</li>
            <li>Developer Experience</li>
            <li>Automation</li>
            <li>Frontend</li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
