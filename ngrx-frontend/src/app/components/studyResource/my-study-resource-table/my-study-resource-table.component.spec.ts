import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStudyResourceTableComponent } from './my-study-resource-table.component';

describe('MyStudyResourceTableComponent', () => {
  let component: MyStudyResourceTableComponent;
  let fixture: ComponentFixture<MyStudyResourceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyStudyResourceTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyStudyResourceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
