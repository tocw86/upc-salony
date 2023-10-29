import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LbokService } from './lbok.service';

describe('LbokService', () => {
  let service: LbokService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LbokService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
