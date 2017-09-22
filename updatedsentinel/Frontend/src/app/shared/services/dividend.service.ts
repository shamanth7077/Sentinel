/**
 * Created by joerijackers on 06/07/2017.
 */

import { Http, Response, Headers, RequestOptions  }  from '@angular/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';
import { Dividend}    from '../models/dividend.class';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { UserService } from './user.service';
import {ServiceProvider} from "../models/service-provider.class";
import {BeneficialOwner} from "../models/beneficial-owner.class";
import {Subject} from "rxjs/Subject";
import {MockDividend} from "../data/mock_input";

@Injectable()
export class DividendService {

    private Url: any;
    private COAF: string;
    private dividend: Dividend;
    public coafObs: Subject<string>;
    public divObs:  Subject<Dividend>;


    constructor (private http: Http,
                 private UrlData: UrlService,
                 private userService: UserService) {
        this.Url = this.UrlData;
        this.coafObs = new Subject();
        this.divObs  = new Subject();
        this.setCOAF(undefined);
        this.setDiv(MockDividend.div);
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
        console.log('divService - COAF set to: ');
        console.log(this.COAF);
        if (this.COAF) {
            this.getContractInfo(this.COAF).subscribe(res => {
                this.setDiv(res.dividend);
            });
        } else {
            this.setDiv(MockDividend.div);
        }
    }

    getDiv(): Dividend {
        return this.dividend;
    }

    setDiv(dividend: Dividend) {
        this.dividend = dividend;
        this.divObs.next(dividend);
        console.log('divService - Dividend set to: ');
        console.log(this.dividend);
    }

    CreateContract(dividend: Dividend): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const body = {
            name: 'dividend',
            coaf: dividend.COAF,
            choice: dividend.Choice,
            information: dividend.Information,
            isin: dividend.ISIN
        };
        console.log(body);
        return this.http.post(this.Url.deploy, body, { headers: headers })
            .map((response: Response) => <any> response)
            .catch(err => Observable.throw(err));
    }

    AnnounceContract(dividend: Dividend): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.UrlData.announceContract(dividend.COAF), {}, { headers: headers })
            .map((response: Response) => <any> response)
            .catch(err => Observable.throw(err));
    }

    UpdateContract(dividend: Dividend): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const body = {
            minShares: dividend.minShares,
            divPerShare: dividend.divPerShare,
            divMult: 100,
            holdShares: dividend.holdShares,
            getShares: dividend.getShares,
            votesMax: 1000
        };
        console.log(body);
        return this.http.post(this.UrlData.updateContract(dividend.COAF), body, { headers: headers })
            .map((response: Response) => <any> response)
            .catch(err => Observable.throw(err));
    }

    ExecuteContract(dividend: Dividend): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.UrlData.executeContract(dividend.COAF), {}, { headers: headers })
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

    submitVote(bo: BeneficialOwner): Observable<string> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const body = {
            shareholderId: bo.id,
            dividend: bo.dividendChoice,
            newShares: bo.sharesChoice
        };
        console.log(body);

        return this.http.post(this.UrlData.submitVote(this.COAF), body, { headers: headers })
            .map((response: Response) => <any> response)
            .catch(err => Observable.throw(err));
    }

    getContractInfo(coaf: string): Observable<any> {
        let node = this.userService.getUser();
        let options = new RequestOptions({
            headers: new Headers({'Content-Type': 'application/json'})
        });
        console.log(`divService - Getting contract with coaf ${coaf} from node ${node}`);
        return this.http.get(this.UrlData.getInfo(coaf), options)
            .map((res: Response) => res.json())
            .catch((err: any) => Observable.throw('Server error'));
    }

    getMe(coaf: string): Observable<any> {
        let options = new RequestOptions({
            headers: new Headers({'Content-Type': 'application/json'})
        });
        console.log(`divService - Getting providers for contract with coaf ${coaf}`);
        return this.http.get(this.UrlData.getMe(coaf), options)
            .map((res: Response) => res.json())
            .catch((err: any) => Observable.throw('Server error'));
    }

    getProviders(coaf: string): Observable<any> {
        let options = new RequestOptions({
            headers: new Headers({'Content-Type': 'application/json'})
        });
        console.log(`divService - Getting providers for contract with coaf ${coaf}`);
        return this.http.get(this.UrlData.getProviders(coaf), options)
            .map((res: Response) => res.json())
            .catch((err: any) => Observable.throw('Server error'));
    }

    getShareholders(coaf: string): Observable<any> {
        let options = new RequestOptions({
            headers: new Headers({'Content-Type': 'application/json'})
        });
        console.log(`divService - Getting shareholders for contract with coaf ${coaf}`);
        return this.http.get(this.UrlData.getShareholders(coaf), options)
            .map((res: Response) => res.json())
            .catch((err: any) => Observable.throw('Server error'));
    }
}
