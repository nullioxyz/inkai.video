import ContactInfo from '@/components/contact-page/ContactInfo';
import ContactMap from '@/components/contact-page/ContactMap';
import CTAV1 from '@/components/shared/cta/CTAV1';
import { defaultMetadata } from '@/utils/generateMetaData';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'Contact Us - AI Application || NextSaaS',
};

const ContactUs = () => {
  return (
    <main className="bg-background-3 dark:bg-background-7">
      <ContactInfo />
      <ContactMap />
      <CTAV1
        className="dark:bg-background-5 bg-white"
        badgeClass="badge-yellow-v2"
        badgeText="Get started"
        ctaBtnText="Contact us"
        ctaHeading="Get in touch"
        description="We're here to help you with your inquiries and needs. Feel free to reach out to us using the contact form below, and we'll get back to you as soon as possible."
      />
    </main>
  );
};

export default ContactUs;
