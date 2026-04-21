import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const R2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = process.env.R2_BUCKET_NAME || 'adventures-wheel';

/**
 * Upload a file buffer to Cloudflare R2.
 * Returns the public URL of the uploaded file.
 */
export async function uploadToR2(
  buffer: Buffer,
  filename: string,
  contentType: string
): Promise<string> {
  const key = `uploads/${Date.now()}-${filename}`;

  await R2.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  // Return public URL using R2 public bucket or custom domain
  const publicUrl = process.env.R2_PUBLIC_URL;
  if (publicUrl) {
    return `${publicUrl}/${key}`;
  }
  // Fallback: use the S3 endpoint (requires public access on bucket)
  return `${process.env.R2_ENDPOINT}/${BUCKET}/${key}`;
}

/**
 * Delete a file from R2 by its key or full URL.
 */
export async function deleteFromR2(urlOrKey: string): Promise<void> {
  let key = urlOrKey;
  // Extract key from full URL
  if (urlOrKey.startsWith('http')) {
    const url = new URL(urlOrKey);
    key = url.pathname.replace(/^\//, '');
    // Remove bucket name prefix if present
    if (key.startsWith(`${BUCKET}/`)) {
      key = key.replace(`${BUCKET}/`, '');
    }
  }

  await R2.send(
    new DeleteObjectCommand({
      Bucket: BUCKET,
      Key: key,
    })
  );
}

export { R2, BUCKET };
