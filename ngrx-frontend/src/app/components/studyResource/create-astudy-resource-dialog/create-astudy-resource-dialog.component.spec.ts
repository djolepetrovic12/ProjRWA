import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAStudyResourceDialogComponent } from './create-astudy-resource-dialog.component';

describe('CreateAStudyResourceDialogComponent', () => {
  let component: CreateAStudyResourceDialogComponent;
  let fixture: ComponentFixture<CreateAStudyResourceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateAStudyResourceDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAStudyResourceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
