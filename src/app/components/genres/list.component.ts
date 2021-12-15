import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Genre } from 'src/app/entities/genre';
import { Alert } from 'src/app/models/Alert';
import { AlertService } from 'src/app/services/alert.service';
import { GenreService } from 'src/app/services/genre.service';


@Component({ templateUrl: 'list.component.html', styleUrls: ['list.component.css'] })
export class ListComponent implements OnInit {
    genres!: Genre[];
    
    constructor(private genreService: GenreService, private alertService: AlertService) {}

    ngOnInit() {
        this.genreService.getAllGenres()
            .pipe(first())
            .subscribe(genres => {
              this.genres = Object.values(Object.values(genres)[0])[0];
              for (let i = 0; i < this.genres.length; i++){
                var genre = this.genres[i];
                console.log("Genre id in list is: " + genre.id)
                this.genreService.fetchImage(genre.id.toString())
                .subscribe(image => this.createImage(image, i),
                  err => this.handleImageRetrievalError(err));
            }
              console.log(genres);
            });
    }

    private handleImageRetrievalError(err: Error) {
        console.error(err);
        this.alertService.error("Problem retrieving profile photo.");
    }

    private createImage(image: Blob, genreId: number) {
        if (image && image.size > 0) {
          let reader = new FileReader();
          let retrievedImage = null;
    
          reader.addEventListener("load", () => {
              if (reader.result !== null){
                this.genres[genreId].imageUrl = reader.result;
              }
          }, false);
    
          reader.readAsDataURL(image);
        } 
    }

    deleteGenre(id: number) {
        const genre = this.genres.find((x: { id: number; }) => x.id === id);
        this.genreService.deleteGenre(id)
            .pipe(first())
            .subscribe(() => this.genres = this.genres.filter((x: { id: number; }) => x.id !== id));
    }
}