import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { AppContainer } from './container/container.component';
import { LoginPage } from "./login/login.page";
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [AppContainer, LoginPage, IonRouterOutlet, IonApp]
})
export class AppComponent implements OnInit {

    constructor(private cookieService: CookieService, private authService: AuthService,) {

    }

    ngOnInit(): void {
        let googleJwtToken: string = this.cookieService.get('googleJwtToken');
        this.authService.setGoogleJwtToken(googleJwtToken);
    }

}
