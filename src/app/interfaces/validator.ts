import { AbstractControl, ValidationErrors, Validator } from "@angular/forms"
import { Observable } from "rxjs"

interface AsyncValidator extends Validator {
    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>
  
    // inherited from forms/Validator
    validate(control: AbstractControl): ValidationErrors | null
  }