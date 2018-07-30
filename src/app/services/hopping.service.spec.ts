import { TestBed, inject } from '@angular/core/testing';

import { HoppingService } from './hopping.service';

describe('HoppingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HoppingService]
    });
  });

  it('should be created', inject([HoppingService], (service: HoppingService) => {
    expect(service).toBeTruthy();
  }));
});
