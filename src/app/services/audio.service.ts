import { takeUntil } from "rxjs/operators";
import * as moment from "moment";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { StreamState } from "../interfaces/streamstate";

@Injectable({
  providedIn: "root"
})
export class AudioService {

  private stop$ = new Subject();

  private audioObj = new Audio();

  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
  };

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  );

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case "canplay":
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case "playing":
        this.state.playing = true;
        break;
      case "pause":
        this.state.playing = false;
        break;
      case "timeupdate":
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(
          this.state.currentTime
        );
        break;
      case "error":
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false
    };
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }

  private streamObservable(url: any) {
    return new Observable(observer => {
      // Play audio
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();
  
      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };
  
      this.addEvents(this.audioObj, this.audioEvents, handler);
      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeEvents(this.audioObj, this.audioEvents, handler);
        // reset state
        this.resetState();
      };
    });
  }
  private addEvents(obj: any, events: any[], handler: (event: Event) => void) {
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });
  }

  private removeEvents(obj: any, events: any[], handler: (event: Event) => void) {
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  }

  public playStream(url: any) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  public play() {
    this.audioObj.play();
  }

  public pause() {
    this.audioObj.pause();
  }

  public stop() {
    this.stop$.next(void 0);
  }

  seekTo(seconds: any) {
    this.audioObj.currentTime = seconds;
  }

  formatTime(time: number, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }
}