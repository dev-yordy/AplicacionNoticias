import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from '../intefaces/inteface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  noticias:Article[] = [];

  constructor(private noticiasService: NoticiasService) {}
  
  ngOnInit(){
     this.cargarnoticias();
  }

  loadData(event){
      this.cargarnoticias( event);
  }

  cargarnoticias(event?){
    this.noticiasService.getTopHeadlines().subscribe((result)=>{

      if(result.articles.length==0){  //de esta forma detenemos el scroll, ya que hacemos llamado al articulo extraido por la api y verificamos si hay campos result.articles.length
        event.target.disabled =true;
        event.target.complete()
      }

      this.noticias.push(...result.articles) //de esa manera extrae la informacio e inserta al arreglo de forma independiente cada una de las noticias
 
      if(event){
        event.target.complete()
      }
   
    });
  }
}
