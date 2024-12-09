import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardItemComponent } from './card-item/card-item.component';
import { ImagsComponent } from './imags/imags.component';



@NgModule({
  declarations: [
    CardItemComponent,
    ImagsComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CardItemComponent,
    ImagsComponent
  ]
})
export class ComponentsModule { }
