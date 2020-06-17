import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';

import { MessageService } from 'primeng/api';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';

@Component({
  selector: 'app-painel-negociacao',
  templateUrl: './painel-negociacao.component.html',
  styleUrls: ['./painel-negociacao.component.css']
})
export class PainelNegociacaoComponent implements OnInit {

  categoria = <any>{};
  categorias = [];
  modalEditar: boolean;



  constructor(
    private categoriaService: CategoriaService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.consultarAll();
  }

  editar(id: BigInt) {
    console.log("id vindo do botão editar " +id);
    this.categoria = this.categoriaService.buscarById(id).subscribe();
    console.log("objeto recuperado do serviço " + this.categoria.id);
    this.modalEditar = true;
  }

  limparCategoriaEditar(categoria: any){
    console.log("categoria.id " + categoria.id);
    this.categoria = {};
    this.consultarAll();
    console.log("categoria.id " + categoria.id);
    this.modalEditar = false;
  }


  consultarAll() {
    this.categoriaService.listar()
      .subscribe(resposta => this.categorias = <any>resposta);
  }

  remover(id: any) {
    this.categoriaService.remover(id)
      .subscribe(() => {
        this.consultarAll();

        this.messageService.add({
          severity: 'success',
          summary: 'Categoria removida com sucesso.'
        });
      },
        resposta => {
          let msg = 'Erro inesperado. Tente novamente. OBS: TRATAR ERRO DA API';

          this.messageService.add({
            severity: 'error',
            summary: msg
          });
        }
      );
  }

  adicionar() {
    console.log("categoria " + this.categoria.id);
    if(this.categoria.id == null || this.categoria.id == ""){
      
      console.log("categoria.id " + this.categoria.id);
      console.log("this.categoria.id == null || this.categoria.id == ");
      
      this.categoriaService.adicionar(this.categoria)
      .subscribe(() => {
        this.categoria = {};
        this.consultarAll();

        this.messageService.add({
          severity: 'success',
          summary: 'Categoria cadastrada com sucesso.'
        });
      },
        resposta => {
          let msg = 'Erro inesperado. Tente novamente. OBS: TRATAR ERRO DA API';

          this.messageService.add({
            severity: 'error',
            summary: msg
          });
        });
    }
    else{
      console.log("categoria.id " + this.categoria.id);
      this.categoriaService.editar(this.categoria)
      .subscribe(() => {
        this.categoria = {};
        this.consultarAll();

        this.messageService.add({
          severity: 'success',
          summary: 'Categoria editada com sucesso.'
        });
      },
        resposta => {
          let msg = 'Erro inesperado. Tente novamente. OBS: TRATAR ERRO DA API';

          this.messageService.add({
            severity: 'error',
            summary: msg
          });
        });
    }
    
  }

  alterar(){
    this.categoriaService.editar(this.categoria)
    .subscribe(() => {
      this.categoria = {};
      this.consultarAll();
  
      this.messageService.add({
        severity: 'success',
        summary: 'Categoria cadastrada com sucesso.'
      });
    },
      resposta => {
        let msg = 'Erro inesperado. Tente novamente. OBS: TRATAR ERRO DA API';
  
        this.messageService.add({
          severity: 'error',
          summary: msg
        });
      });
  }

}
