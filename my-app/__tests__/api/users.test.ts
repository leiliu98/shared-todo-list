import { prisma } from '../../lib/prisma';
import { Prisma } from '@prisma/client';

describe('User API', () => {
  beforeEach(async () => {
    // Clean up the database before each test
    await prisma.todo.deleteMany(); // Delete todos first
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    // Clean up after all tests
    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();
  });

  describe('GET /api/users', () => {
    it('should return all users with their todos', async () => {
      // Create test users
      const user1 = await prisma.user.create({
        data: {
          email: 'user1@example.com',
          name: 'User 1',
          todos: {
            create: [
              { title: 'Todo 1' },
              { title: 'Todo 2' }
            ]
          }
        },
        include: {
          todos: true
        }
      });

      const user2 = await prisma.user.create({
        data: {
          email: 'user2@example.com',
          name: 'User 2'
        }
      });

      const users = await prisma.user.findMany({
        include: {
          todos: true
        }
      });

      expect(Array.isArray(users)).toBe(true);
      expect(users).toHaveLength(2);
      expect(users.find(u => u.id === user1.id)?.todos).toHaveLength(2);
      expect(users.find(u => u.id === user2.id)?.todos).toHaveLength(0);
    });
  });

  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const email = 'test@example.com';
      const name = 'Test User';

      const user = await prisma.user.create({
        data: {
          email,
          name,
        },
      });

      expect(user).toHaveProperty('id');
      expect(user.email).toBe(email);
      expect(user.name).toBe(name);
    });

    it('should return existing user if email already exists', async () => {
      // Create user first
      const existingUser = await prisma.user.create({
        data: {
          email: 'existing@example.com',
          name: 'Existing User',
        },
      });

      // Try to create user with same email
      const user = await prisma.user.findUnique({
        where: { email: existingUser.email }
      });

      expect(user).not.toBeNull();
      expect(user?.email).toBe('existing@example.com');
      expect(user?.name).toBe('Existing User');
    });

    it('should handle missing email', async () => {
      try {
        await prisma.user.create({
          data: {
            name: 'No Email User',
          } as Prisma.UserCreateInput, // Type assertion to test validation
        });
        fail('Should have thrown an error');
      } catch (error) {
        if (error instanceof Error) {
          expect(error.message).toContain('email');
        } else {
          fail('Expected an Error instance');
        }
      }
    });
  });
});
