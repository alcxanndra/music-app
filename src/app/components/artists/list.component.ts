import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Artist } from 'src/app/entities/artist';
import { ArtistService } from 'src/app/services/artist.service';


@Component({ templateUrl: 'list.component.html', styleUrls: ['list.component.css'] })
export class ListComponent implements OnInit {
    artists!: Artist[];

    constructor(private artistService: ArtistService) {}

    ngOnInit() {
        this.artistService.getAllArtists()
            .pipe(first())
            .subscribe(artists => {
              this.artists = Object.values(Object.values(artists)[0])[0]
              console.log(artists);
            });
    }

    deleteArtist(id: number) {
        const artist = this.artists.find((x: { id: number; }) => x.id === id);
        this.artistService.deleteArtist(id)
            .pipe(first())
            .subscribe(() => this.artists = this.artists.filter((x: { id: number; }) => x.id !== id));
    }
}
