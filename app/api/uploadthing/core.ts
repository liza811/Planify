import { currentUser } from "@/lib/current-user";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();
const handleAuth = async () => {
  const userId = await currentUser();
  if (!userId) throw new Error("Unauthorized");
  return { userId: userId.id };
};

export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),

  messageFile: f(["image", "pdf"])
    .middleware(() => handleAuth())

    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
