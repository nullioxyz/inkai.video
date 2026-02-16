'use client';
import { CalendarIcon, ClockIcon } from '@/icons';
import { IBlogPost } from '@/interface';
import Image from 'next/image';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

interface FeaturedBlogSwiperProps {
  featuredBlogs: IBlogPost[];
}

const FeaturedBlogSwiper = ({ featuredBlogs }: FeaturedBlogSwiperProps) => {
  return (
    <RevealAnimation delay={0.3}>
      <div className="relative">
        <Swiper
          className="swiper blog-article-swiper"
          slidesPerView={1}
          loop={true}
          effect="slide"
          speed={1000}
          spaceBetween={40}
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            el: '.pagination-bullets',
            clickable: true,
            type: 'bullets',
          }}
          scrollbar={false}>
          <div className="swiper-wrapper">
            {featuredBlogs?.map((blog) => (
              <SwiperSlide key={blog.slug}>
                <article className="bg-background-1 dark:bg-background-5 scale-100 overflow-hidden rounded-[20px] transition-transform duration-500 hover:scale-[99%] hover:transition-transform hover:duration-500">
                  <figure className="max-h-[550px] w-full overflow-hidden rounded-[20px]">
                    <Image
                      src={blog.thumbnail}
                      alt={blog.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      width={800}
                      height={550}
                    />
                  </figure>
                  <div className="space-y-4 rounded-b-[20px] p-4 md:p-6 lg:p-8">
                    <div className="inline-block">
                      <span className="badge badge-cyan" aria-label="Article category">
                        {blog.tag}
                      </span>
                    </div>
                    <div className="flex items-center gap-5">
                      <time
                        className="text-tagline-2 text-secondary/60 dark:text-accent/60 flex items-center gap-2 font-medium"
                        dateTime="202 5-05-14">
                        <CalendarIcon className="size-5" />
                        {blog.publishDate}
                      </time>
                      <div aria-hidden="true" className="bg-stroke-2 dark:bg-stroke-6 inline-block h-3 w-px" />
                      <time
                        className="text-tagline-2 text-secondary/60 dark:text-accent/60 flex items-center gap-2 font-medium"
                        dateTime="PT1M">
                        <ClockIcon className="size-5.5" />
                        {blog.readTime}
                      </time>
                    </div>
                    <h3 className="sm:text-heading-5 text-tagline-1 font-normal">
                      <Link href={`/blog/${blog.slug}`} aria-label={`Read full article about ${blog.title}`}>
                        {blog.title}
                      </Link>
                    </h3>
                    <div>
                      <LinkButton
                        btnClass="btn-md-v2 btn-v2-white group-hover/btn-v2:btn-primary-v2"
                        href={`/blog/${blog.slug}`}>
                        Read more
                      </LinkButton>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </div>
          <div className="pagination-bullets mt-5 md:mt-14"></div>
        </Swiper>
      </div>
    </RevealAnimation>
  );
};

FeaturedBlogSwiper.displayName = 'FeaturedBlogSwiper';
export default FeaturedBlogSwiper;
