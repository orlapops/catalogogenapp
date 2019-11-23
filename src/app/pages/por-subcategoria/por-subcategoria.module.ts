import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PorSubcategoriaPage } from './por-subcategoria.page';

const routes: Routes = [
  {
    path: '',
    component: PorSubcategoriaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PorSubcategoriaPage]
})
export class PorSubcategoriaPageModule {}
