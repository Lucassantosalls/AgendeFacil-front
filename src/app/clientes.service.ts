import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiUrl: string = environment.apiURL;

  constructor( private http: HttpClient  ) {

  }

  salvar( cliente : Cliente ) : Observable<Cliente>{
    return this.http.post<Cliente>(`${this.apiUrl}/api/clientes`,cliente)
  }

  atualizar( cliente : Cliente ) : Observable<any>{
    return this.http.put<Cliente>(`${this.apiUrl}/api/clientes/${cliente.id}`,cliente)
  }

  deletar( cliente : Cliente ) : Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/api/clientes/${cliente.id}`)
  }

  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiUrl}/api/clientes`);
  }

  getClienteById(id: number) : Observable<Cliente>{
    return this.http.get<any>(`${this.apiUrl}/api/clientes/${id}`);
  }
}
