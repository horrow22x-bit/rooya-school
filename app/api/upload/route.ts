import { NextResponse } from "next/server";
import crypto from "crypto";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "لم يتم اختيار صورة" },
        { status: 400 }
      );
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: "إعدادات Cloudinary غير موجودة" },
        { status: 500 }
      );
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const signature = crypto
      .createHash("sha1")
      .update(`timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    const uploadData = new FormData();

    uploadData.append("file", file);
    uploadData.append("api_key", apiKey);
    uploadData.append("timestamp", timestamp.toString());
    uploadData.append("signature", signature);

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: uploadData,
      }
    );

    const result = await cloudinaryResponse.json();

    if (!cloudinaryResponse.ok) {
      console.error("Cloudinary error:", result);

      return NextResponse.json(
        {
          error:
            result?.error?.message ||
            "فشل رفع الصورة إلى Cloudinary",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { error: "حدث خطأ أثناء رفع الصورة" },
      { status: 500 }
    );
  }
}