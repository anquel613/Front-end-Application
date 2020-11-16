import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {


clientes: Cliente[];

  public temporalFather:any;
  public temporalMother:any;
  constructor(private clientesService: ClienteService) { }

  ngOnInit(): void {
    this.clientesService.getClientes().subscribe(
      clientes => this.clientes = clientes,
      err => err,
      () => this.updateParents()
    );

  }

  updateParents():void {
    this.clientes.forEach(cliente => {
      this.temporalFather = this.clientes.find(segundoCliente=>
        cliente.fatherId === segundoCliente.id
      )
      this.temporalMother = this.clientes.find(segundoCliente=>
        cliente.motherId === segundoCliente.id
      )
    cliente.fatherName = this.temporalFather?this.temporalFather.fullname:'no tiene padre registrado';
    this.temporalFather = undefined;
    cliente.motherName = this.temporalMother?this.temporalMother.fullname:'no tiene madre registrada';
    this.temporalMother = undefined;
  });
  }

  searchParent(id:number): string {

    var nombre = this.clientes.find(cliente => {
      cliente.id = id;
    })
    return nombre?nombre.fullname:'sin padres registrados';
  }


}
