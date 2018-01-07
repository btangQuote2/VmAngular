// Defines the NavigationLinks model as returned by /Shared/Navigation
import {BaseClass} from '../BaseClass';

export class Navigation extends BaseClass {
    Action: string;
    Children?: Navigation[];
    Key: string;
    System: number;
    Title: string;

    constructor(json) {

        super();
        this.fromObject(json);
    }
}
