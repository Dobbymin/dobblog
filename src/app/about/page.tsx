import type { Metadata } from 'next';

import { AboutContent, PageTransition } from '@/components';
import { Footer, Header } from '@/layout';

export const metadata: Metadata = {
  title: 'Who am I',
  description: '프론트엔드 개발자 김강민의 대표 프로젝트와 기술 스택.',
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div className='route-transition-page about-route'>
        <Header variant='about' />
        <AboutContent />
        <Footer showThemeToggle={false} />
      </div>
    </PageTransition>
  );
}
