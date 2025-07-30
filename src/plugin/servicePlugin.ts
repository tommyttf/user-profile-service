import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { UserProfileService } from '../service/userProfile';

declare module 'fastify' {
  interface FastifyInstance {
    userProfileService: UserProfileService;
  }
}

const servicePlugin: FastifyPluginAsync = fp(async (server) => {
  const userProfileService = new UserProfileService(server.prisma);

  server.decorate('userProfileService', userProfileService);
});

export default servicePlugin;
