import { Component, Input, OnInit } from '@angular/core';
import { StudyResource } from '../../../models/studyResource';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-my-study-resource-table',
  templateUrl: './my-study-resource-table.component.html',
  styleUrl: './my-study-resource-table.component.scss'
})
export class MyStudyResourceTableComponent implements OnInit {
  
  @Input() dataList: StudyResource[];
  dataSource = new MatTableDataSource<StudyResource>();
  
  
  ngOnInit(): void {
  this.dataSource.data = this.dataList;
}

  addNewStudyResource(){

  }

}
