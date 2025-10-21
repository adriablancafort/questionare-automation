import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import type { MultipartFile } from '@fastify/multipart';
import 'dotenv/config';

const s3 = new S3Client({
	forcePathStyle: true,
	region: process.env.S3_REGION,
	endpoint: process.env.S3_ENDPOINT,
	credentials: {
		accessKeyId: process.env.S3_ACCESS_KEY_ID!,
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
	},
});

const bucket = process.env.S3_BUCKET!;

export async function uploadToS3(file: MultipartFile, key: string) {
    await s3.send(new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file.file,
        ContentType: file.mimetype,
    }));
    
    return { key };
}

export async function downloadFromS3(key: string) {
    const result = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
    
    return {
        stream: result.Body,
        contentType: result.ContentType || 'application/octet-stream',
        filename: key.split('/').pop() || 'download',
    };
}
