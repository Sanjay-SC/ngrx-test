import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagsComponent } from './imags.component';

describe('ImagsComponent', () => {
  let component: ImagsComponent;
  let fixture: ComponentFixture<ImagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagsComponent]
    });
    fixture = TestBed.createComponent(ImagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
