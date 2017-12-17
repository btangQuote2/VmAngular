import { AbstractControl, ValidatorFn} from '@angular/forms';

export function emailValidator(): ValidatorFn {

  return (control: AbstractControl): {[key: string]: any} => {
const emailRegEx = new RegExp('[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}');

const fieldValue = control.value;
const isValid = emailRegEx.test(fieldValue);
return isValid ? null : {'invalidEmail': {fieldValue}};
};
}






