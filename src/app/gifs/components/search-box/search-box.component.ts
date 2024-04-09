import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {

  constructor(private _GifsService: GifsService){

  }

@ViewChild('txtTagInput')
  public tagInput!:ElementRef<HTMLInputElement>

  searchTag(){
   const newTag = this.tagInput.nativeElement.value;
   this._GifsService.searchTag(newTag);
   this.tagInput.nativeElement.value = '';
   console.log(newTag);
  }
}
