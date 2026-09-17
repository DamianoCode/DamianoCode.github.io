import { getCollection } from 'astro:content';

/** Opublikowane wpisy (bez szkiców), od najnowszego. */
export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
