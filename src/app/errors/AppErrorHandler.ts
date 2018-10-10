import { ErrorHandler } from "@angular/core";
import { AuthError } from "src/app/errors/AuthError";

export class AppErrorHandler implements ErrorHandler{
    
    handleError(error:  Error): void {
        if(error instanceof AuthError){
            console.log(`Auth error: ${error.message}`)
        } else {
            console.log(`Error: ${error.message}`)

        }
    }
    
}
