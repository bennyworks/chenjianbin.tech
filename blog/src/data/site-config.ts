import avatar from '../assets/images/avatar.jpg';
import hero from '../assets/images/hero.jpg';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://bennyworks.github.io/chenjianbin.tech',
    avatar: {
        src: avatar,
        alt: 'Ethan Donovan'
    },
    title: '陈剑彬',
    subtitle: '哲学、技术与人的处境',
    description: '记录技术变化之中，那些仍然需要被人亲自思考的问题。',
    image: {
        src: '/chenjianbin.tech/dante-preview.jpg',
        alt: '陈剑彬的个人文章系统'
    },
    headerNavLinks: [{ text: '首页', href: '/' }, { text: '文章', href: '/blog' }, { text: '系列', href: '/series/llm' }, { text: '标签', href: '/tags' }],
    footerNavLinks: [{ text: 'GitHub', href: 'https://github.com/bennyworks/chenjianbin.tech' }],
    socialLinks: [],
    hero: {
        title: '在技术的回声里，保留人的问题。',
        text: '这里是陈剑彬的个人文章系统。\n\n我写大模型、注意力、认知与技术如何重新安排人的生活。文章不急着给出答案，先把问题说清楚。',
        image: {
            src: hero,
            alt: 'A person sitting at a desk in front of a computer'
        },
        actions: [
            {
                text: '浏览文章',
                href: '/blog'
            }
        ]
    },
    subscribe: {
        enabled: false
    },
    postsPerPage: 12,
    projectsPerPage: 0
};

export default siteConfig;
