import { head, del } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Proxy / metadata endpoint for private blobs.
 * In production, protect this route with role checks (Judge, Reviewer, Admin).
 */
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    // Uncomment for production:
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    const blob = await head(url);

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      size: blob.size,
      contentType: blob.contentType,
      uploadedAt: blob.uploadedAt,
    });
  } catch (error) {
    console.error("File metadata error:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    // Restrict delete to admins in production
    // if (!session || !["SUPER_ADMIN", "CHAMPIONSHIP_DIRECTOR"].includes((session.user as any).role)) {
    //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    // }

    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
    }

    await del(url);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
