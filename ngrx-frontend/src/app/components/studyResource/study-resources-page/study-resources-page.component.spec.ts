import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyResourcesPageComponent } from './study-resources-page.component';

describe('StudyResourcesPageComponent', () => {
  let component: StudyResourcesPageComponent;
  let fixture: ComponentFixture<StudyResourcesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudyResourcesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyResourcesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
