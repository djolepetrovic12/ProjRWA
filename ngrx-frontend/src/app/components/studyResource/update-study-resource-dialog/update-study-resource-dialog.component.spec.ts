import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudyResourceDialogComponent } from './update-study-resource-dialog.component';

describe('UpdateStudyResourceDialogComponent', () => {
  let component: UpdateStudyResourceDialogComponent;
  let fixture: ComponentFixture<UpdateStudyResourceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateStudyResourceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStudyResourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
