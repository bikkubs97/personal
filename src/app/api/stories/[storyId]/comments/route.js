import config from "@payload-config";
import { getPayload } from "payload";
import { SESSION_COOKIE_NAME, getUserFromSession } from "@/lib/auth";

function serializeComment(comment) {
  return {
    id: comment.id,
    authorName: comment.authorName,
    message: comment.message,
    createdAt: comment.createdAt,
  };
}

export async function GET(_request, { params }) {
  const { storyId } = await params;
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "story-comments",
    where: { story: { equals: storyId } },
    sort: "-createdAt",
    limit: 100,
    overrideAccess: false,
  });

  return Response.json({ comments: docs.map(serializeComment) });
}

export async function POST(request, { params }) {
  const { storyId } = await params;

  try {
    const { authorName, message } = await request.json();
    const name = String(authorName || "").trim();
    const text = String(message || "").trim();
    if (!name || !text || name.length > 80 || text.length > 1000) {
      return Response.json({ error: "Enter a name and a comment of up to 1,000 characters." }, { status: 400 });
    }

    const payload = await getPayload({ config });
    const story = await payload.findByID({ collection: "stories", id: storyId, overrideAccess: false });
    const comment = await payload.create({
      collection: "story-comments",
      // Use the database ID returned by Payload. Route parameters are strings,
      // while this project's SQLite relationship column uses numeric IDs.
      data: { story: story.id, authorName: name, message: text },
      overrideAccess: false,
    });

    return Response.json({ comment: serializeComment(comment) }, { status: 201 });
  } catch (error) {
    console.error("Failed to create story comment:", error);
    return Response.json({ error: "Could not post this comment." }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  const { storyId } = await params;
  const sessionValue = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const user = getUserFromSession(sessionValue);
  if (user?.role !== "admin") {
    return Response.json({ error: "Only an admin can delete comments." }, { status: 403 });
  }

  try {
    const { commentId } = await request.json();
    const payload = await getPayload({ config });
    const comment = await payload.findByID({
      collection: "story-comments",
      id: commentId,
      overrideAccess: true,
    });
    const commentStoryId = typeof comment.story === "object" ? comment.story.id : comment.story;
    if (String(commentStoryId) !== String(storyId)) {
      return Response.json({ error: "Comment does not belong to this story." }, { status: 400 });
    }

    await payload.delete({ collection: "story-comments", id: comment.id, overrideAccess: true });
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Could not delete this comment." }, { status: 400 });
  }
}
