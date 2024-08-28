import { RegistrationFormValues } from "./RegistrationFormValues";

export interface userDataInterface { 
    urlEndpoint : string, 
    methode? : string,
    body?  : RegistrationFormValues
}