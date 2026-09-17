import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { profile } from '../data/profile';
import { getPublishedPosts } from '../lib/posts';

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();

  return rss({
    title: `Blog, ${profile.fullName}`,
    description: 'Notatki z budowania aplikacji fullstack i z pracy z agentami AI w Claude Code.',
    site: context.site!,
    customData: '<language>pl-pl</language>',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
    })),
  });
}
