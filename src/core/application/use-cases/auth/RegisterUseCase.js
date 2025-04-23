class RegisterUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(username, email, password) {
    // Validate input
    if (!username || !email || !password) {
      throw new Error('All fields are required');
    }

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Create new user
    const user = await this.userRepository.create({
      username,
      email,
      password
    });

    return user;
  }
}

export default RegisterUseCase; 