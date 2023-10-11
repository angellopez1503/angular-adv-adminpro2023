import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const google:any
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn?:ElementRef
  formSubmitted: boolean = false;

  loginForm: FormGroup = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  ngAfterViewInit(): void {
    this.googleInit()
  }
  ngOnInit(): void {}

  googleInit(){
    
    google.accounts.id.initialize({
      client_id: "127965276130-e0h5g2hpkfjel4ld1oiiul37evdcqjih.apps.googleusercontent.com",
      callback:(response:any)=> this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      // document.getElementById("buttonDiv"),
      this.googleBtn?.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response:any){
    console.log({esto:this});
    console.log("Encoded JWT ID token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
            .subscribe(
              res => {
                // console.log({login:res});
                this.router.navigateByUrl('/');
              }
            )
  }

  login() {
    this.usuarioService.login(this.loginForm.value).subscribe(
      (res) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/');
      },
      (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
    // console.log(this.loginForm.value);
    // this.router.navigateByUrl('/');
  }

}
