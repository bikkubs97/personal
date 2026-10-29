import config from "@payload-config";
import { getPayload } from "payload";

async function getCMS() {
  return getPayload({ config });
}

export async function getPhotoGalleryEntries() {
  const payload = await getCMS();
  const { docs } = await payload.find({
    collection: "photo-gallery",
    depth: 1,
    limit: 100,
    sort: "-createdAt",
    overrideAccess: false,
  });

  return docs.flatMap((entry) => {
    const image = typeof entry.image === "object" ? entry.image : null;
    if (!image?.url) return [];

    return [{
      id: entry.id,
      title: entry.title,
      location: entry.location,
      description: entry.description,
      image: image.url,
      tags: entry.tags?.map(({ tag }) => tag).filter(Boolean) || [],
      likes: entry.likes || 0,
    }];
  });
}

export async function getStoryEntries() {
  const payload = await getCMS();
  const { docs } = await payload.find({
    collection: "stories",
    limit: 100,
    sort: "-createdAt",
    overrideAccess: false,
  });

  return docs.map((story) => ({
    id: story.id,
    slug: story.slug,
    title: story.title,
    category: story.category,
    readTime: story.readTime,
    excerpt: story.excerpt,
    content: story.content,
  }));
}

export async function getContentByType(type) {
  if (type === "photogallery") return getPhotoGalleryEntries();
  if (type === "stories") return getStoryEntries();

  const [photos, stories] = await Promise.all([
    getPhotoGalleryEntries(),
    getStoryEntries(),
  ]);
  return { photos, stories };
}
