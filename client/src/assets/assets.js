import bugbase from './bugbase.jpg'
import hike from './hike.png'
import phonepe from './phonepe.png'
import noannoncement from './no_announcement.svg'
import loginsignbg from './lsbg.png'

export const assets = {
  bugbase,
  hike,
  phonepe,
  noannoncement,
  loginsignbg,
}

export const navLinks = [
  { name: 'Home', href: '#', external: true, path: '/' },
  {
    name: 'FOR COMPANIES',
    dropdown: ['Overview', 'Why Us', 'Register'],
  },
  {
    name: 'RESEARCHERS',
    dropdown: ['Find Bugs', 'Get Rewards'],
  },
  { name: 'PROGRAMS', active: true, path: '/programs' },
  {
    name: 'PRODUCTS',
    dropdown: ['Bug Bounty', 'Vulnerability Disclosure'],
  },
  {
    name: 'PLANS',
    href: '#plans',
  },
  {
    name: 'RESOURCES',
    dropdown: ['Blog', 'Docs', 'Community'],
  },
]

export const PROGRAMS = [
  {
    id: 1,
    name: 'Sandeep',
    slug: 'hike-bugbounty',
    type: 'Bug Bounty',
    logo: assets.bugbase,
    tags: ['Bounty', 'Thanks', 'Managed'],
    color: 'bg-blue-500',
  },
  {
    id: 2,
    name: 'Sumit',
    slug: 'bugbase',
    type: 'Bug Bounty',
    logo: assets.hike,
    tags: ['Thanks', 'Managed'],
    color: 'bg-black',
  },
  {
    id: 3,
    name: 'Tushar',
    slug: 'needl.ai',
    type: 'Vulnerability Disclosure',
    logo: assets.phonepe,
    tags: ['Swags', 'Managed'],
    color: 'bg-yellow-400',
  },
  {
    id: 4,
    name: 'Flipkart',
    slug: 'flipkart',
    type: 'Vulnerability Disclosure',
    logo: assets.bugbase,
    tags: ['Thanks', 'Self-Managed'],
    color: 'bg-[#00887b]',
  },
  {
    id: 5,
    name: 'Tata Motors',
    slug: 'Tata Motors',
    type: 'Vulnerability Disclosure',
    logo: assets.hike,
    tags: ['Thanks', 'Managed'],
    color: 'bg-gray-800',
  },
  {
    id: 6,
    name: 'Flipkart',
    slug: 'flipkart',
    type: 'Vulnerability Disclosure',
    logo: assets.phonepe,
    tags: ['Thanks', 'Bounty'],
    color: 'bg-orange-800',
  },
]
