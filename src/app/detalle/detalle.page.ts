import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { Receta } from '../receta';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import {  ToastController } from '@ionic/angular';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import {  NavController } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';



@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  recetaEditando = {} as Receta;
  imagenSelec: string = "";
  id: string = "";
  new: boolean=false;
 
  document: any = {
    id: "",
    data: {} as Receta};
 

  constructor(private activatedRoute: ActivatedRoute, private firestoreService: FirestoreService, private router: Router, private loadingController: LoadingController, private toastController: ToastController, private imagePicker: ImagePicker, private socialSharing: SocialSharing) {}

  ngOnInit() {
    let idRecibido = this.activatedRoute.snapshot.paramMap.get('id');
    if (idRecibido != null) {
      this.id = idRecibido;
        if(this.id == "new"){
          this.new = true;
    }else{
   // Realizamos consulta buscando ID.
        this.firestoreService.consultarPorId('recetas', this.id).subscribe((resultado: any) => {
          if (resultado.payload.data() != null) {
            this.document.id = resultado.payload.id;
            this.document.data = resultado.payload.data();
            console.log(this.document.data.titulo);
          } else {
            this.document.data = {} as Receta;
          }
        }); 
      }
      }else{
        this.new = true;
      }
 
}

    clicBotonBorrar() {
      this.firestoreService.borrar("recetas", this.document.id).then(() => {
        console.log('Receta borrada correctamente!');

      }, (error) => {
        console.error(error);
      });
      this.router.navigate(['/home']);
    }

   
    clicBotonModificar() {
      this.firestoreService.modificar("recetas", this.document.id, this.document.data).then(() => {
        console.log('Receta modificada correctamente!');
      }, (error) => {
        console.error(error);
      });
      this.router.navigate(['/home']);
    }
    clicBotonInsertar() {
      //this.firestoreService.insertar("recetas", this.recetaEditando);
      this.firestoreService.insertar("recetas", this.document.data).then(() => {
        console.log('Receta creada correctamente!');
      }, (error) => {
        console.error(error);
      });
      this.router.navigate(['/home']);
    }
    
    public alertButtons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Borrado cancelado');
        }
      },
      {
        text: 'OK',
        role: 'confirm', 
        handler: () => {
            this.clicBotonBorrar();
           console.log("Borrado OK");
        },
      }, 
    ];
 

  async seleccionarImagen(){
    // Comprobar si la aplicación tiene permiso de lectura 
    this.imagePicker.hasReadPermission().then(
      (result) => {
        // Si no tiene permisos de lectura se solicita usuario
      if(result == false){
        this.imagePicker.requestReadPermission();
      }else{
        // Abrir selector de imágenes (ImagePicker)
        this.imagePicker.getPictures({
          maximumImagesCount: 1, // Permitir solo 1 imagen
          outputType: 1          // 1 = Base64 
        }).then(
          (results) => {  // En la variable results se tienen las imágenes seleccionadas
            if(results.length > 0){ // Si el usuario he elegido una imagen
              // EN LA VARIABLE imagenSelec QUEDA ALMACENADA LA IMAGEN SELECCIONADA
              this.imagenSelec = "data:image/jpeg;base64,"+results[0];
              console.log("Imagen que se ha seleccionado (en Base46): " + this.imagenSelec);
            }
          },
          (err) => {
            console.log(err)
          }
        );
      }
    }, (err)=>{
      console.log(err);
    });
 }

async subirImagen (){
  // Mensaje de espera mientras se sube la imagen
  const loading = await this.loadingController.create({
    message: "Por favor espera..."
  });

  //Mensaje de finalización de subida de la imagen
  const toast = await this.toastController.create({
    message: "La imagen se ha subido correctamente.",
    duration: 3000
  });

  // Carpeta del Storage donde se almacenará la imagen.
  let nombreCarpeta = "imagenes";

  // Mostrar el mensaje de espera.
  loading.present();

  // Asignar el nombre de la imagen en función de la hora actual para evitar duplicaciones de nombre.
  let nombreImagen = `${new Date().getTime()}`;

  // Llamar al método que sube la imagen al Storage.
  this.firestoreService.subirImagenBase64(nombreCarpeta, nombreImagen, this.imagenSelec)
    .then(snapshot => {
      snapshot.ref.getDownloadURL().then(downloadURL => {
        // EN LA VARIABLE downloadURL SE OBTIENE LA DIRECCIÓN URL DE LA IMAGEN
        console.log("downloadURL: " + downloadURL);
        this.document.data.imagenURL = downloadURL;
        // Mostrar el mensaje de finalización de la subida.
        toast.present();
        // Ocultar mensaje de espera.
        loading.dismiss();
      })
    })
}
 
async eliminarArchivo(fileURL:string){
  const toast = await this.toastController.create({
    message: "El archivo se ha borrado correctamente",
    duration: 3000
  });
  this.firestoreService.eliminarArchivoPorURL(fileURL).then(() => {
    toast.present();
  }, (err) => {
    console.log(err);
  });
}

share() {
  let message = '¡Mira esta receta!';
  let subject = 'Ionic App';
  let url = 'https://www.example.com';

  // Llama al método share del servicio SocialSharing
  // this.socialSharing.share(message, subject,url);
  this.socialSharing.share(message,subject);
}



}