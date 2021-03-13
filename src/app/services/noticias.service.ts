import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RespuestaTopHeadline } from '../Pages/intefaces/inteface';

const apiKey = environment.apiKey;
const urlApi = environment.apiUrl;
const headers = new HttpHeaders({
  'X-Api-key':apiKey
});


@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
   
  TopHeadlinePage = 0;
  categoriaActual=''
  categoriaPage=0

  constructor(private http: HttpClient) { 

  }

  private ejecutarQuery<T>(query:string){
    query= urlApi + query;
   return this.http.get<T>(query, {headers});
  }

  getTopHeadlines(){
     this.TopHeadlinePage++;

     return this.ejecutarQuery<RespuestaTopHeadline>(`/top-headlines?country=sa&page=${this.TopHeadlinePage}`)
    //  return this.http.get<RespuestaTopHeadline>(`http://newsapi.org/v2/top-headlines?country=us&apiKey=90643939f604422ab7cbb3636db94c5d`)
  }

  getTopHeadlineCategories(categoria:string){
   
      if(this.categoriaActual==categoria){
        this.categoriaPage++;
      }else{
        this.categoriaPage=1;
        this.categoriaActual=categoria;
      }

    return this.ejecutarQuery<RespuestaTopHeadline>(`/top-headlines?country=sa&category=${ categoria }&page=${this.categoriaPage}`)
  }

}
