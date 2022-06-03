import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SkipsLikesPage } from './skips-likes.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'likes',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SkipsLikesPage,
    children: [
      {
        path: '',
        children: [
          {
            path: 'likes',
            loadChildren: () =>
              import('./../likes/likes.module').then((m) => m.LikesPageModule),
          },
          {
            path: 'skips',
            loadChildren: () =>
              import('./../skips/skips.module').then((m) => m.SkipsPageModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SkipsLikesPageRoutingModule {}
