import { Injectable } from '@angular/core';
import { UploadedImage } from '../models/uploaded-image';
const maxUploadSize: number = 524288;
const allowedExtensions: string[] = ['png', 'jpg', 'jpeg'];

@Injectable({ providedIn: 'root' })
export class ImageService {

    constructor() { }

    validateImage(image: UploadedImage): string {
        let imageError = '';
        console.log("image file name is " + image.file.name);

        if (!this.validExtension(image)) {
            imageError = "Only .jpg and .png images are allowed";
        } 

        return imageError;
    }

    validExtension(image: UploadedImage): boolean {
        let valid: boolean = false;

        for (let i = 0; i < allowedExtensions.length; i++) {
            if (image.file.name.endsWith(allowedExtensions[i])) {
                valid = true;
                break;
            }
        }

        return valid;
    }
}