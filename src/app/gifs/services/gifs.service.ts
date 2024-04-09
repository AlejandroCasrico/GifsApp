import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _tagsHistory:string[] =[]
  constructor(private _http:HttpClient) {
    this.loadLocalStorage();
   }

  private ApiKey:string = "ieYkP41M5kkeapEGdXIA8dH0qvRiySTu";
  private apiUrl:string = "https://api.giphy.com/v1/gifs";
  public gifsList:Gif[] = [];


  get TagsHistory(){
    return [...this._tagsHistory];
  }
 searchTag(tag:string):void{
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    const params = new HttpParams()
      .set('api_key',this.ApiKey)
      .set('limit','10')
      .set('q',tag)
    this._http.get<SearchResponse>(`${this.apiUrl}/search`,{params})
  .subscribe(resp => {
    this.gifsList = resp.data;
    console.log(resp.data);
  })

  }
  private saveLocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this.TagsHistory))
  }
  private loadLocalStorage():void{

   if(!localStorage.getItem('history'))return;
   this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    if(this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }
private organizeHistory(tag:string){
  tag = tag.toLowerCase();
  if(this.TagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag);
  }
  this._tagsHistory.unshift(tag);
  this._tagsHistory = this.TagsHistory.splice(0,10);
  this.saveLocalStorage();
  }
}
