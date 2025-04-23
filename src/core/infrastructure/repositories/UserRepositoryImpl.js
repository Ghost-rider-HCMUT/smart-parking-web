import UserRepository from '../../domain/repositories/UserRepository';
import User from '../../domain/entities/User';

class UserRepositoryImpl extends UserRepository {
  constructor() {
    super();
    this.users = new Map();
    
    // Add sample users
    const sampleUsers = [
      {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
        password: 'admin123'
      },
      {
        id: '2',
        username: 'user1',
        email: 'user1@example.com',
        password: 'user123'
      },
      {
        id: '3',
        username: 'test',
        email: 'test@example.com',
        password: 'test123'
      }
    ];

    sampleUsers.forEach(user => {
      this.users.set(user.id, new User(user.id, user.username, user.email, user.password));
    });
  }

  async create(userData) {
    const user = new User(
      Date.now().toString(),
      userData.username,
      userData.email,
      userData.password
    );
    this.users.set(user.id, user);
    return user;
  }

  async findByEmail(email) {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async findById(id) {
    return this.users.get(id);
  }
}

export default UserRepositoryImpl; 