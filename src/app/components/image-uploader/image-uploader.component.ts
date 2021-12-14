import { Component, ViewEncapsulation, EventEmitter, Output, ViewChild, ElementRef, Input } from '@angular/core';
import { UploadedImage } from 'src/app/models/uploaded-image';
import { ImageService } from 'src/app/services/image.service';


@Component({
  selector: 'app-image-uploader',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent {
    @Output() uploadedImage = new EventEmitter<UploadedImage>();
    @ViewChild('input') inputFile!: ElementRef;
    @Input() image: any;
    @Input() isEditMode!: boolean;

    constructor(private imageService: ImageService) { }

    fileChange(input: any) {
        const reader = new FileReader();
        let uploadImage = {} as UploadedImage;

        if (input.files.length) {
            const file = input.files[0];
            uploadImage.file = file;

            let emitter = this.uploadedImage;

            reader.onload = (event : any) => {
                let img = new Image();

                img.onload = function (scope) {
                    uploadImage.height = img.height;
                    uploadImage.width = img.width;

                    emitter.emit(uploadImage);
                }

                img.src = <string>event.target.result;
                this.image = reader.result;
            }

            if (this.imageService.validExtension(uploadImage)) {
                reader.readAsDataURL(file);
            } else {
                emitter.emit(uploadImage);
                this.removeImage();
            }
        }
    }

    removeImage():void{
        this.image = '';
    }

    clickFileInput() {
        let el: HTMLElement = this.inputFile.nativeElement;
        el.click();
    }
}