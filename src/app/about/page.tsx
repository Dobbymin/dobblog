import type { Metadata } from 'next';

import { AboutContent, PageTransition } from '@/components';
import { Footer, Header } from '@/layout';

export const metadata: Metadata = {
  title: 'About | dobbymin',
  description: '프론트엔드 개발자 강민의 활동 경험과 기술 스택.',
};

export default function AboutPage() {
  return (
    <PageTransition>
      <div className='route-transition-page about-route'>
        <Header variant='about' />
        <AboutContent />
        <Footer />
      </div>
    </PageTransition>
  );
}
