import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule  } from '@angular/http';
import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent }  from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './shared/home/home.component';
import { DividendCreationComponent } from './dividend-creation/dividend-creation.component';
import { DividendUpdateComponent } from './dividend-update/dividend-update.component';
import { StockSplitCreationComponent } from './stocksplit-creation/stocksplit-creation.component';
import { StockSplitUpdateComponent } from './stocksplit-update/stocksplit-update.component';
import { SpCreationComponent } from './sp-creation/sp-creation.component';
import { SpRegisterComponent } from './sp-register/sp-register.component';
import { BoCreationComponent } from './bo-creation/bo-creation.component';
import {BoCreationsComponent}   from './bo-creationstocksplit/bo-creations.component';
import { BoVotingComponent } from './bo-voting/bo-voting.component';
import { StockSplitService } from './shared/services/stocksplit.service';
import { UrlService } from './shared/services/url.service';
import {splitFormComponent } from './shared/split-form/split-form.component';
import { CalendarModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DividendService } from './shared/services/dividend.service';
import { UserService } from './shared/services/user.service';
import { SearchComponent } from './shared/search/search.component';
import { DivFormComponent } from './shared/div-form/div-form.component';
import { stocksplitFormComponent } from './shared/stock-form/stock-form.component';
import { UserFormComponent } from './shared/user-form/user-form.component';
import { UserListComponent } from './shared/user-list/user-list.component';

import { StockSplitComponent } from './shared/stocksplitform/stocksplitform.component';
import { AppRoutingModule } from './app.routes';

@NgModule({
  imports:      [
      BrowserModule,
      FormsModule,
      HttpModule,
      JsonpModule,
      AppRoutingModule,
      MyDatePickerModule,
      CalendarModule,
      BrowserAnimationsModule,
    ],
  declarations: [
      AppComponent,
      DividendCreationComponent,
      DividendUpdateComponent,
      StockSplitCreationComponent,
      StockSplitUpdateComponent,
      SpCreationComponent,
      SpRegisterComponent,
      BoCreationComponent,
      BoVotingComponent,
      NavbarComponent,
      HomeComponent,
      SearchComponent,
      DivFormComponent,
      stocksplitFormComponent,
      UserFormComponent,
      UserListComponent,
      StockSplitComponent,
      BoCreationsComponent,
      splitFormComponent
    ],
  providers: [
      UrlService,
      UserService,
      DividendService,
      StockSplitService,


  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
