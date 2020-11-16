import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente();
  fechaSeleccionada: boolean = false;
  clientes: Cliente[];
  public titulo:string = "Crear Persona";
  constructor(private clienteService: ClienteService,
  private router: Router) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    )
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      response => this.router.navigate(['/clientes'])
    )
  }
}
