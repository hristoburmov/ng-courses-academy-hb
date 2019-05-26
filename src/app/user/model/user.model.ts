export default class UserInterface {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public role: string;
  public isBlocked: boolean;

  constructor() {
    this.id = null;
    this.name = null;
    this.email = null;
    this.password = null;
    this.role = null;
    this.isBlocked = false;
  }
}
