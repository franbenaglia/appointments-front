import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuController, IonMenuButton, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonHeader, IonToolbar, IonButtons, IonTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, logoGoogle } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { EMPTY, catchError } from 'rxjs';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-container',
  templateUrl: 'container.component.html',
  styleUrls: ['container.component.scss'],
  standalone: true,
  imports: [IonTitle, IonMenuButton, IonButtons, IonToolbar, IonHeader, RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet],
})
export class AppContainer implements OnInit {

  public appPages = [];
  private appLinks = [
    { id: 1, title: 'Turns', url: '/folder/turns-list', icon: 'paper-plane' },
    { id: 2, title: 'Select Event', url: '/folder/select-event', icon: 'paper-plane' },
    { id: 3, title: 'Add Turn', url: '/folder/turns-edit', icon: 'paper-plane' },
    { id: 6, title: 'Logout', url: '/folder/logout', icon: 'paper-plane' },
  ];

  public labels = [];//'Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'

  showMenu: boolean = true;

  user: User = Object.assign(new User(), '');

  constructor(private appService: AppService, private userService: UserService, private authService: AuthService, private router: Router, private menuCtrl: MenuController) {
    addIcons({ logoGoogle, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }

  ngOnInit() {

    this.authService.isLoggedIn().then(
      logged => {
        if (!logged) {
          this.showMenu = false;
          this.router.navigate((['login']));
        } else {

          this.userService.getUser()
            .pipe(catchError(() => {
              this.appPages.push(... this.appLinks);
              return EMPTY;
            }))
            .subscribe({
              next: (user) => {
                this.user = user;
                if (this.user.role === 'admin') {
                  this.appLinks.push({ id: 4, title: 'Turn Range', url: '/folder/turn-range', icon: 'paper-plane' });
                  this.appLinks.push({ id: 5, title: 'Turn Range List', url: 'folder/turn-range-list', icon: 'paper-plane' });
                }
                this.appLinks.sort((a, b) => { return a.id - b.id });
                this.appPages.push(... this.appLinks);
              },
              error: (e) => {
                this.appPages.push(... this.appLinks);
                console.error(e);
              },
            });


        }
      }
    );

    this.appService.getHiddenMenu().subscribe(hm => {
      this.showMenu = !hm;
    })

  }

}

