import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import cors from '@fastify/cors';
import { z } from 'zod';
import { randomUUID } from 'crypto';

const port = process.env.PORT || 3333;

const prisma = new PrismaClient({
    log: ['query']
});

const bootstrap = async () => {
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: true
    });
    
    fastify.get('/polls/count', async () => {

        const count = await prisma.poll.count();                

        return { count };
    });

    fastify.post('/polls', async (request, response) => {
        const createpollBody = z.object({
            title: z.string(),
        });

        const { title } = createpollBody.parse(request.body);
        const code = await randomUUID().toUpperCase();

        await prisma.poll.create({
            data:{
                title,
                code,
            }
        });

        return response.status(201).send({ code });
    });
    
    fastify.get('/users/count', async () => {
        const count = await prisma.user.count();        
        return { count };
    });

    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count();
        return { count };
    });

    await fastify.listen({ port, host: '0.0.0.0' });
}

bootstrap();

