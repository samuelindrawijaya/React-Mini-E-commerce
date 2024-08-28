import { categoryModel } from "../interface/categoryModel";
import { paramFetchData } from "../interface/paramAPI";

export const deleteCategory = async({ urlEndpoint, methode,category,description,id } : paramFetchData ) : Promise<categoryModel | undefined> => {
    try
    {
    
        const response = await fetch(urlEndpoint, {
            method: methode,
            headers: {
                'Content-type': 'application/json',
            }
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

export default deleteCategory;