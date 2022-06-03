import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SkipsPageRoutingModule } from './skips-routing.module';

import { SkipsPage } from './skips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SkipsPageRoutingModule
  ],
  declarations: [SkipsPage]
})
export class SkipsPageModule {}
