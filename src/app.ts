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
server.get('/ping', () => {
  return 'pong\n';
});

export default server;
