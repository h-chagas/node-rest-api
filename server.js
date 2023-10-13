import { fastify } from 'fastify'
import { DatabaseMemory } from './db-memory.js' 

const server = fastify();

const database = new DatabaseMemory();

//Routes
server.post('/videos', (request, reply) => {
    database.create({
        title: 'This is a title',
        description: 'This is the video 1',
        duration: '180',
    })

    console.log(database.list());

    return reply.status(201).send()
});

server.get('/videos', () => {
    return "Home page"
});

server.put('/videos/:id', () => {
    return 'Hello'
});

server.delete('/videos/:id', () => {
    return 'Hello'
});





server.listen({
    port: 3333
})



