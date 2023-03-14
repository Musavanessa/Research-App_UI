import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { url } from 'src/app/globals';


@Injectable({
  providedIn: 'root'
})
export class ChatboxServiceService {

  constructor(public _http:HttpClient) { }

  apiUrl = url;



  //Get All Chats
  chat_groups(): Observable<any>
  {
    let data = 3;
    return this._http.get(`${this.apiUrl+"chat_groups/discipline/1"}`);
  }

  chat_group(): Observable<any>
  {
    return this._http.get(`${this.apiUrl+ "chat_groups/1"}`);
  }

  getChat(id:any): Observable<any>
  {
    return this._http.get(`${this.apiUrl +"chats/"+ id}`);
  }

  updateChatGroup(chatGrupModel:any):Observable<any>
  {
    return this._http.patch(`${this.apiUrl + "chat_groups/" + chatGrupModel.id}` , chatGrupModel);
  }

  deleteChatGroup(id:any):Observable<any>
  {
    return this._http.delete(`${this.apiUrl + "chat_groups/" + id}`);
  }

  createChatGroup(newChatGroupModel:any):Observable<any>
  {
    console.log(`${this.apiUrl + "chat_groups/discipline/" + newChatGroupModel.disciplineId}`)
    return this._http.post(`${this.apiUrl + "chat_groups/discipline/" + newChatGroupModel.disciplineId}`, newChatGroupModel);
  }

  viewChats(chatGroupId:any):Observable<any>
  {
    return this._http.get(`${this.apiUrl + "chats/" + chatGroupId}`);
  }

  createChat(chatObject:any):Observable<any>
  {
    return this._http.post(`${this.apiUrl + "chats/ " + chatObject.chatGroupId}`, chatObject);
  }


  uploadChatFile(selectedFile:any, chatGroupId:any):Observable<any>
  {
    return this._http.post(`${this.apiUrl + "chats/uploadDocument/" + chatGroupId}`, selectedFile)
  }
}