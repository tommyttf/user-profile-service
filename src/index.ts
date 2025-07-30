import fastify from 'fastify';
import prismaPlugin from './plugin/prismaPlugin';
import servicePlugin from './plugin/servicePlugin';
import userProfileRoutes from './route/userProfile';

const server = fastify();

// Register Prisma plugin
server.register(prismaPlugin);

// Register Service plugin
server.register(servicePlugin);

// Register User Profile routes
server.register(userProfileRoutes, { prefix: '/v1' });

// Health check
server.get('/ping', async () => {
  return 'pong\n';
});

// Start server
server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
