import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { blob } from 'stream/consumers';
 
@Injectable({
  providedIn: 'root'
})
export class StudyResourceService {

  private studyResourceURL = 'http://localhost:3000/studyResource/'

  constructor(private httpClient:HttpClient) { }


  createAStudyResource(id:number, formData:any){
    return this.httpClient.post(this.studyResourceURL + 'createAStudyResource/' + id,formData,{withCredentials:true});
  }

  loadStudyResources(){
    return this.httpClient.get(this.studyResourceURL + 'findInitial/' ,{withCredentials:true});
  }

  loadMyStudyResources(id:number){
    return this.httpClient.get(this.studyResourceURL + 'findAllForUser/' + id ,{withCredentials:true});
  }

  updateMyStudyResource(id:number,formData:any){
    return this.httpClient.patch(this.studyResourceURL + 'updateMyStudyResource/' + id, formData ,{withCredentials:true});
  }

  deleteMyStudyResource(id:number){
    return this.httpClient.delete(this.studyResourceURL + 'deleteMyStudyResource/' + id,{withCredentials:true});
  }

  downloadMyStudyResource(resourceID:number){
    return this.httpClient.get(this.studyResourceURL + 'downloadMyStudyResource/' + resourceID,{withCredentials:true, responseType:'blob',observe: 'response'});
  }

  searchMyStudyResources(query:string,professorIDs:number[]){
    return this.httpClient.get(this.studyResourceURL + 'searchItems/',{params: {query,professorIDs}, withCredentials:true});
  }

  searchProfessors(query:string)
  {
    return this.httpClient.get(this.studyResourceURL + 'searchProfessors/',{params: {query}, withCredentials:true});
  }

}
