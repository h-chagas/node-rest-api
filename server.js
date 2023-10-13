import { createServer } from 'node:http'

const server = createServer(() => {
    console.log('Server created!');
})

server.listen(3333)