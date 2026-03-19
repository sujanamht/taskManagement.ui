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

export class TaskModel {

  taskId: number;
  taskTitle: string;
  description: string;
  projectId: number;
  projTitle: string;
  userId: number;
  userName: string;
  status: string | null;
  priority: string | null;
  createdDate: string;
  dueDate: string;

  constructor() {
    this.taskId = 0;        //pk
    this.taskTitle = '';
    this.description = '';
    this.projectId = 0;     //fk
    this.projTitle = '';
    this.userId = 0;        //fk
    this.userName = '';
    this.status = null;
    this.priority = null;
    this.createdDate = '';
    this.dueDate = '';
  }

}