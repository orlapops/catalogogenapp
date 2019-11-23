import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../providers/auth.service';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ParEmpreService } from '../../providers/par-empre.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public onRegisterForm: FormGroup;
  public usuarios: AngularFirestoreCollection<any>;
  public empresas: AngularFirestoreCollection<any>;
  registro;

  constructor(
    public navCtrl: NavController,
    public auth : AuthService,
    public fireStr : AngularFirestore,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private _pes: ParEmpreService
  ) {
      this.usuarios =  this.fireStr.collection('/usuarios');      
      this.empresas =  this.fireStr.collection('/empresas');
   }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.onRegisterForm = this.formBuilder.group({
      'ID': [null, Validators.compose([
        Validators.required
      ])],      
      'empresa': [null, Validators.compose([
        Validators.required
      ])],
      'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    });
  }

  async signUp() {
    
    const loader = await this.loadingCtrl.create({});
    loader.present();      
    this.auth.registerUser(this.onRegisterForm.get('email').value,this.onRegisterForm.get('password').value).then(async user=>{
      loader.dismiss();
      this.agregarUsuario(this.onRegisterForm.get('empresa').value,this.onRegisterForm.get('fullName').value, this.onRegisterForm.get('ID').value, this.onRegisterForm.get('email').value).then(async data => {
        console.log(this.registro);
        const toast = await this.toastCtrl.create({
          showCloseButton: true,
          message: 'Usuario Creado exitosamente',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();      
        this._pes.guardarUsuarioStorage(this.registro);
        this.navCtrl.navigateRoot('/login');
      });
    }).catch(async error =>{
      console.log(error);
      if (error.message ==='The email address is already in use by another account.'){
        loader.dismiss();
        const aler = await this.alertCtrl.create({
          header: 'Error',
          message: 'El email ya existe en otra cuenta',
          buttons: ['Aceptar']
        });
        await aler.present();
  
      } else {
      loader.dismiss();
      const aler = await this.alertCtrl.create({
        header: 'Error',
        message: 'Ocurrio un error verifique datos. Si ya esta registrado',
        buttons: ['Aceptar']
      });
      await aler.present();
    }
    });
  }

  async agregarUsuario(Empresa: string, Nombre: string, ID: number, Email: string, Vista: boolean = false, Pedido: boolean = false, Protocolo: string = '', Version: string = '', Admin: boolean = false, ver_basicas: boolean = false, ver_stock: boolean = false): Promise<any> {
    console.log('registrando datos');
    this.registro={ Empresa: Empresa, Nombre: Nombre, ID: ID, Email: Email, Vista: Vista, Pedido: Pedido, Protocolo: Protocolo, Version: Version, Admin: Admin,ver_basicas: ver_basicas,ver_stock: ver_stock}
    return this.usuarios.doc(Email).set({
      Empresa,
      Nombre,
      ID,
      Email,
      Vista,
      Pedido,
      Protocolo,
      Version,
      Admin,
      ver_basicas,
      ver_stock
    });
  }
  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }
}
