import { FastifyPluginAsync } from 'fastify';
import { CreateUserProfileInput, UpdateUserProfileInput } from '../type/userProfile';

const UserProfileResponseProperties = {
  id: { type: 'string' },
  firstName: { type: 'string' },
  lastName: { type: 'string' },
  dateOfBirth: { type: 'string', format: 'date' },
  createdAt: { type: 'string', format: 'date-time' },
};

const UserProfileUpsertProperties = {
  firstName: { type: 'string', minLength: 1 },
  lastName: { type: 'string', minLength: 1 },
  dateOfBirth: { type: 'string', format: 'date' },
};

const userProfileRoutes: FastifyPluginAsync = async (fastify) => {
  const { userProfileService } = fastify;

  // Retrieve a single profile
  fastify.get<{ Params: { id: string } }>('/profile/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      response: {
        200: {
          type: 'object',
          properties: UserProfileResponseProperties,
        },
      },
    },
    handler: async (request, reply) => {
      const profile = await userProfileService.getProfileById(request.params.id);
      return reply.status(200).send(profile);
    },
  });

  // Retrieve all profiles
  fastify.get('/profile', {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: UserProfileResponseProperties,
          },
        },
      },
    },
    handler: async (request, reply) => {
      const profiles = await userProfileService.getAllProfiles();
      return reply.status(200).send(profiles);
    },
  });

  // Create profile
  fastify.post<{ Body: CreateUserProfileInput }>('/profile', {
    schema: {
      body: {
        type: 'object',
        properties: UserProfileUpsertProperties,
        required: ['firstName', 'lastName', 'dateOfBirth'],
      },
      response: {
        201: {
          type: 'object',
          properties: UserProfileResponseProperties,
        },
      },
    },
    handler: async (request, reply) => {
      const data = request.body;
      const profile = await userProfileService.createProfile({
        ...data,
        dateOfBirth: new Date(data.dateOfBirth),
      });
      return reply.status(201).send({
        ...profile,
        dateOfBirth: profile.dateOfBirth.toISOString().split('T')[0],
        createdAt: profile.createdAt.toISOString(),
      });
    },
  });

  // Update profile
  fastify.put<{ Params: { id: string }; Body: UpdateUserProfileInput }>('/profile/:id', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
      },
      body: {
        type: 'object',
        properties: UserProfileUpsertProperties,
      },
      response: {
        200: {
          type: 'object',
          properties: UserProfileResponseProperties,
        },
      },
    },
    handler: async (request, reply) => {
      const data = request.body;
      const profile = await userProfileService.updateProfile(request.params.id, {
        ...data,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : undefined,
      });
      return reply.status(200).send({
        ...profile,
        dateOfBirth: profile.dateOfBirth.toISOString().split('T')[0],
        createdAt: profile.createdAt.toISOString(),
      });
    },
  });
};

export default userProfileRoutes;
