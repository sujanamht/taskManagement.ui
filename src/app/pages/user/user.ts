import { Component, OnInit, signal, inject } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';

@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User implements OnInit {
newUser: UserModel  = new UserModel();
isEditMode = false;
masterService = inject(Master);
userList = signal<UserModel[]>([]);
filterRole: string | null = null;
searchText = '';

ngOnInit() {
  // Initialization logic if needed
  this.getAllUsers();
}

getAllUsers() {
  this.masterService.getAllUsers().subscribe({
   next: (result: any) => {
        console.log('Users retrieved successfully:', result);
        this.userList.set(result);
        this.resetForm(); // Clear form after fetching users
      },
      error: (error) => {
        console.error('Error retrieving users:', error);
      },
    });
}

roleOptions = [ 'Admin', 'Manager', 'Employee' ];

onSave() {
  console.log('Saving user:', this.newUser);

  if (this.isEditMode) {
    // Update existing user
    this.masterService.updateUser(this.newUser).subscribe(() => {
      alert('User updated successfully!');
      this.getAllUsers(); // Refresh user list after update
      this.resetForm(); // Reset form after update
    });
  } else {
    // Create new user
    this.masterService.saveUser(this.newUser).subscribe( {
      next: (result: any) => {
        alert('User created successfully!');
        this.getAllUsers(); // Refresh user list after creation
        this.resetForm(); // Reset form after creation
      },
      error: (error) => {
        console.error('Error creating user:', error);
      },  
    });
  }
}



onEdit(user: UserModel) {
  this.newUser = { ...user };
  this.isEditMode = true;
}


onSearch() {
  // Implement search functionality here, e.g., filter userList based on searchText
}


filteredUserList() {
  // Implement filter functionality here, e.g., filter userList based on filterRole
}

onDelete(userId: number) {
  if (confirm('Are you sure you want to delete this user?')) {
    this.masterService.deleteUser(userId.toString()).subscribe({
      next: () => {
        alert('User deleted successfully!');
        this.getAllUsers(); // Refresh user list after deletion
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      },
    });
  }
}

resetForm() {
  this.newUser = new UserModel();
  this.isEditMode = false;
}

}
