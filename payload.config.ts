import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const authenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor(),
  collections: [
    {
      slug: "users",
      auth: true,
      admin: { useAsTitle: "email" },
      fields: [{ name: "name", type: "text" }],
    },
    {
      slug: "photo-gallery",
      admin: { useAsTitle: "title" },
      access: {
        read: () => true,
        create: authenticated,
        update: authenticated,
        delete: authenticated,
      },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "location", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "image", type: "upload", relationTo: "media", required: true },
        {
          name: "tags",
          type: "array",
          fields: [{ name: "tag", type: "text", required: true }],
        },
      ],
    },
    {
      slug: "stories",
      admin: { useAsTitle: "title" },
      access: {
        read: () => true,
        create: authenticated,
        update: authenticated,
        delete: authenticated,
      },
      fields: [
        { name: "title", type: "text", required: true },
        { name: "slug", type: "text", unique: true, required: true },
        { name: "category", type: "text", required: true },
        { name: "readTime", type: "text", required: true },
        { name: "excerpt", type: "textarea", required: true },
        { name: "content", type: "richText", required: true },
      ],
    },
    {
      slug: "media",
      access: {
        read: () => true,
        create: authenticated,
        update: authenticated,
        delete: authenticated,
      },
      upload: {
        staticDir: path.resolve(dirname, "media"),
        mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
        imageSizes: [
          { name: "card", width: 900, height: 675, position: "centre" },
          { name: "thumbnail", width: 400, height: 300, position: "centre" },
        ],
      },
      fields: [{ name: "alt", type: "text", required: true }],
    },
  ],
  secret: process.env.PAYLOAD_SECRET || "development-payload-secret-change-before-production",
  db: sqliteAdapter({
    wal: true,
    client: { url: process.env.DATABASE_URI || "file:./payload.db" },
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
