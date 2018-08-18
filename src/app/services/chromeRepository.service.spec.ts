import { TestBed, inject } from '@angular/core/testing';

import { ChromeRepositoryService } from './chromeRepository.service';

describe('Chrome.RepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChromeRepositoryService]
    });
  });

  it('should be created', inject([ChromeRepositoryService], (service: ChromeRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
