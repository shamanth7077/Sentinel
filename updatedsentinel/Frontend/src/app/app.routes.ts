import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './shared/home/home.component';
import { DividendCreationComponent } from './dividend-creation/dividend-creation.component';
import { DividendUpdateComponent } from './dividend-update/dividend-update.component';
import { StockSplitCreationComponent } from './stocksplit-creation/stocksplit-creation.component';
import { StockSplitUpdateComponent } from './stocksplit-update/stocksplit-update.component';
import { SpCreationComponent } from './sp-creation/sp-creation.component';
import { BoCreationComponent } from './bo-creation/bo-creation.component';
import { BoCreationsComponent } from './bo-creationstocksplit/bo-creations.component';
import { BoVotingComponent } from './bo-voting/bo-voting.component';
import {SpRegisterComponent} from "./sp-register/sp-register.component";


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'create/dividend-option', component: DividendCreationComponent},
    {path: 'update/dividend-option', component: DividendUpdateComponent },
    {path: 'create/stocksplit', component: StockSplitCreationComponent},
   {path: 'update/stocksplit', component: StockSplitUpdateComponent },
    {path: 'action/csd', component: SpCreationComponent},
    {path: 'action/sp', component: BoCreationComponent},
      {path: 'action/sps', component: BoCreationsComponent},
    {path: 'register/sp', component: SpRegisterComponent},
    {path: 'action/bo', component: BoVotingComponent},
    { path: '**',  component: HomeComponent  }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
