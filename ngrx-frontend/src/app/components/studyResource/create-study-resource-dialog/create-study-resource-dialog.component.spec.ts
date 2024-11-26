import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudyResourceDialogComponent } from './create-study-resource-dialog.component';

describe('CreateStudyResourceDialogComponent', () => {
  let component: CreateStudyResourceDialogComponent;
  let fixture: ComponentFixture<CreateStudyResourceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateStudyResourceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStudyResourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
