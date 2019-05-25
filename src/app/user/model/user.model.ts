export default class UserInterface {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public isBlocked: boolean;

  constructor(id: number = null, name: string = '', email: string = '', password: string = '', role: string = '', isBlocked: boolean = false) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.isBlocked = isBlocked;
  }
}
