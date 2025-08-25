import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from 'react-icons/fi';
import type { ReactNode } from 'react';

interface SocialLink {
  icon: ReactNode;
  href: string;
}

interface ContactDetails {
  email: string;
  number: string;
  address: string;
}

export const socialLinks: SocialLink[] = [
  { icon: <FiFacebook />, href: 'https://facebook.com' },
  { icon: <FiTwitter />, href: 'https://twitter.com' },
  { icon: <FiInstagram />, href: 'https://instagram.com' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com' },
];

export const contactDetails: ContactDetails = {
  email: 'contact@ditv.org',
  number: '+91 9263767441',
  address: 'Near B.D. College, Mithapur Patna-800001'
};
