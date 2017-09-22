/**
 * Created by joerijackers on 06/07/2017.
 */

import { Http, Response, Headers, RequestOptions  }  from '@angular/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { StockSplit}    from '../models/stocksplit.class';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { UserService } from './user.service';
import {ServiceProvider} from "../models/service-provider.class";
import {BeneficialOwner} from "../models/beneficial-owner.class";
import {Subject} from "rxjs/Subject";
import {MockStockSplit} from "../data/mock_input";

@Injectable()
export class StockSplitService {

    private Url: any;
    private COAF: string;
    private stocksplit: StockSplit;
    public coafObs: Subject<string>;
    public divObs:  Subject<StockSplit>;


    constructor (private http: Http,
                 private UrlData: UrlService,
                 private userService: UserService) {
        this.Url = this.UrlData;
        this.coafObs = new Subject();
        this.divObs  = new Subject();
        this.setCOAF(undefined);
        this.setDiv(MockStockSplit.stocksplit);
    }
    refresh() {
        this.setCOAF(undefined);
        this.setCOAF(this.COAF);
    }
    getCOAF(): string {
        return this.COAF;
    }

    setCOAF(_COAF: string) {
        this.COAF = _COAF;
        this.coafObs.next(this.COAF);
        if (this.COAF) {
            this.getContractInfo(this.COAF).subscribe(res => this.setDiv(res.stocksplit));
        } else {
            this.setDiv(MockStockSplit.stocksplit);
        }
    }

    getDiv(): StockSplit {
        return this.stocksplit;
    }

    setDiv(stocksplit: StockSplit) {
        this.stocksplit = stocksplit;
        this.divObs.next(stocksplit);
    }

    CreateContract(stocksplit: StockSplit): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const body = {
            name: 'split',
            coaf: stocksplit.COAF,
            choice: stocksplit.Choice,
            information: stocksplit.Information,
            isin: stocksplit.ISIN
        };
        console.log(body);
        return this.http.post(this.Url.deploy, body, { headers: headers })
            .map((response: Response) => <any> response)
            .catch(err => Observable.throw(err));
    }

    AnnounceContract(stocksplit: StockSplit): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.UrlData.announceContractsplit(stocksplit.COAF), {}, { headers: headers })
            .map((response: Response) => <any> response)
            .catch(err => Observable.throw(err));
    }

    UpdateContract(stocksplit: StockSplit): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const body = {
            splitRatio: stocksplit.splitratio
        };
        console.log(body);
        return this.http.post(this.UrlData.updateContractsplit(stocksplit.COAF), body, { headers: headers })
            .map((response: Response) => <any> response)
            .catch(err => Observable.throw(err));
    }

    ExecuteContract(stocksplit: StockSplit): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.UrlData.executeContractsplit(stocksplit.COAF), {}, { headers: headers })
            .map((response: Response) => <any> response)
            .catch(err => Observable.throw(err));
    }

     allowSP(sp: ServiceProvider): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const body = {
            name: sp.name,
            votes: sp.votes
        };
        console.log(body);
        return this.http.post(this.UrlData.allowSP(sp.COAF), body, { headers: headers })
            .map((response: Response) => <any> response)
            .catch(err => Observable.throw(err));
    }

    allowBO(bo: BeneficialOwner): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const body = {
            shareholderName: bo.name,
            shares: bo.sharesTotal
        };
        console.log(body);
        return this.http.post(this.UrlData.allowBO(this.COAF), body, { headers: headers })
            .map((response: Response) => <any> response)
            .catch(err => Observable.throw(err));
    }

    getContractInfo(coaf: string): Observable<any> {
        let node = this.userService.getUser();
        let options = new RequestOptions({
            headers: new Headers({'Content-Type': 'application/json'})
        });
        console.log(`Getting contract with coaf ${coaf} from node ${node}`);
        return this.http.get(this.UrlData.getInfosplit(coaf), options)
            .map((res: Response) => res.json())
            .catch((err: any) => Observable.throw('Server error'));
    }

    getMe(coaf: string): Observable<any> {
        let options = new RequestOptions({
            headers: new Headers({'Content-Type': 'application/json'})
        });
        console.log(`Getting providers for contract with coaf ${coaf}`);
        return this.http.get(this.UrlData.getMe(coaf), options)
            .map((res: Response) => res.json())
            .catch((err: any) => Observable.throw('Server error'));
    }

    getProviders(coaf: string): Observable<any> {
        let options = new RequestOptions({
            headers: new Headers({'Content-Type': 'application/json'})
        });
        console.log(`Getting providers for contract with coaf ${coaf}`);
        return this.http.get(this.UrlData.getProviders(coaf), options)
            .map((res: Response) => res.json())
            .catch((err: any) => Observable.throw('Server error'));
    }

    getShareholders(coaf: string): Observable<any> {
        let options = new RequestOptions({
            headers: new Headers({'Content-Type': 'application/json'})
        });
        console.log(`Getting shareholders for contract with coaf ${coaf}`);
        return this.http.get(this.UrlData.getShareholderssplit(coaf), options)
            .map((res: Response) => res.json())
            .catch((err: any) => Observable.throw('Server error'));
    }
}
