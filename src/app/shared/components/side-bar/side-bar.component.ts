import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
   constructor(private _GifsService :GifsService){}

   get tags():string[]{
    return this._GifsService.TagsHistory;
   }
searchOfTags(tag:string){
  return this._GifsService.searchTag(tag);
}

}
