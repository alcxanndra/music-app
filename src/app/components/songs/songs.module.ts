import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SongsRoutingModule } from './songs-routing.module';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list.component';
import { AddEditComponent } from './add-edit.component';
import { ImageUploaderModule } from '../image-uploader/image-uploader.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SongsRoutingModule,
        ImageUploaderModule
    ],
    declarations: [
        LayoutComponent,
        ListComponent,
        AddEditComponent
    ]
})
export class SongsModule { }