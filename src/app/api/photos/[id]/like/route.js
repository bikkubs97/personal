import config from "@payload-config";
import { getPayload } from "payload";

export async function POST(_request, { params }) {
  const { id } = await params;

  try {
    const payload = await getPayload({ config });
    const photo = await payload.findByID({
      collection: "photo-gallery",
      id,
      overrideAccess: false,
    });
    const updatedPhoto = await payload.update({
      collection: "photo-gallery",
      id: photo.id,
      data: { likes: (photo.likes || 0) + 1 },
      overrideAccess: true,
    });

    return Response.json({ likes: updatedPhoto.likes || 0 });
  } catch {
    return Response.json({ error: "Photo not found or could not be liked." }, { status: 404 });
  }
}
