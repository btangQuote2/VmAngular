import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, ObservableInput} from 'rxjs/Observable';
import {ServerErrorResponse} from '../../models/response/ServerErrorResponse';
import {Response} from '@angular/http';
// import {routeName} from '../../home/shared/configuration/web-route-names.configuration';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Subject} from 'rxjs/Subject';

@Injectable()

export class NetworkErrorHandler {

    private _displayableError$ = new Subject<string>();

    public displayableErrorMessage$: Observable<string>;

    constructor(
        private _router: Router
    ) {
        this.displayableErrorMessage$ = this._displayableError$.asObservable();
    }

    public processError(error: HttpErrorResponse): ObservableInput<any> {
        console.log('caught error in interceptor');

        if (error instanceof Error) {
            // Client side or network error, what to do? rethrow for now
            return Observable.throw(error.error);
        }

        // 404 errors from the server for some reason are returning with status code 0.
        // TODO: Redirect to 404 page
        if (error.status === 0) {

         //   this._router.navigate([routeName.notFound]);
            return Observable.throw(NetworkErrorHandler.parseErrorMessage(error));

        }

        // Bad request, create ServerErrorResponse object and pass it along for the user to display.
        if (error.status === 400) {

            const validationError = ServerErrorResponse.fromAPIData(error);
            return Observable.throw(validationError);

        }

        if (error.status === 401) {
            this._router.navigate(['login']);
        }

        if (error.status === 500) {
            const badServerError = new ServerErrorResponse('Unexpected response from the server. Please try again later.');
            this._displayableError$.next(badServerError.Message);
            return Observable.throw(badServerError);
        }

        return Observable.throw(error);
    }

    // tslint:disable-next-line:member-ordering
    private static parseErrorMessage(error: Response | any) {
        let errorMessage: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errorMessage = body.error_description ? body.error_description : err;
        } else {
            errorMessage = error.message ? error.message : error.toString();
        }
        return errorMessage;
    }
}
