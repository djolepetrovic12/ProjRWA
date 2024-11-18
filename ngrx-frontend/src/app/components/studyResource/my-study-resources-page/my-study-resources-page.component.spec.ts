import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudyResourcesPageComponent } from './my-study-resources-page.component';

describe('MyStudyResourcesPageComponent', () => {
  let component: MyStudyResourcesPageComponent;
  let fixture: ComponentFixture<MyStudyResourcesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyStudyResourcesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyStudyResourcesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
