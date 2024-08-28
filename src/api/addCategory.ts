import { categoryModel } from "../interface/categoryModel";
import { paramFetchData } from "../interface/paramAPI";

export const postCategory = async({ urlEndpoint, methode, category,description } : paramFetchData ) : Promise<categoryModel | undefined> => {
    try
    {
    
        const response = await fetch(urlEndpoint, {
            method: methode,
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name: category,
                description: description,
            })
          }) /*end fetch */;
          if(response.ok)
          {
            const params : categoryModel = {
                category    : category,
                response    : 'OK'
            };
            
            return params;
          }
    }
    catch (error: unknown) 
    {   
        let params : categoryModel = {
            category    : '',
            response    : ''
        };
        if (error instanceof Error) {
             params = {
                category    : category,
                response    : error.message
            };
        } else {
            params = {
                category    : category,
                response    : 'ERROR'
            };
        }
        
        return params;
    }

}

export default postCategory;