import { CreateUserProfileInput, UpdateUserProfileInput } from '../type/userProfile';
import { PrismaClient, UserProfile } from '@prisma/client';

export class UserProfileService {
  constructor(private readonly prisma: PrismaClient) {}

  async getProfileById(id: string): Promise<UserProfile | null> {
    return this.prisma.userProfile.findUnique({ where: { id } });
  }

  async getAllProfiles(): Promise<UserProfile[]> {
    return this.prisma.userProfile.findMany();
  }

  async createProfile(data: CreateUserProfileInput): Promise<UserProfile> {
    return this.prisma.userProfile.create({ data });
  }

  async updateProfile(id: string, data: UpdateUserProfileInput): Promise<UserProfile> {
    return this.prisma.userProfile.update({ where: { id }, data });
  }
}
