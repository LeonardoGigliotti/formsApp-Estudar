import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/Usuario.model';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  listaUsuarios: Usuario[] = [];

  constructor(private userService: UsuarioService) {
    
  }

async buscarUsuarios(){
  this.listaUsuarios = await this.userService.buscarTodos();
  }

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.buscarUsuarios();
  }
}
