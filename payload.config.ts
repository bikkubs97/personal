import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const authenticated = ({ req }: { req: { user?: unknown } }) => Boolean(req.user);

// Keep this plugin registered in every environment. Its disabled mode falls
// back to local storage without a token, while ensuring Payload generates the
// same import map used by production's Vercel Blob upload component.
const storagePlugins = [
  vercelBlobStorage({
    alwaysInsertFields: true,
    collections: {
      media: true,
    },
    token: process.env.BLOB_READ_WRITE_TOKEN,
  }),
];

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  plugins: storagePlugins,
  editor: lexicalEditor(),
  sharp,
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
        {
          name: "likes",
          type: "number",
          defaultValue: 0,
          min: 0,
          admin: { readOnly: true },
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
      slug: "story-comments",
      admin: {
        useAsTitle: "authorName",
        defaultColumns: ["authorName", "story", "createdAt"],
      },
      access: {
        read: () => true,
        create: () => true,
        update: authenticated,
        delete: authenticated,
      },
      fields: [
        {
          name: "story",
          type: "relationship",
          relationTo: "stories",
          required: true,
        },
        { name: "authorName", type: "text", required: true },
        { name: "message", type: "textarea", required: true },
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
  secret: process.env.PAYLOAD_SECRET!,
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI!,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
    // This database already contains production content. Apply schema changes
    // through reviewed migrations instead of pushing DDL on every dev reload.
    push: false,
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
