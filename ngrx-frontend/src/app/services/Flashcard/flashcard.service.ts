import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Flashcard } from '../../models/flashcard';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  private flashcardURL = 'http://localhost:3000/flashcard/'

  constructor(private httpClient:HttpClient) { }

  createAFlashcard(id:number,formData:any)
  {
    return this.httpClient.post(this.flashcardURL + 'createFlashcard/' + id,formData,{withCredentials:true})
  }

  loadFlashcards(id:number)
  {
    return this.httpClient.get<Flashcard[]>(this.flashcardURL + 'findAllForUser/' + id,{withCredentials:true})
  }

  deleteAFlashcard(id:number)
  {
    return this.httpClient.delete(this.flashcardURL + 'deleteAFlashcard/' + id,{withCredentials:true})
  }

  updateAFlashcard(id:number,formData:any)
  {
    return this.httpClient.patch(this.flashcardURL + 'updateAFlashcard/' + id,formData,{withCredentials:true})
  }

}
