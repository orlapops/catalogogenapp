import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { first,map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId: string = "";
  userAuth: boolean = false;
  // private userProfile: AngularFirestoreDocument<any>;

  constructor(private afAuth :  AngularFireAuth) {
    this.afAuth.authState.subscribe( user => {
      if(user) {
        console.log("USERSERVICE.....  auth = true");
        this.userId =  user.uid;
        this.userAuth =  true;
        console.log("userId="+this.userId);
      } else {
        console.log("USERSERVICE.....  auth = false");
        // Empty the value when user signs out
        this.userId =  "";
        this.userAuth =  false;
        console.log("userId="+this.userId);
      }
    });

  }
  isLoggedIn():Promise<any> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
  getUserId(){
    return this.userId;

}

    //Olvido Contraseña
    olvidoContraseña(email:string){
        return this.afAuth.auth.sendPasswordResetEmail(email);
    }
    // Registro de usuario
    registerUser(email:string, password:string){
        return this.afAuth.auth.createUserWithEmailAndPassword( email, password)
     }  
 // Login de usuario
 loginUser(email:string, password:string){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(user=>Promise.resolve(user))
      .catch(err=>Promise.reject(err))
  }
  
// Devuelve la session
  get Session(){
    return this.afAuth.authState;
   }  
 // Logout de usuario
  logout(){
    this.afAuth.auth.signOut().then(()=>{
      // hemos salido
    })
  }   
}