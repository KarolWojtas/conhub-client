import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UsernameValidator{
    static noSpaces(control: AbstractControl): ValidationErrors | null{
        const value: string = control.value 
        
        if(value.includes(" ")){
            return {noSpaces: true}
        } else {
            return null
        }
    }
}