import { Component, OnInit, ViewChild } from '@angular/core';
// import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../intefaces/inteface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  // @ViewChild(IonSegment) segment: IonSegment;

  categorias=['business', 'entertainment', 'general', 'health', 'science' ,'sports','technology',];
   noticias:Article[] = [];
   categories:string;
  
   constructor(public noticiascategotia:NoticiasService){
    
   }

  ngOnInit(){
    //  this.segment.value = this.categorias[0];
    this.categories = this.categorias[0];
     this.cargarnoticias(this.categorias[0]);
     
    
  }

  cambioCategoria(event:any){
        this.noticias=[];
         this.cargarnoticias(event.detail.value)
  }

  cargarnoticias(categories:string, event?){
       this.noticiascategotia.getTopHeadlineCategories(categories).subscribe((result)=>{
         console.log(result)
          this.noticias.push(...result.articles);
          if(event){
            event.target.complete()
          }
    })
  }
  loadData(event:any){
         this.cargarnoticias(this.categories, event)
  }

}
