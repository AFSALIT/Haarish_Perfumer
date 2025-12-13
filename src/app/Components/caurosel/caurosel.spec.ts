import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Caurosel } from './caurosel';

describe('Caurosel', () => {
  let component: Caurosel;
  let fixture: ComponentFixture<Caurosel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Caurosel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Caurosel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
