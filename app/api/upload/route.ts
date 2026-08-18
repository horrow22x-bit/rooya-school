import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { Buffer } from "node:buffer";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          error: "لم يتم اختيار صورة.",
        },
        { status: 400 }
      );
    }

    // الحد الأقصى 15 ميغابايت
    const maxSize = 15 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: "حجم الصورة كبير جدًا. الحد الأقصى 15 ميغابايت.",
        },
        { status: 400 }
      );
    }

    // التأكد أن الملف صورة
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          error: "الملف المختار ليس صورة.",
        },
        { status: 400 }
      );
    }

    console.log("Upload started:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "roya-school",
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(buffer);
    });

    console.log("Upload successful:", result.secure_url);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          error?.error?.message ||
          "حدث خطأ أثناء رفع الصورة إلى Cloudinary.",
      },
      { status: 500 }
    );
  }
}