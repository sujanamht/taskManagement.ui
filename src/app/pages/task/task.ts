import { Component, OnInit, signal, inject } from '@angular/core';
import { Master } from '../../services/master';
import { ProjectModel, TaskModel } from '../../models/project.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task implements OnInit {
  newTask: TaskModel = new TaskModel();
  masterService = inject(Master);
  taskList = signal<TaskModel[]>([]);
  projectList = signal<ProjectModel[]>([]);
  isEditMode = false;

  ngOnInit() {
    // Initialization logic if needed
    this.getAllTasks();

  }

  getAllTasks() {
    this.masterService.getAllTasks().subscribe({
      next: (result: any) => {
        console.log('Tasks retrieved successfully:', result);
        this.taskList.set(result);
            this.getAllProjects();
      },
      error: (error) => {
        console.error('Error retrieving tasks:', error);
      },
    });
  }

  // need??
  getAllProjects() {
    this.masterService.getAllProjects().subscribe({
      next: (result: any) => {
        console.log('Projects retrieved successfully:', result);
        this.projectList.set(result);
      },
      error: (error) => {
        console.error('Error retrieving projects:', error);
      },
    });
  }

  onSave() {
    this.newTask.userId = 1; // Assuming userId is 1 for now, replace with actual user ID as needed
    console.log('Sending task:', this.newTask);

    if (this.isEditMode) {
      //update
      this.masterService.updateTask(this.newTask).subscribe(() => {
        alert('Task updated successfully!');
        this.getAllTasks(); // refresh task list after update
        this.resetForm(); // reset form after update
      });
    } else {
      //save
      debugger;
      this.masterService.saveTask(this.newTask).subscribe({
        next: (result: any) => {
          console.log('Saved successfully', result);
          alert('Task saved successfully!');
          this.getAllTasks();
          console.log('Task saved successfully!');
          this.resetForm();
        },
        error: (error) => {
          console.error('Full error:', error);
          console.error('Backend error body:', error.error);
          alert('Error saving task: ' + JSON.stringify(error.error));
        },
      });
    }
  }

  statusOptions = [
    { value: 'Todo', label: 'To Do' },
    { value: 'InProgress', label: 'In Progress' },
    { value: 'Completed', label: 'Completed' },
  ];

  priorityOptions = ['Low', 'Medium', 'High'];

  onEdit(data: TaskModel) {
    debugger;
    const strData = JSON.stringify(data);
    const parseData = JSON.parse(strData);
    this.newTask = parseData;
    this.isEditMode = true;
  }

  onDelete(taskId: number) {
    if (confirm('Are you sure you want to delete this task?')) {
      this.masterService.deleteTask(taskId.toString()).subscribe({
        next: (result: any) => {
          alert('Task deleted successfully!');
          this.getAllTasks(); // refresh task list after deletion
        },
        error: (error) => {
          alert('Error deleting task: ' + error.message);
          console.error('Error deleting task:', error);
        },
      });
    }
  }

  resetForm() {
    this.newTask = new TaskModel();
    this.isEditMode = false; // Reset edit mode when form is reset
  }
}
