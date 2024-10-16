import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserFormComponent } from './user-form/user-form.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home-Users'
    },
    {
        path: 'user-form/:id',
        component: UserFormComponent,
        title: 'Form-Users'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }


];
