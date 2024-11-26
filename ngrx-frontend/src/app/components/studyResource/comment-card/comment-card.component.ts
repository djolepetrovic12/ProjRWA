import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../../../models/comment';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrl: './comment-card.component.scss'
})
export class CommentCardComponent implements OnInit {
  
  @Input() commentInfo : Comment;
  
  ngOnInit(): void {
    
  }

  get getDateUploaded() : string
  {
    const dateUp = new Date(this.commentInfo.dateCreated);
    const year = dateUp.getFullYear();
    const month = dateUp.getMonth() + 1;
    const day = dateUp.getDate();


    return `${day}/${month}/${year}`;
  }


}
