import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Album } from 'src/app/entities/album';
import { Artist } from 'src/app/entities/artist';
import { Genre } from 'src/app/entities/genre';
import { Producer } from 'src/app/entities/producer';
import { SongDetails } from 'src/app/entities/songdetails';
import { AlbumService } from 'src/app/services/album.service';
import { AlertService } from 'src/app/services/alert.service';
import { ArtistService } from 'src/app/services/artist.service';
import { GenreService } from 'src/app/services/genre.service';
import { ProducerService } from 'src/app/services/producer.service';
import { SongService } from 'src/app/services/song.service';
import { SongdetailsService } from 'src/app/services/songdetails.service';



@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id!: number;
    isAddMode: boolean = false;
    loading = false;
    submitted = false;
    artistList!: Artist[];
    albumList!: Album[];
    genreList!: Genre[];
    producerList!: Producer[];
    currentGenre!: string;
    currentProducer!: string;
    currentAlbum!: string;
    currentArtist!: string;
    songDetails!: SongDetails;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private songService: SongService,
        private producerService: ProducerService,
        private songDetailsService: SongdetailsService,
        private genreService: GenreService,
        private artistService: ArtistService,
        private albumService: AlbumService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        this.form = this.formBuilder.group({
            title: ['', Validators.required],
            artist: ['', Validators.required],
            genre: ['', Validators.required],
            producer: ['', Validators.required],
            album: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.songService.getSongById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.form.patchValue(x);
                }
                );
        }

        this.artistService.getAllArtists()
            .pipe(first())
            .subscribe(artists => {
                this.artistList = Object.values(Object.values(artists)[0])[0]
            });

        this.albumService.getAllAlbums()
            .pipe(first())
            .subscribe(albums => {
                this.albumList = Object.values(Object.values(albums)[0])[0]
            });

        this.producerService.getAllProducers()
            .pipe(first())
            .subscribe(producers => {
                this.producerList = Object.values(Object.values(producers)[0])[0]
            });

        this.genreService.getAllGenres()
            .pipe(first())
            .subscribe(genres => {
                this.genreList = Object.values(Object.values(genres)[0])[0]
            });

        this.songDetailsService.getSongDetailsBySongId(this.id)
            .pipe(first())
            .subscribe(songDetails => {
                this.songDetails = songDetails;
                console.log(this.songDetails);
                console.log(this.songDetails.genre);
                console.log(this.songDetails.producer);
                this.currentArtist = this.songDetails.song.artist.name;
                this.currentGenre = this.songDetails.genre.name;
                this.currentProducer = this.songDetails.producer.name;
                this.currentAlbum = this.songDetails.album.title;
            });
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
            this.createSong();
        } else {
            this.updateSong();
        }
    }

    private createSong() {
        this.songService.addSong(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Song added', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateSong() {
        this.songService.updateSong(this.form.value, this.id)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Song updated', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}
