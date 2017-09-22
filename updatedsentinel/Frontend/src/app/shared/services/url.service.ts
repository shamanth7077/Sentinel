import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {UserService} from "./user.service";

@Injectable()
export class UrlService {
    public url    = 'http://localhost:8000';
    public deploy = this.url + '/api/0/deploy_sol';
    private node: number;

    constructor(private userService: UserService) {
        this.node = +this.userService.getUser();
        this.userService.userObs.subscribe(
            user => this.node = +user,
            err => console.log(err)
        );
    }

    getInfo(COAF: string): string {
      return this.url + '/api/' + this.node + '/' + COAF + '/get_info';
    }

    getSecurityInfo(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/security_id';
    }

    getMe(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_me';
    }

    getProviders(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_providers';
    }

    getShareholders(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_shareholders';
    }

    announceContract(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/announce';
    }

    updateContract(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/update';
    }

    allowSP(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/allow_provider';
    }

    allowBO(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/allow_shareholder';
    }
    submitVote(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/submit_vote';
    }
    executeContract(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/execute';
    }
    executeContractsplit(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/executesplit';
    }
    updateContractsplit(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/updatesplit';
    }
    announceContractsplit(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/announcesplit';
    }
    getInfosplit(COAF: string): string {
        const get = this.url + '/api/' + this.node + '/' + COAF + '/get_infosplit';
        console.log(get);
        return get;
    }
    getShareholderssplit(COAF: string): string {
        return this.url + '/api/' + this.node + '/' + COAF + '/get_shareholdersplit';
    }

}
