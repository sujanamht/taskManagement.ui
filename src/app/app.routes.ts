import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Header } from './pages/header/header';
import { Task } from './pages/task/task';
import { User } from './pages/user/user';
import { Project } from './pages/project/project';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'login',
    //     pathMatch: 'full'
    // },
    {
        path: 'login',
        component: Login

    },

    
        {
        path:'',
        component: Header,
        children:[
            {
                path: 'dashboard',
                component: Dashboard,
                data: { title: 'Dashboard' }

            },
            {
                path: 'task',
                component: Task, 
                data: { title: 'Tasks' }
            },
            {
                path: 'project',
                component: Project, 
                data: { title: 'Project' }
            },
            {
                path: 'user',
                component: User, 
                data: { title: 'Users' }
            },
        ]
        }
    ];