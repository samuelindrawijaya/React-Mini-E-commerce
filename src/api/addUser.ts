
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
                name  : body?.stepOne.fullName,
                avatar  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKDjZCK3SgpCVzStNnivj4NESE-BynTP5ffe-WjxhLn0iAM93AOed6b25lKKjOGEOPExI&usqp=CAU'
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