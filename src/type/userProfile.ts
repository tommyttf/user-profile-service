import { UserProfile } from '@prisma/client';

export type CreateUserProfileInput = Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateUserProfileInput = Partial<CreateUserProfileInput>;
