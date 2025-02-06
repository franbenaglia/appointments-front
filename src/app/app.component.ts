import { CommonModule } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { AppContainer } from './container/container.component';
import { LoginPage } from "./login/login.page";
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { App, URLOpenListenerEvent } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [AppContainer, LoginPage, IonRouterOutlet, IonApp]
})
export class AppComponent implements OnInit {

    constructor(private cookieService: CookieService, private authService: AuthService, private router: Router, private zone: NgZone) {
    
    }

    initializeApp() {
        App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
            this.zone.run(() => {
                const ext = event.url.split(".app/").pop();
                if (ext) {
                    //console.log('token as url ' + ext);
                    this.authService.setGoogleJwtToken(ext);
                    this.router.navigate((['folder/landingpage']));
                }

            });
        });
    }

    ngOnInit(): void {
        if (Capacitor.isNativePlatform()) {
            this.initializeApp();
        }
        else {
            let googleJwtToken: string = this.cookieService.get('googleJwtToken');
            this.authService.setGoogleJwtToken(googleJwtToken);
        }

    }

}
