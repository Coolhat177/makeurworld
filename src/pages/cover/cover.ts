import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Camera,CameraOptions} from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';


@IonicPage()
@Component({
  selector: 'page-cover',
  templateUrl: 'cover.html',
})
export class CoverPage {
  image:string;
  cropImage:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private actionSheetController: ActionSheetController,private camera: Camera,private crop:Crop) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CoverPage');
  }


  choseForBg(){
    //
    const actionsheet = this.actionSheetController.create({
      title:"Add Photos",
      buttons: [
        {
          text:"From Storage",
          handler: ()=> {
            const options: CameraOptions={
              quality:100,
              destinationType:this.camera.DestinationType.NATIVE_URI,
              encodingType:this.camera.EncodingType.JPEG,
              sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
              mediaType:this.camera.MediaType.PICTURE,
              correctOrientation:true,
              saveToPhotoAlbum:true
            }
            const result = this.camera.getPicture(options); // image we capture
            this.image = `data:image/jpeg;base64,${result}`  //base 64image for browser
            
          }
        },
        {
          text:"Open Camera",
          handler: ()=> {
            const options1: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.NATIVE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation:true,
            }
            let base64Image : string;
            this.camera.getPicture(options1).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            base64Image = 'data:image/jpeg;base64,' + imageData;
           
            this.crop.crop(imageData,{quality:20, targetWidth:5, targetHeight:3 })
            .then( newImage => this.cropImage = newImage),error => {console.log(base64Image);console.log(imageData);}
            },err => {
            // Handle error 
            console.log("error");
            });
          
        


        }
        },
        {
          text:'Cancel',
          role:'cancel'

        }
      ]
    }) ;
   
    actionsheet.present();
  };
  choseForPr(){
    
  }

}
