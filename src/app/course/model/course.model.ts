export default class Course {
  public id: number;
  public title: string;
  public description: string;
  public rating: string;

  constructor() {
    this.id = null;
    this.title = null;
    this.description = null;
    this.rating = '0.0';
  }
}
