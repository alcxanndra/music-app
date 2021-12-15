import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Artist } from 'src/app/entities/artist';
import { AlertService } from 'src/app/services/alert.service';
import { ArtistService } from 'src/app/services/artist.service';


@Component({ templateUrl: 'list.component.html', styleUrls: ['list.component.css'] })
export class ListComponent implements OnInit {
    artists!: Artist[];

    constructor(private artistService: ArtistService, private alertService: AlertService) {}

    ngOnInit() {
        this.artistService.getAllArtists()
            .pipe(first())
            .subscribe(artists => {
              this.artists = Object.values(Object.values(artists)[0])[0];
              for (let i = 0; i < this.artists.length; i++){
                var artist = this.artists[i];
                console.log("Artist id in list is: " + artist.id)
                this.artistService.fetchImage(artist.id.toString())
                .subscribe(image => this.createImage(image, i),
                  err => this.handleImageRetrievalError(err));
            }
              console.log(artists);
            });

    }

    private handleImageRetrievalError(err: Error) {
        console.error(err);
        this.alertService.error("Problem retrieving profile photo.");
    }

    private createImage(image: Blob, artistId: number) {
        if (image && image.size > 0) {
          let reader = new FileReader();
          let retrievedImage = null;
    
          reader.addEventListener("load", () => {
              if (reader.result !== null){
                this.artists[artistId].imageUrl = reader.result;
              }
          }, false);
    
          reader.readAsDataURL(image);
        } 
    }

    deleteArtist(id: number) {
        const artist = this.artists.find((x: { id: number; }) => x.id === id);
        this.artistService.deleteArtist(id)
            .pipe(first())
            .subscribe(() => this.artists = this.artists.filter((x: { id: number; }) => x.id !== id));
    }
}
