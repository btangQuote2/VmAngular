import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class HeaderUpdateService {

    private shouldUpdate = new BehaviorSubject<boolean>(false);

    constructor () {}

    get shouldUpdate$ (): Observable<boolean> {

        return this.shouldUpdate.asObservable();
    }

    public triggerUpdate() {

        this.shouldUpdate.next(true);
    }
}
