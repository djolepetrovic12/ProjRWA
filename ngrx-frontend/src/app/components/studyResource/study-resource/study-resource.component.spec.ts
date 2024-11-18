import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyResourceComponent } from './study-resource.component';

describe('StudyResourceComponent', () => {
  let component: StudyResourceComponent;
  let fixture: ComponentFixture<StudyResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyResourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
