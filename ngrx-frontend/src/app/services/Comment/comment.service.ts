import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private CommentURL = 'http://localhost:3000/comment/'

  constructor(private httpClient:HttpClient) { }

  createAComment(userID: number,resourceID: number, content: string) {
    return this.httpClient.post(this.CommentURL + 'createAComment/' + userID + '/' + resourceID,{content, userID,studyResourceID:resourceID} ,{withCredentials:true});
  }

}
