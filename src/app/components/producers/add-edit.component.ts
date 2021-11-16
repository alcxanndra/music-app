import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { ProducerService } from 'src/app/services/producer.service';


@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id!: number;
    isAddMode: boolean = false;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private producerService: ProducerService,
        private alertService: AlertService
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
        if (this.isAddMode) {
            this.createProducer();
        } else {
            this.updateProducer();
        }
    }

    private createProducer() {
        this.producerService.addProducer(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
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