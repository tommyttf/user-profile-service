import request from 'supertest';
import { describe, it, expect, afterAll, afterEach, beforeAll } from 'vitest';
import { PrismaClient } from '@prisma/client';

import server from '../app';

describe('User Profile', async () => {
  const prisma = new PrismaClient();

  afterEach(async () => {
    await prisma.userProfile.deleteMany();
  });

  afterAll(async () => {
    await Promise.all([server.close(), prisma.$disconnect()]);
  });

  beforeAll(async () => {
    await Promise.all([server.ready(), prisma.$connect()]);
  });

  it('should create a user profile', async () => {
    // Act
    const { status, body } = await request(server.server).post('/v1/profile').send({
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '2000-01-01',
    });

    // Assert
    expect(status).toBe(201);

    const userProfile = await prisma.userProfile.findUnique({ where: { id: body.id } });
    expect(userProfile).toBeDefined();
    expect(userProfile?.dateOfBirth).toEqual(new Date(body.dateOfBirth));
    expect(userProfile?.firstName).toEqual(body.firstName);
    expect(userProfile?.lastName).toEqual(body.lastName);
  });

  it('should update a user profile', async () => {
    // Arrange
    const { id } = await prisma.userProfile.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: new Date('2000-01-01'),
      },
    });
    const firstName = 'Jane';
    const lastName = 'Green';
    const dateOfBirth = '2012-12-12';

    // Act
    const { status, body } = await request(server.server).put(`/v1/profile/${id}`).send({
      firstName,
      lastName,
      dateOfBirth,
    });

    // Assert
    expect(status).toBe(200);
    expect(body.id).toEqual(id);
    expect(body.firstName).toEqual(firstName);
    expect(body.lastName).toEqual(lastName);
    expect(body.dateOfBirth).toEqual(dateOfBirth);
  });
});
