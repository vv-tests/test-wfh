import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'messages',
    pathMatch: 'full',
  },
  {
    path: 'folder/:id',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./my-profile/my-profile.module').then(
        (m) => m.MyProfilePageModule
      ),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((m) => m.SettingsPageModule),
  },
  {
    path: 'skips-likes',
    loadChildren: () =>
      import('./skips-likes/skips-likes.module').then(
        (m) => m.SkipsLikesPageModule
      ),
  },
  {
    path: 'online',
    loadChildren: () =>
      import('./online-users/online-users.module').then(
        (m) => m.OnlineUsersPageModule
      ),
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./messages/messages.module').then((m) => m.MessagesPageModule),
  },
  {
    path: 'likes',
    loadChildren: () => import('./likes/likes.module').then( m => m.LikesPageModule)
  },
  {
    path: 'skips',
    loadChildren: () => import('./skips/skips.module').then( m => m.SkipsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
