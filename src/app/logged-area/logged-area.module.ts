import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { SearchComponent } from './search/search.component';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'search',
        component: SearchComponent
      },
      {
        path: 'followers',
        component: FollowersComponent
      },
      {
        path: 'following',
        component: FollowingComponent
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      }
    ])
  ],
  declarations: [SearchComponent, UsersComponent, FollowersComponent, FollowingComponent, UserProfileComponent]
})
export class LoggedAreaModule { }
