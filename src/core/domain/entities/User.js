class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  static create(username, email, password) {
    return new User(null, username, email, password);
  }
}

export default User; 