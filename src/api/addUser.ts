
import { userDataInterface } from "../interface/userDataInterface";

export const addUser = async({ urlEndpoint, methode, body } : userDataInterface ) : Promise<string | undefined> => {
    try
    {
    
        const response = await fetch(urlEndpoint, {
            method: methode,
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: body?.stepOne.email,
                password: body?.stepThree.password,
                username : body?.stepThree.username,
                fullname  : body?.stepOne.fullName,
                address   : body?.stepTwo.streetAddress
            })
          }) /*end fetch */;
          if(response.ok)
          {
            return 'sukses';
          }
    }
    catch (error: unknown) 
    {   
        if (error instanceof Error) {
            return error.message;
        } else {
            return 'ERROR';
        }

    }

}

export default addUser;