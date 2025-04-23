class LoginUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(email, password) {
    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    if (user.password !== password) {
      throw new Error('Invalid credentials');
    }

    return user;
  }
}

export default LoginUseCase; 