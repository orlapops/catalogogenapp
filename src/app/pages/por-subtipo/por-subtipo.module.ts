import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { PorSubtipoPage } from './por-subtipopage';

const routes: Routes = [
  {
    path: '',
    component: PorSubtipoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PorSubtipoPage]
})
export class PorSubtipoPageModule {}
