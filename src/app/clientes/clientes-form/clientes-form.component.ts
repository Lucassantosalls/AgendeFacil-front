import { Component, OnInit } from '@angular/core';
import{Cliente} from '../cliente'
import{ ClientesService } from '../../clientes.service'
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente:Cliente;
  sucesso: boolean = false;
  erros: String[];
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.cliente = new Cliente();
   }

  ngOnInit(): void {
    let params =  this.activatedRoute.params
    params.subscribe(urlParams =>{
      this.id = urlParams['id'];
      if(this.id){
        this.service.getClienteById(this.id)
        .subscribe(
          response => this.cliente = response,
          errorResponse => this.cliente = new Cliente()
        )
      }
    })
  }

  voltarConsulta(){
    this.router.navigate(['/clientes-lista'])
  }

  onSubmit(){

    if(this.id){

      this.service
      .atualizar(this.cliente)
      .subscribe(response =>{
        this.sucesso = true;
        this.erros = null;
      },errorResponse =>{
        this.erros = ['Erro ao atualizar cliente.']
      })

    }else{
      this.service
      .salvar(this.cliente)
      .subscribe(response =>{
        this.sucesso = true;
        this.erros = null;
        this.cliente = response;
      }, errorResponse => {
        this.sucesso = false
        this.erros = errorResponse.error.erros;
      }
      )
    }
  }

}
