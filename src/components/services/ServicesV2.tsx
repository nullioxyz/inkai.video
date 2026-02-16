import { CheckIcon } from '@/icons';
import image from '@public/images/ns-img-14.png';
import Image from 'next/image';
import RevealAnimation from '../animation/RevealAnimation';
import LinkButton from '../ui/button/Button';

const serviceHighlights = [
  {
    id: 'service-highlight-1',
    text: 'Build and launch effortlessly, no coding skills needed.',
  },
  {
    id: 'service-highlight-2',
    text: 'Dive right into action and elevate your sales.',
  },
  {
    id: 'service-highlight-3',
    text: 'We accelerate growth with cutting-edge digital solutions.',
  },
  {
    id: 'service-highlight-4',
    text: 'We grasp the unique requirements of your business.',
  },
];

const ServicesV2 = () => {
  return (
    <section>
      <RevealAnimation delay={0.2}>
        <div className="main-container">
          <div className="relative z-10">
            <div className="absolute top-0 right-0 bottom-0 left-0 -z-10 overflow-hidden rounded-[20px]">
              <Image src={image} alt="about bg" className="h-full w-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-5 px-6 py-14 max-lg:grid-cols-1 max-sm:gap-10 md:px-11">
              <div className="max-w-[500px]">
                <h5 className="text-accent mb-8">
                  Develop a fully functional website that includes engaging content and visuals.
                </h5>
                <LinkButton href="/pricing" btnClass="btn-md-v2 btn-gray-v2 group-hover/btn-v2:btn-primary-v2">
                  Get started
                </LinkButton>
              </div>
              <div>
                <ul className="space-y-5">
                  {serviceHighlights.map(({ id, text }) => (
                    <li key={id} className="flex items-center gap-2">
                      <span className="bg-accent/17 size-5 shrink-0 rounded-full">
                        <CheckIcon className="fill-accent" />
                      </span>
                      <span className="text-accent">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </RevealAnimation>
    </section>
  );
};

export default ServicesV2;
