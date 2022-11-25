/* eslint-disable @typescript-eslint/member-ordering */
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './../models/Usuario.model';
import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario: Usuario = new Usuario();

  registroForm = this.formBuilder.group({
    nome: [''],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    cpf: [''],
    senha: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
    confirmaSenha: [
      '',
      Validators.compose([Validators.required, Validators.minLength(6)]),
    ],
  });

  mensagensErro = {
    email: [
      { tipo: 'required', aviso: 'Tem escrever algo né idiota!' },
      { tipo: 'email', aviso: 'O Burro, é um e-mail' },
    ],
    senha: [
      { tipo: 'required', aviso: 'Quer entrar como animal?' },
      { tipo: 'minlength', aviso: 'Mais um pouco...' },
    ],
  };

  constructor(
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private route: Router
  ) {}

  ngOnInit() {}

  async salvar() {
    if (this.registroForm.valid) {
      this.usuario.nome = this.registroForm.get('nome').value;
      this.usuario.email = this.registroForm.get('email').value;
      this.usuario.cpf = this.registroForm.get('cpf').value;
      this.usuario.senha = this.registroForm.get('senha').value;

      const id = (await this.usuarioService.buscarId()) as number;

      this.usuario.id = id;

      this.usuarioService.salvar(this.usuario);

      this.usuarioService.salvarId(id + 1);
      alert('Sucesso!!!');
      this.route.navigateByUrl('/login');
    } else {
      alert('Formulário inválido!');
    }
  }

  get nome() {
    return this.registroForm.get('nome');
  }
  get email() {
    return this.registroForm.get('email');
  }
  get cpf() {
    return this.registroForm.get('cpf');
  }
  get senha() {
    return this.registroForm.get('senha');
  }
  get confirmaSenha() {
    return this.registroForm.get('confirmaSenha');
  }
}
