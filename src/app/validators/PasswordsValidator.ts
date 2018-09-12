import { AbstractControl, ValidationErrors } from "@angular/forms";

export class PasswordsValidator{
    static match(controlGroup: AbstractControl): ValidationErrors | null{
        if(controlGroup.get('password').value == controlGroup.get('confirmPassword').value){
            return null
        } else {
            return {notMatch: true}
        }
    }
} 