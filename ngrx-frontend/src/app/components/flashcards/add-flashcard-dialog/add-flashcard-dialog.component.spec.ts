import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlashcardDialogComponent } from './add-flashcard-dialog.component';

describe('AddFlashcardDialogComponent', () => {
  let component: AddFlashcardDialogComponent;
  let fixture: ComponentFixture<AddFlashcardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddFlashcardDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFlashcardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
