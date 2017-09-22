import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UserService {
    private user: number;
    userObs: Subject<number>;

    constructor() {
        this.userObs = new Subject();
        this.setUser(0);
    }

    getUser(): number {
        return this.user;
    }

    setUser(user: number) {
        this.user = user;
        this.userObs.next(this.user);
        console.log('userService - User set to:');
      console.log(this.user);
    }
}
