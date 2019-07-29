import { TestBed } from '@angular/core/testing';

import { CitationService } from './citation.service';

describe('CitationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CitationService = TestBed.get(CitationService);
    expect(service).toBeTruthy();
  });
});
