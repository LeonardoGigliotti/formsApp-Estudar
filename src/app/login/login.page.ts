import { Usuario } from './../models/Usuario.model';
import { Router } from '@angular/router';
import { UsuarioService } from './../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = this.formBuilder.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    senha: [
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
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: Router
  ) {}

  get email() {
    return this.loginForm.get('email');
  }
  get senha() {
    return this.loginForm.get('senha');
  }

  ngOnInit() {}

  async login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const senha = this.loginForm.get('senha').value;
      const usuario: Usuario = (await this.usuarioService.login(
        email,
        senha
      )) as null as Usuario;

      if (usuario) {
        console.log(usuario);
        this.route.navigateByUrl('/tabs/tab1');
      } else {
        alert('E-mail ou senha inválidos!');
      }
    } else {
      alert('Formulário Inválido!');
    }
  }
}
