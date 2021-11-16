import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Genre } from 'src/app/entities/genre';
import { GenreService } from 'src/app/services/genre.service';


@Component({ templateUrl: 'list.component.html', styleUrls: ['list.component.css'] })
export class ListComponent implements OnInit {
    genres!: Genre[];
    
    constructor(private genreService: GenreService) {}

    ngOnInit() {
        this.genreService.getAllGenres()
            .pipe(first())
            .subscribe(genres => {
                this.genres = Object.values(Object.values(genres)[0])[0]
                console.log(genres);
            });
    }

    deleteGenre(id: number) {
        const genre = this.genres.find((x: { id: number; }) => x.id === id);
        this.genreService.deleteGenre(id)
            .pipe(first())
            .subscribe(() => this.genres = this.genres.filter((x: { id: number; }) => x.id !== id));
    }
}