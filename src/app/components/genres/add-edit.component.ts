import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { GenreService } from 'src/app/services/genre.service';



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
        private genreService: GenreService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
    
        this.form = this.formBuilder.group({
            name: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.genreService.getGenreById(this.id)
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
            this.createGenre();
        } else {
            this.updateGenre();
        }
    }

    private createGenre() {
        this.genreService.addGenre(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Genre added', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateGenre() {
        this.genreService.updateGenre(this.form.value, this.id)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Genre updated', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}