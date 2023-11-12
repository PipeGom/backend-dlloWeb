class User {
  constructor({id, name, email, password}) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  valid() {
    if (!this.id || this.id?.toString().length == 0) {
      throw { status: 400, message: "El id es obligatorio" };
    }
    if (!this.name || this.name?.toString().length == 0) {
      throw { status: 400, message: "El name es obligatorio" };
    }
    if (!this.email || this.email?.toString().length == 0) {
      throw { status: 400, message: "El email es obligatorio" };
    }
    if (!this.password || this.password?.toString().length == 0) {
      throw { status: 400, message: "El password es obligatorio" };
    }
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}

module.exports = User;
