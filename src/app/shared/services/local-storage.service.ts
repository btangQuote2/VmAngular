import { Injectable } from '@angular/core';
@Injectable()
export class LocalStorageService<T> {

    constructor() { }

    public setArray(key: string, data: T[] ) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    public setString(key: string, data: string ) {
        localStorage.setItem(key, data);
    }

    public getArray(key: string): T[] {
        return JSON.parse(localStorage.getItem(key));
    }

    public getString(key: string): string {
        return localStorage.getItem(key);
    }

    public removeData(key: string) {
        localStorage.removeItem(key);
    }
}
