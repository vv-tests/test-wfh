import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkipsPage } from './skips.page';

const routes: Routes = [
  {
    path: '',
    component: SkipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkipsPageRoutingModule {}
