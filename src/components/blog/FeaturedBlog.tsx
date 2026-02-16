import { IBlogPost } from '@/interface';
import getMarkDownData from '@/utils/getMarkDownData';
import RevealAnimation from '../animation/RevealAnimation';
import FeaturedBlogSwiper from './FeaturedBlogSwiper';

const FeaturedBlog = () => {
  const featuredBlogs = getMarkDownData<IBlogPost & { [key: string]: unknown }>('src/data/blogs').slice(0, 4);

  return (
    <section className="pt-32 pb-14 sm:pt-36 md:pt-42 md:pb-16 lg:pb-[88px] xl:pt-[180px] xl:pb-[100px]">
      <div className="main-container">
        <div className="space-y-14 md:space-y-[70px]">
          <div className="mx-auto max-w-[700px] space-y-3 text-center">
            <RevealAnimation delay={0.1}>
              <h2>Our Latest Thinking Articles</h2>
            </RevealAnimation>
            <RevealAnimation delay={0.3}>
              <p>Our recent news &amp; insights highlight the latest developments and trends shaping our industry.</p>
            </RevealAnimation>
          </div>
          {/* Featured blog swiper */}
          <FeaturedBlogSwiper featuredBlogs={featuredBlogs} />
        </div>
      </div>
    </section>
  );
};

FeaturedBlog.displayName = 'FeaturedBlog';
export default FeaturedBlog;
