import { HomeContent, PageTransition } from '@/components';
import { Footer, Header } from '@/layout';
import { postCategories, postSummaries } from '@/libs';

export default function Home() {
  return (
    <PageTransition>
      <div className='route-transition-page'>
        <Header variant='home' />
        <HomeContent categories={postCategories} posts={postSummaries} />
        <Footer />
      </div>
    </PageTransition>
  );
}
