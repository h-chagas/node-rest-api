import { fastify } from 'fastify'
//import { DatabaseMemory } from './db-memory.js' 
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();

// const database = new DatabaseMemory();
const database = new DatabasePostgres();

//Routes
server.post('/videos', async (request, reply) => {
    const {title, description, duration} = request.body;

    await database.create({
        title: title,
        description: description,
        duration: duration
    })
    return reply.status(201).send()
});


server.get('/videos', async (request) => {
    const search = request.query.search //this is optional... ?search=

    const videos = await database.list(search);
    return videos
});

server.get('/videos/:id', async (request, reply) => {
    let video;
    const videoId = request.params.id;
    const videos = await database.list(search);
    
    for (let i = 0; i < videos.length; i++) {
        if (videos.length[i].id == videoId) {
            video = videos.length[i];
            break;
        }

    }

    if (video) {
        return reply.status(200).send(video)
    } else {
        const emptyResponse = {};
        reply.status(404).send(emptyResponse)
    }
});



server.put('/videos/:id', async (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body;

    await database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
});


server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id;

    await database.delete(videoId);

    return reply.status(204).send();
});





server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})



