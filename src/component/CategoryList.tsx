import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./ModalCategory";
import CategoryController from "./CategoryController";
import Swal from 'sweetalert2'
import deleteCategory from "../api/deleteCategory";
import { paramFetchData } from "../interface/paramAPI";
import { categoryModel } from "../interface/categoryModel";
// Define the shape of a Todo item
interface Category {
    id: number;
    name: string;
    description: string;
}


const CategoryList: React.FC = () => {
    const [category, setCategory] = useState<Category[]>([]);
    // const [newTodoTitle, setNewTodoTitle] = useState<string>("");
    const navigate = useNavigate();

    const [isOpen,setOpen] = useState(false);

    useEffect(() => {
        fetchCategory();
    },[]);

    const [title,setTitle] = useState('Add Category');
    const [metode,setMetode] = useState('POST');
    const [inputcategory,setInputCategory] = useState('');
    const [inputdesc,setInputDesc] = useState('');

    const [id,setId] = useState(0);
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = (methode:string, id:number, category: string, desc : string) => {
        if(methode === 'PUT')
        {
            setTitle('Edit Category');
            setMetode('PUT');
            if(id !== 0)
            {
                setId(id);
                setInputCategory(category);
                setInputDesc(desc);
            }
            
        }
        else{
            setTitle('Add Category')
            setMetode('POST');
            setId(0);
            setInputCategory('');
            setInputDesc('');
        }
        setOpen(true);
    }

    const handleDelete = (methode:string, id:number) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            const params : paramFetchData = { 
                urlEndpoint  : `http://localhost:8080/categories/${id}`,
                methode      : methode,
                category     : '',
                description  : '',
                id           : id
              };
            deleteCategory(params)
            .then(function(data){
                const categoryData : categoryModel | undefined = data;
                if(categoryData?.response === 'OK')
                {
                    Swal.fire({
                        title: "Deleted!",
                        text: 'Data Category : ' + categoryData.category + ' Deleted !!',
                        icon: "success"
                      });
                      setCategory(category.filter((category) => category.id !== id));
                }
                else
                {
                    Swal.fire({
                        title: "Deleted!",
                        text: 'Data Category : ' + categoryData?.response + ' Deleted !!',
                        icon: "error"
                      });
                }
          
              })
              .catch(function(error){
                  console.log('connection timeout, retry maybe ?')
              })
          }
        });
    }

    const fetchCategory = async () => {
        try {
            const response = await fetch('http://localhost:8080/categories/' ,{
            });
            if(response.ok){
                const data = await response.json();
                setCategory(data);
            }
            
        } catch (error) {
            console.error("Error fetching todos:", error);
            navigate("/login"); // Redirect to login on error
        }
    };

    return (
       
        <div className="shadow-lg rounded-lg overflow-hidden mx-4 md:mx-10">
            <br></br>
            
            <div className="text-gray-900 bg-gray-200">
                <div className="p-4 flex">
                    <h1 className="text-3xl">Category Management</h1>
                    <button type="button"  
                    onClick={() => handleOpen('POST', 0, '', '')}  
                    className=" absolute top-50 right-20 h-10 w-35 mr-4 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Tambah Data</button>
                    
                    <Modal isOpen = {isOpen} onClose = {handleClose} title={title}>
                         <CategoryController isOpen = {isOpen} onClose = {handleClose} methode={metode}  id={id} category={inputcategory} desc={inputdesc} />
                    </Modal> 
                   
                </div>
                <div className="px-3 py-4 flex justify-center">
                    <table className="w-full text-md bg-white shadow-md rounded mb-4">
                        <tbody>
                            <tr className="border-b">
                                <th className="text-left p-3 px-5">Category</th>
                                <th className="text-left p-3 px-5">Description</th>
                                <th></th>
                            </tr>
                            {category.map((item) => (
                                <tr key={item.id} className="border-b hover:bg-orange-100 bg-gray-100">
                                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.description}</td>
                                    <td className="p-3 px-5 flex justify-end">
                                        <button type="button"
                                            onClick={() => handleOpen('PUT', item.id, item.name,item.description)}  
                                            className="mr-3 text-sm bg-orange-400 hover:bg-orange-500 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Edit</button>
                                            
                                            <button
                                                type="button"
                                                onClick={() => handleDelete('DELETE', item.id)}  
                                                className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default CategoryList;
