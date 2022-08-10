import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SaveComponent} from '../app/save/save.component';

const routes: Routes = [
  {path: 'save', component:SaveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
