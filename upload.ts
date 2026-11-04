export type UploadResult = {
  url: string;
  pathname: string;
  downloadUrl?: string;
  size: number;
  contentType: string;
  fileName: string;
};

/**
 * Upload a file to Vercel Blob via the /api/upload route.
 * Returns metadata that should be stored in the database.
 */
export async function uploadFile(
  file: File,
  folder: "plans" | "decks" | "logos" | "certificates" | "media" = "uploads"
): Promise<UploadResult> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Upload failed");
  }

  return res.json();
}
