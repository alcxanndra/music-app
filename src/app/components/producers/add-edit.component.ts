import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { ProducerService } from 'src/app/services/producer.service';
import { UploadFileService } from 'src/app/services/file-upload.service';
import { ImageService } from 'src/app/services/image.service';
import { HttpEvent, HttpResponse } from '@angular/common/http';
import { UploadedImage } from 'src/app/models/uploaded-image';

const producerImageUploadUrl: string = 'http://localhost:8080/uploads/producers';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id!: number;
    isAddMode: boolean = false;
    loading = false;
    submitted = false;
    currentFileUpload!: any;
    changeImage = false;
    clicked: boolean = false;
    imageError!: string;
    imageToShow: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private producerService: ProducerService,
        private alertService: AlertService,
        private uploadService: UploadFileService,
        private imageService: ImageService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
    
        this.form = this.formBuilder.group({
            name: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.producerService.getProducerById(this.id)
                .pipe(first())
                .subscribe(x => {this.form.patchValue(x);}
                );
        }

        if (!this.isAddMode) {
            this.producerService.fetchImage(this.id.toString())
            .subscribe(image => this.createImage(image),
            err => this.handleImageRetrievalError(err));
        }
    }

    private handleImageRetrievalError(err: Error) {
        console.error(err);
        this.alertService.error("Problem retrieving profile photo.");
    }

    private createImage(image: Blob) {
        if (image && image.size > 0) {
          let reader = new FileReader();
    
          reader.addEventListener("load", () => {
            this.imageToShow = reader.result;
          }, false);
    
          reader.readAsDataURL(image);
        } 
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
    }

    
    upload() {
        this.clicked = true;

        let uploadUrl = `${producerImageUploadUrl}/${this.id}`;
        this.uploadService.pushFileToStorage(this.currentFileUpload.file, uploadUrl, this.id.toString())
            .subscribe(event => this.handleEvent(event),
                err => this.handleError(err));
    }

    updateOrCreateProducer(){
        if (this.isAddMode) {
            this.createProducer();
        } else {
            this.updateProducer();
        }
    }

    handleEvent(event: HttpEvent<{}>) {
        if (event instanceof HttpResponse) {
            let body = event.body;
            this.handleResponse(body);
        }

        this.currentFileUpload = undefined;
    }

    handleResponse(data: any) {
        console.log(data);
        this.currentFileUpload = undefined;
        this.clicked = false;
    }

    handleError(err: Error) {
      console.error("Error is", err);
      this.imageError = err.message;
      this.clicked = false;
    }

    onUploadedImage(image: UploadedImage) {
        this.imageError = this.imageService.validateImage(image);

        if (!this.imageError) {
            this.currentFileUpload = image;
        }
    }


    private createProducer() {
        this.producerService.addProducer(this.form.value)
            .pipe(first())
            .subscribe({
                next: (producer) => {
                    this.id = producer.id
                    console.log("Producer id: " + this.id);
                    this.upload();
                    this.alertService.success('Producer added', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateProducer() {
        this.producerService.updateProducer(this.form.value, this.id)
            .pipe(first())
            .subscribe({
                next: () => {
                    if (this.currentFileUpload != null){
                        this.upload();
                    }   
                    this.alertService.success('Producer updated', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}