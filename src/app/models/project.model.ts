export class ProjectModel {

  projectId: number;
  projTitle: string;
  description: string;
  userId: number;
  userName: string;
  status: string | null;
  createdAt: string;
  startDate: string;
  endDate: string;

  constructor() {
    this.projectId = 0;     //pk
    this.projTitle = '';
    this.description = '';
    this.userId = 0;        //fk
    this.userName = '';
    this.status = null;
    this.createdAt = '';
    this.startDate = '';
    this.endDate = '';
  }

}