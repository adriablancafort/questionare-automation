import type { FastifyInstance } from 'fastify';
import { uploadToS3, downloadFromS3 } from '@/storage';
import stream from 'stream';

export default async function questionnairesRoutes(fastify: FastifyInstance) {
	fastify.post('/upload', async (req, reply) => {
		const file = await req.file();
		if (!file) return reply.status(400).send({ error: 'No file uploaded' });

		const key = `questionnaires/${Date.now()}_${file.filename}`;
		return uploadToS3(file, key);
	});

	fastify.get<{ Params: { '*': string } }>('/*', async (req, reply) => {
		try {
			const key = (req.params as any)['*'] as string;
			const { stream: fileStream, contentType, filename } = await downloadFromS3(key);
			
			return reply
				.header('Content-Type', contentType)
				.header('Content-Disposition', `inline; filename="${filename}"`)
				.send(fileStream as stream.Readable);
		} catch {
			return reply.status(404).send({ error: 'File not found' });
		}
	});
}
