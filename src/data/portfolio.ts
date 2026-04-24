export interface TechItem {
  name: string;
  iconId: string;
}

export interface ProjectItem {
  num: string;
  name: string;
  desc: string;
  tags: string[];
  source: string;
  visit: string;
  accent: string;
}

export interface BlogPost {
  title: string;
  date: string;
  href: string;
}

export const techStack: TechItem[] = [
  { name: 'MongoDB', iconId: 'mongo' },
  { name: 'HTML 5', iconId: 'html' },
  { name: 'CSS', iconId: 'css' },
  { name: 'TypeScript', iconId: 'ts' },
  { name: 'Next.js', iconId: 'next' },
  { name: 'Tailwind CSS', iconId: 'tailwind' },
  { name: 'Supabase', iconId: 'supabase' },
  { name: 'React.js', iconId: 'react' },
  { name: 'Rust', iconId: 'rust' },
  { name: 'GSAP', iconId: 'gsap' },
];

export const projects: ProjectItem[] = [
  {
    num: '01',
    name: 'Realtime Sudoku',
    desc: 'A realtime, multiplayer Sudoku game with live sync across players. Built for speed and collaboration.',
    tags: ['Next.js', 'Liveblocks', 'TypeScript', 'Tailwind'],
    source: '',
    visit: 'https://sudoku.duyle.dev',
    accent: 'linear-gradient(135deg, #cba6f7, #89b4fa)',
  },
  {
    num: '02',
    name: 'Echelon Delta',
    desc: 'A creative site with a sexy UI and immersive storytelling experience. Built with focus on motion and aesthetics.',
    tags: ['Next.js', 'GSAP', 'Framer Motion', 'Tailwind'],
    source: '#',
    visit: 'https://echelon-delta.vercel.app/storyline',
    accent: 'linear-gradient(135deg, #f38ba8, #fab387)',
  },
  {
    num: '03',
    name: 'Interactive UI',
    desc: 'A curated library of copy-paste ready components — beautiful, accessible, and production-ready.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Radix UI'],
    source: '',
    visit: 'https://ui.duyle.dev',
    accent: 'linear-gradient(135deg, #a6e3a1, #94e2d5)',
  },
];

export const blogPosts: BlogPost[] = [
  { title: 'A New Beginning', date: 'Nov 18, 2024', href: 'https://www.duyle.dev/blog/new-beginning' },
  { title: 'Conditionally Add Tailwind Classes With Data Attributes', date: 'Oct 17, 2024', href: 'https://www.duyle.dev/blog/data-attributes' },
  { title: 'Collapse Border in CSS Grid', date: 'Sep 20, 2024', href: 'https://www.duyle.dev/blog/border-collapse' },
];
