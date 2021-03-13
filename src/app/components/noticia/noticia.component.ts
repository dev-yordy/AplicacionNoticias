import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../Pages/intefaces/inteface';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx'
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
   @Input() noticia: Article;
   @Input() i: number;
  constructor(private iab: InAppBrowser, public actionSheetController: ActionSheetController,private socialSharing: SocialSharing) { }

  ngOnInit() {}
  
  vernoticias(){
    const browser = this.iab.create(this.noticia.url, '_system');

  }
  async actionshet(){
    const actionSheet = await this.actionSheetController.create({
     mode:'ios',
      buttons: [{
        text: 'Share',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          )
        }
      }, {
        text: 'Favorite',
        icon: 'star-outline',
        handler: () => {
          console.log('favorite');
        }
      },  {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
}
