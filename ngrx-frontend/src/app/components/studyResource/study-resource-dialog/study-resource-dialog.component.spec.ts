import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyResourceDialogComponent } from './study-resource-dialog.component';

describe('StudyResourceDialogComponent', () => {
  let component: StudyResourceDialogComponent;
  let fixture: ComponentFixture<StudyResourceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyResourceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyResourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
