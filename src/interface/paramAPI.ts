import { RegistrationFormValues } from "./RegistrationFormValues";

export interface paramFetchData { 
    urlEndpoint : string, 
    methode? : string,
    category : string,
    description : string,
    id? : number,
    userData?  : RegistrationFormValues
}