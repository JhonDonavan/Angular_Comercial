import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  apiUrlBase = 'https://presentes-app.herokuapp.com';

  constructor(private httpClient: HttpClient) { }

  listar() {
    let apiUrlComplemento = '/api/v1/categorias';
    return this.httpClient.get(this.apiUrlBase + apiUrlComplemento);
  }

  adicionar(categoria: any) {
    let apiUrlComplemento = '/api/v1/categorias';
    return this.httpClient.post(this.apiUrlBase + apiUrlComplemento, categoria);
  }

  remover(id: any) {
    console.log("id é " + id);
    console.log("---------------------");
    let apiUrlComplemento = '/api/v1/categorias/';
    console.log("URL é " + this.apiUrlBase + apiUrlComplemento + id);
    return this.httpClient.delete(this.apiUrlBase + apiUrlComplemento + id);
  }

  editar(categoria: any) {
    let apiUrlComplemento = '/api/v1/categorias';
    return this.httpClient.put(this.apiUrlBase + apiUrlComplemento, categoria);
  }

  buscarById(id: BigInt) {
    let apiUrlComplemento = '/api/v1/categorias/';
    return this.httpClient.get(this.apiUrlBase + apiUrlComplemento + id);
  }

}
