import { TestBed } from '@angular/core/testing';

import { ChatioService } from './chatio.service';

describe('ChatioService', () => {
  let service: ChatioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
