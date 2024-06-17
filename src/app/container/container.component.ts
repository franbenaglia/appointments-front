import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuController, IonMenuButton, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonHeader, IonToolbar, IonButtons, IonTitle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, logoGoogle } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../model/user';

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
    { id: 2, title: 'Add Turn', url: '/folder/turns-edit', icon: 'paper-plane' },
    { id: 4, title: 'Logout', url: '/folder/logout', icon: 'paper-plane' },
  ];

  public labels = [];//'Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'

  showMenu: boolean = true;

  user: User = Object.assign(new User(), '');

  constructor(private userService: UserService, private authService: AuthService, private router: Router, private menuCtrl: MenuController) {
    addIcons({ logoGoogle, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }

  ngOnInit() {
    this.authService.isLoggedIn().then(
      logged => {
        if (!logged) {
          this.showMenu = false;
          this.router.navigate((['login']));
        } else {
          this.userService.getUser().subscribe(user => {
            this.user = user;
            if (this.user.role === 'admin') {
              this.appLinks.push({ id: 3, title: 'Turn Range', url: '/folder/turns-range', icon: 'paper-plane' });
            }
            this.appLinks.sort((a, b) => { return a.id - b.id });
            this.appPages.push(... this.appLinks);
          })
        }
      }
    );
  }

}

