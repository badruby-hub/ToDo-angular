import { Routes } from '@angular/router';
import { HomeComponent, ToDoComponent } from './main/main.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'todo', component: ToDoComponent },
];
