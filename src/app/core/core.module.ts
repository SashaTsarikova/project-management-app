import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    WelcomeComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [HeaderComponent],
})
export class CoreModule {}
