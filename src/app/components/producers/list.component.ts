import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Producer } from 'src/app/entities/producer';
import { AlertService } from 'src/app/services/alert.service';
import { ProducerService } from 'src/app/services/producer.service';

@Component({ templateUrl: 'list.component.html', styleUrls: ['list.component.css'] })
export class ListComponent implements OnInit {
    producers!: Producer[];

    constructor(private producerService: ProducerService, private alertService: AlertService) {}

    ngOnInit() {
        this.producerService.getAllProducers()
            .pipe(first())
            .subscribe(producers => {
              this.producers = Object.values(Object.values(producers)[0])[0];
              for (let i = 0; i < this.producers.length; i++){
                var producer = this.producers[i];
                console.log("Producer id in list is: " + producer.id)
                this.producerService.fetchImage(producer.id.toString())
                .subscribe(image => this.createImage(image, i),
                  err => this.handleImageRetrievalError(err));
            }
              console.log(producers);
            });
    }

    deleteProducer(id: number) {
        const producer = this.producers.find((x: { id: number; }) => x.id === id);
        this.producerService.deleteProducer(id)
            .pipe(first())
            .subscribe(() => this.producers = this.producers.filter((x: { id: number; }) => x.id !== id));
    }

    private handleImageRetrievalError(err: Error) {
        console.error(err);
        this.alertService.error("Problem retrieving profile photo.");
    }

    private createImage(image: Blob, producerId: number) {
        if (image && image.size > 0) {
          let reader = new FileReader();
          let retrievedImage = null;
    
          reader.addEventListener("load", () => {
              if (reader.result !== null){
                this.producers[producerId].imageUrl = reader.result;
              }
          }, false);
    
          reader.readAsDataURL(image);
        } 
    }
}