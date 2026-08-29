import { getContentByType } from "@/lib/content";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "all";

  const data = await getContentByType(type);

  return Response.json({
    success: true,
    type,
    data,
  });
}
