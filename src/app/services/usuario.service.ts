import { StorageService } from './storage.service';
import { Usuario } from './../models/Usuario.model';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  listaUsuarios: Usuario[] = [];

  constructor(private storageService: StorageService) {}

  async login(email: string, senha: string){
    this.buscarTodos();
    let usuario: Usuario;
    this.listaUsuarios.filter(item => {
      if(item.email.toLocaleLowerCase() == email.toLocaleLowerCase()){
        usuario = item;
      }
    });
    if(usuario?.senha === senha){
      return usuario;
    }

    return null;
  }

  async salvar(usuario: Usuario) {
    await this.buscarTodos();
    this.listaUsuarios[usuario.id] = usuario;
    await this.storageService.set('usuarios', this.listaUsuarios);
  }

  async buscarUm(id: number) {
    await this.buscarTodos();
    return this.listaUsuarios[id];
  }

  async buscarTodos() {
    this.listaUsuarios = (await this.storageService.get(
      'usuarios'
    )) as unknown as Usuario[];

    if (!this.listaUsuarios) {
      this.listaUsuarios = [];
    }
    return this.listaUsuarios;
  }

  async deletar(id: number) {
    await this.buscarTodos(); // Atualiza a lista de Usuarios
    this.listaUsuarios.slice(id, 1); // Remove o usuário do array
    await this.storageService.set('usuarios', this.listaUsuarios); // Salva o Array
  }

  async salvarId(id: number) {
    await this.storageService.set('idUsuario', id);
  }

  async buscarId() {
    const id = await this.storageService.get('idUsuario');
    if (!id) {
      return 0;
    }
    return id;
  }
}
