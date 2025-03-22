import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewPageComponent } from './new-page/new-page.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new', component: NewPageComponent },
];
