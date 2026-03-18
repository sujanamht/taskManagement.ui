import { Component, inject, signal } from '@angular/core';
import { ProjectModel } from '../../models/project.model';
import { Master } from '../../services/master';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project',
  imports: [CommonModule, FormsModule],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
  newProject: ProjectModel = new ProjectModel();
  masterService = inject(Master);
  projectList = signal<ProjectModel[]>([]);
  isEditMode = false;

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.masterService.getAllProjects().subscribe({
      next: (result: any) => {
        this.projectList.set(result);
      },
    });
  }

  saveProject() {
    debugger;
    this.newProject.userId = 1; // Assuming userId is 1 for now, replace with actual user ID as needed

    if (this.isEditMode) {
      //update
      this.masterService.updateProject(this.newProject).subscribe(() => {
        alert('Project updated successfully!');
        this.getAllProjects(); // refresh project list after update
        this.resetForm(); // reset form after update
      });
    } 
    else {
      //save
      this.masterService.saveProject(this.newProject).subscribe({
        next: (result: any) => {
          debugger;
          alert('Project saved successfully!');
          this.getAllProjects();
          console.log('Project saved successfully!');
          this.resetForm();
        },
        error: (error) => {
          alert('Error saving project: ' + error.message);
          console.error('Error saving project:', error);
        },
      });
    }
  }

  statusOptions = [
    { value: 'Todo', label: 'To Do' },
    { value: 'InProgress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
  ];

  editProject(data: ProjectModel) {
    const strData = JSON.stringify(data);
    const parseData = JSON.parse(strData);
    this.newProject = parseData;
    this.isEditMode = true; // Set edit mode when editing a project
  }

  deleteProject(project: ProjectModel) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.masterService.deleteProject(project.projectId.toString()).subscribe({
        next: (result: any) => {
          alert('Project deleted successfully!');
          this.getAllProjects();
        },
        error: (error) => {
          alert('Error deleting project: ' + error.message);
          console.error('Error deleting project:', error);
        },
      });
    }
  }

  resetForm() {
    this.newProject = new ProjectModel();
    this.isEditMode = false; // Reset edit mode when form is reset
  }
}
