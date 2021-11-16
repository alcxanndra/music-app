import { TestBed } from '@angular/core/testing';

import { SongdetailsService } from './songdetails.service';

describe('SongdetailsService', () => {
  let service: SongdetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SongdetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
