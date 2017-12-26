import { AuthenticationService } from './shared/services/authentication/authentication.service';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule, NgProgressBrowserXhr } from 'ngx-progressbar';
import { BrowserXhr } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ScriptService } from './shared/services/script.service';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { MatInputModule, MatChipsModule, MatProgressBarModule } from '@angular/material';
// import { BaseComponent } from './shared/components/base.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlashMessagesModule,
    NgProgressModule,
    AppRoutingModule,
    LoginModule,
    FlashMessagesModule,
    MatInputModule,
    MatChipsModule,
    MatProgressBarModule,
    SharedModule
    //  ,
    // RouterModule.forRoot(ROUTES)
  ],
  exports: [NgProgressModule],
  entryComponents: [],
  providers: [
    ScriptService,
    FlashMessagesService,
    { provide: BrowserXhr, useClass: NgProgressBrowserXhr },
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(
      cmp => cmp.location.nativeElement
    );
    // recreate elements
    // store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    // removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
