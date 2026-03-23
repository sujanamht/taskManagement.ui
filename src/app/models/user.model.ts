export class UserModel {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: number | string;
  createdDate?: string;
  updatedDate?: string;

  constructor() {
    this.userId = 0; // Optional, can be set when creating a new user
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
    this.role = 0; // Default role, can be updated as needed
  }
}
