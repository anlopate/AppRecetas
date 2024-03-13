import { Component } from '@angular/core';
import {Receta} from '../receta'
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  recetaEditando = {} as Receta;
  arrayColeccionRecetas: any = [{
    id: "",
    receta: {} as Receta
  }];
  idRecetaSelec: string = "";

  constructor(private firestoreService: FirestoreService, private router: Router,private callNumber: CallNumber) {
    this.obtenerListaRecetas()
  }

  obtenerListaRecetas() {
    // Hacer una consulta cada vez que se detectan nuevos datos en la BD
    this.firestoreService.consultar("recetas").subscribe((datosRecibidos) => {
      // Limpiar el array para que no se dupliquen los datos anteriores
      this.arrayColeccionRecetas = [];
      // Recorrer todos los datos recibidos de la BD
      datosRecibidos.forEach((datosReceta) => {
        // Cada elemento de la BD se almacena en el array que se muestra en pantalla
        this.arrayColeccionRecetas.push({
          id: datosReceta.payload.doc.id,
          receta: datosReceta.payload.doc.data()
        })
      });
    });
  }

  selecReceta(idReceta:string, recetaSelec:Receta) {
    console.log("inicio");
    this.recetaEditando = recetaSelec;
    this.idRecetaSelec = idReceta;
    console.log(this.idRecetaSelec);
    this.router.navigate(['detalle', this.idRecetaSelec]);
    console.log("FInal");

  }
  
 

  // clicBotonInsertar() {
    
  //   this.firestoreService.insertar("recetas", this.recetaEditando).then(() => {
  //     console.log('Receta creada correctamente!');
  //     this.recetaEditando= {} as Receta;
  //   }, (error) => {
  //     console.error(error);
  //   });
  // }

  // clicBotonBorrar() {
  //   this.firestoreService.borrar("recetas", this.idRecetaSelec).then(() => {
  //     console.log('Receta borrada correctamente!');
  //     this.recetaEditando= {} as Receta;
  //     this.idRecetaSelec = "";
  //   }, (error) => {
  //     console.error(error);
  //   });
  // }

  clicBotonModificar() {
    this.firestoreService.modificar("recetas", this.idRecetaSelec, this.recetaEditando).then(() => {
      console.log('Receta modificada correctamente!');
    }, (error) => {
      console.error(error);
    });
  }

  clicBotonNosotros(){
    this.router.navigate(['info']);
  }
  
  hacerLlamada(){
    this.callNumber.callNumber("677527637", true)
     .then(res => console.log('Llamada realizada', res))
     .catch(err => console.log('Error en la llamada', err));

  }
 
}
