import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Project } from '../pages/project/project';
import { ProjectModel } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class Master {
  apiUrl = 'https://localhost:7022/api';
  http = inject(HttpClient);

  getAllProjects() {
    return this.http.get(this.apiUrl + '/projects');
  }

  getProjectById(id: string) {
    return this.http.get(this.apiUrl + '/projects/' + id);
  }

  saveProject(obj: ProjectModel) {
    return this.http.post(this.apiUrl + '/projects', obj);
  }

  updateProject(project: ProjectModel) {
    return this.http.put(this.apiUrl + '/projects/' + project.projectId, project);
  }

  deleteProject(id: string) {
    return this.http.delete(this.apiUrl + '/projects/' + id);
  }

  saveTask(task: any) {
    return this.http.post(this.apiUrl + '/tasks', task);
  }

  getAllTasks() {
    return this.http.get(this.apiUrl + '/tasks');
  }
}
