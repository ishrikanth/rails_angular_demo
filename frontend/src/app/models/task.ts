export class Task {
  id: number;
  title: string;
  description: string;
  status: string;

  constructor(obj: any){
    this.id = obj && obj.id || null;
    this.title = obj && obj.title || null;
    this.description = obj.description || null;
    this.description = obj.description || null;
    this.status = obj.status || "backlog";
  }
}
