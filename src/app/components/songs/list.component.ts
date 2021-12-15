import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';


import { ThrowStmt } from '@angular/compiler';
import { StreamState } from 'src/app/interfaces/streamstate';
import { Song } from 'src/app/entities/song';
import { AudioService } from 'src/app/services/audio.service';
import { SongService } from 'src/app/services/song.service';
import { SongdetailsService } from 'src/app/services/songdetails.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
     templateUrl: 'list.component.html',
     styleUrls: ['./list.component.css']
    }
)
export class ListComponent implements OnInit {
    songs!: Song[];
    state!: StreamState;
    paused!: boolean;
    currentPlaying!: number;

    constructor(private songService: SongService, private songDetailsService: SongdetailsService,
         private audioService: AudioService, private alertService: AlertService) {}

    ngOnInit() {
        this.songService.getAllSongs()
            .pipe(first())
            .subscribe(songs => {
            this.songs = Object.values(Object.values(songs)[0])[0];
            for (let i = 0; i < this.songs.length; i++){
                var song = this.songs[i];
                console.log("Producer id in list is: " + song.id)
                this.songService.fetchImage(song.id.toString())
                .subscribe(image => this.createImage(image, i),
                err => this.handleImageRetrievalError(err));
            }
            console.log(songs);
            });

        this.audioService.getState()
            .subscribe(state => {
                this.state = state;
        });
    }

    deleteSong(id: number) {
        const song = this.songs.find((x: { id: number; }) => x.id === id);
        this.songService.deleteSong(id)
            .pipe(first())
            .subscribe(() => this.songs = this.songs.filter((x: { id: number; }) => x.id !== id));
    }


    playStream(id: number) {
        this.audioService.stop();
        this.currentPlaying = id;
        const song = this.songs.find((x: { id: number; }) => x.id === id);
        this.audioService.playStream('./' + song!.songUrl).subscribe(events => {
        });
    }

    play() {
        this.audioService.play();
        this.paused = false;
    }

    stop() {
        this.audioService.stop();
    }

    pause(){
        this.audioService.pause();
        this.paused = true;
    }

    private handleImageRetrievalError(err: Error) {
        console.error(err);
        this.alertService.error("Problem retrieving profile photo.");
    }

    private createImage(image: Blob, songId: number) {
        if (image && image.size > 0) {
          let reader = new FileReader();
          let retrievedImage = null;
    
          reader.addEventListener("load", () => {
              if (reader.result !== null){
                this.songs[songId].imageUrl = reader.result;
              }
          }, false);
    
          reader.readAsDataURL(image);
        } 
    }
}
