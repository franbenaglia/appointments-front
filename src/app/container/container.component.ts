import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuController, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp } from 'ionicons/icons';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-container',
  templateUrl: 'container.component.html',
  styleUrls: ['container.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet],
})
export class AppContainer implements OnInit {

  public appPages = [
    { title: 'Turns', url: '/folder/turns-list', icon: 'paper-plane' },
    { title: 'Add Turn', url: '/folder/turns-edit', icon: 'paper-plane' },
    { title: 'Register', url: '/folder/register', icon: 'paper-plane' },
    { title: 'Logout', url: '/folder/logout', icon: 'paper-plane' },
    //{ title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    //{ title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    //{ title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    //{ title: 'Archived', url: '/folder/archived', icon: 'archive' },
    //{ title: 'Trash', url: '/folder/trash', icon: 'trash' },
    //{ title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];

  public labels = [];//'Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'

  showMenu: boolean = true;

  constructor(private userService: UserService, private router: Router, private menuCtrl: MenuController) {
    addIcons({ mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp });
  }

  ngOnInit() {
    this.userService.isLoggedIn().then(
      logged => {
        if (!logged) {
          this.showMenu = false;
          this.router.navigate((['login']));
        }
      }
    );
  }
}

