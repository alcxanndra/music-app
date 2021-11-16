import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Producer } from 'src/app/entities/producer';
import { ProducerService } from 'src/app/services/producer.service';

@Component({ templateUrl: 'list.component.html', styleUrls: ['list.component.css'] })
export class ListComponent implements OnInit {
    producers!: Producer[];

    constructor(private producerService: ProducerService) {}

    ngOnInit() {
        this.producerService.getAllProducers()
            .pipe(first())
            .subscribe(producers => {
                this.producers = Object.values(Object.values(producers)[0])[0]
                console.log(producers);
            });
    }

    deleteProducer(id: number) {
        const producer = this.producers.find((x: { id: number; }) => x.id === id);
        this.producerService.deleteProducer(id)
            .pipe(first())
            .subscribe(() => this.producers = this.producers.filter((x: { id: number; }) => x.id !== id));
    }
}