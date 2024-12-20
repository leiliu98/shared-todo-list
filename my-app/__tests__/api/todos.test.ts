import { prisma } from '../../lib/prisma';

describe('Todo API', () => {
  let testUser: any;

  beforeAll(async () => {
    // Create a test user
    testUser = await prisma.user.create({
      data: {
        email: 'todotest@example.com',
        name: 'Todo Test User',
      },
    });
  });

  beforeEach(async () => {
    // Clean up todos before each test
    await prisma.todo.deleteMany();
  });

  afterAll(async () => {
    // Clean up everything after tests
    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();
  });

  it('should create a new todo', async () => {
    const todo = await prisma.todo.create({
      data: {
        title: 'Test Todo',
        description: 'Test Description',
        userId: testUser.id,
      },
    });

    expect(todo).toHaveProperty('id');
    expect(todo.title).toBe('Test Todo');
    expect(todo.description).toBe('Test Description');
    expect(todo.userId).toBe(testUser.id);
  });

  it('should set default priority to MEDIUM', async () => {
    const todo = await prisma.todo.create({
      data: {
        title: 'Priority Test Todo',
        userId: testUser.id,
      },
    });

    expect(todo.priority).toBe('MEDIUM');
  });

  it('should fail when title is missing', async () => {
    try {
      await prisma.todo.create({
        data: {
          userId: testUser.id,
        } as any,
      });
      fail('Should have thrown an error');
    } catch (error: any) {
      expect(error.message).toContain('title');
    }
  });

  it('should delete a todo', async () => {
    // Create a todo first
    const todo = await prisma.todo.create({
      data: {
        title: 'Todo to Delete',
        userId: testUser.id,
      },
    });

    // Delete the todo
    await prisma.todo.delete({
      where: {
        id: todo.id,
      },
    });

    // Try to find the deleted todo
    const deletedTodo = await prisma.todo.findUnique({
      where: {
        id: todo.id,
      },
    });

    expect(deletedTodo).toBeNull();
  });

  it('should update a todo', async () => {
    // Create a todo
    const todo = await prisma.todo.create({
      data: {
        title: 'Original Title',
        description: 'Original Description',
        userId: testUser.id,
      },
    });

    // Update the todo
    const updatedTodo = await prisma.todo.update({
      where: {
        id: todo.id,
      },
      data: {
        title: 'Updated Title',
        description: 'Updated Description',
        priority: 'HIGH',
      },
    });

    expect(updatedTodo.title).toBe('Updated Title');
    expect(updatedTodo.description).toBe('Updated Description');
    expect(updatedTodo.priority).toBe('HIGH');
  });

  it('should update todo due date', async () => {
    // Create a todo
    const todo = await prisma.todo.create({
      data: {
        title: 'Todo with Due Date',
        userId: testUser.id,
      },
    });

    // Set a due date
    const dueDate = new Date('2024-12-31');
    const updatedTodo = await prisma.todo.update({
      where: {
        id: todo.id,
      },
      data: {
        dueDate,
      },
    });

    expect(updatedTodo.dueDate?.toISOString()).toBe(dueDate.toISOString());

    // Remove due date
    const removedDueDate = await prisma.todo.update({
      where: {
        id: todo.id,
      },
      data: {
        dueDate: null,
      },
    });

    expect(removedDueDate.dueDate).toBeNull();
  });

  it('should get all todos for a user', async () => {
    // Create multiple todos sequentially to ensure both are created
    const todo1 = await prisma.todo.create({
      data: {
        title: 'Todo 1',
        userId: testUser.id,
      },
    });

    const todo2 = await prisma.todo.create({
      data: {
        title: 'Todo 2',
        userId: testUser.id,
      },
    });

    // Get all todos for the user
    const todos = await prisma.todo.findMany({
      where: {
        userId: testUser.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    expect(todos).toHaveLength(2);
    expect(todos[0].id).toBe(todo1.id);
    expect(todos[1].id).toBe(todo2.id);
  });
});
