import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './pages/user/user.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent],
  imports: [
    UserRoutingModule,
    SharedModule,
  ],
})
export class UserModule { }
