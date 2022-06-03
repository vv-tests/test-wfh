import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkipsLikesPageRoutingModule } from './skips-likes-routing.module';

import { SkipsLikesPage } from './skips-likes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkipsLikesPageRoutingModule
  ],
  declarations: [SkipsLikesPage]
})
export class SkipsLikesPageModule {}
