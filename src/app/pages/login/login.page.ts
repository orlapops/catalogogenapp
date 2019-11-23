import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { TranslateProvider } from '../../providers';
import { ParEmpreService } from '../../providers/par-empre.service';
import { AuthService } from '../../providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;

  constructor(
    public _parEmpreProv: ParEmpreService,
    public auth : AuthService,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private translate: TranslateProvider,
    private formBuilder: FormBuilder
  ) {
    console.log('constructor login');
   }

  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  //analizado
  ngOnInit() {
    console.log('init login');
    // document.querySelector('video').play();
   this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
    
  }
  //hace falta ver porque el input no sirve analizado
  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: this.translate.get('app.pages.login.label.forgot'),
      message: this.translate.get('app.pages.login.text.forgot'),
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: this.translate.get('app.label.email')
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: async (email: any) => {
            const loader = await this.loadingCtrl.create({ });
            loader.present();
            console.log(email);
            this.auth.olvidoContraseña(email.email)
              .then(async (l) => {
                console.log('se envio');
                loader.dismiss();
                const toast = await this.toastCtrl.create({
                  showCloseButton: true,
                  message: this.translate.get('app.pages.login.text.sended'),
                  duration: 3000,
                  position: 'bottom',
                  buttons: ['Cerrar']
                });
                toast.present();
              })
              .catch(async (error) => {
                console.log(error);
                loader.dismiss();
                const aler = await this.alertCtrl.create({
                  header: 'Error',
                  message: 'Introdusca un correo valido..',
                  buttons: ['Aceptar']
                });
                await aler.present();
              });
          }
        }
      ]
    });

    await alert.present();
  }

  // analizado
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }
  //Analizado, Verificar que conserve sesion iniciada
  login(){
    this.presentLoading('Verificando');
    
    this.auth.loginUser(this.onLoginForm.get('email').value, this.onLoginForm.get('password').value ).then((user: any) => {
        console.log('login retorna user',user, user.user.email);
        this._parEmpreProv.reg_log('Login', 'login 5');
        // this._parEmpreProv.usuarioFB(this.onLoginForm.get('email').value);
                    //verificar usuario actual este creado
                    this._parEmpreProv
                      .VeriUsuarioaActualFb(user.user.email)
                      .then(() => {
                        //Se suscribe datos usuario
                        this._parEmpreProv
                          .getUsuarFB(user.user.email)
                          .subscribe((datos: any) => {
                            console.log("datos getUsuarFB ", datos);
                            if (datos) {
                              this._parEmpreProv.usuario_valido = true;
                              this._parEmpreProv.usuario = datos;
                              this._parEmpreProv.permite_pedido = datos.Pedido;
                              this._parEmpreProv.guardarUsuarioStorage(datos);
                              console.log(this._parEmpreProv.usuario);
                              this._parEmpreProv.getEmpresaFB(datos.empresa)
                              .subscribe((datosempre: any) => {
                                console.log("datos getUsuarFB ", datosempre);
                                if (datosempre) {
                                  this._parEmpreProv.datosEmpre = datosempre;
                                } else {
                                  let alert = this.alertCtrl.create({
                                    header: 'Error',
                                    subHeader: 'Empresa invalida',
                                    message: 'Verifique que la empresa asociada al email este registrada',
                                  buttons: ['Aceptar']
                                  }).then(alert => alert.present());
                                  console.error('No existe empresa en fb');
                                }                    
                              });                                    //Verificar si ya esta autorizado por Via tropical Vista true
                              // if (this._parEmpreProv.usuario.vista)
                              // {
                                this.navCtrl.navigateRoot('/home');
                              // } else {
                              //   //Esperando autorización
                              //   this.navCtrl.navigateRoot('/wait');
                              // }
                            } else {
                              let alert = this.alertCtrl.create({
                                header: 'Error',
                                subHeader: 'Debe ingresar usuario valido',
                                message: 'Verifique formato y que este registrado',
                              buttons: ['Aceptar']
                              }).then(alert => alert.present());                     
                            }
                          });
                      });
        console.log('Se logeo ok en firebase');
      })
      .catch(err=>{
      this._parEmpreProv.reg_log('Login', 'login 7 error: ' + err.message);
      let alert = this.alertCtrl.create({
          header: 'Error',
          subHeader: 'Debe ingresar usuario valido',
          message: 'Verifique formato y que este registrado',
        buttons: ['Aceptar']
        }).then(alert => alert.present());
      });    
  }
  //Analizado
  async presentLoading(pmensaje) {
    const loading = await this.loadingCtrl.create({
      message: pmensaje,
      spinner: 'dots',
      duration: 1000
    });
    return await loading.present();
  }

}
