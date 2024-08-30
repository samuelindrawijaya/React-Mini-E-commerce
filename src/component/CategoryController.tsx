import { useFormik } from "formik";
import CategoryForm from "../View/CategoryForm";
import { CategorySchema } from "../Utils/categoryValidationSchema";
import { categoryInput } from "../interface/categoryInterface";
import postCategory from "../api/addCategory";
import { paramFetchData } from "../interface/paramAPI";
import { categoryModel } from "../interface/categoryModel";
import Swal from "sweetalert2";
import putCategory from "../api/putCategory";
// Ensure this import is correct

// Define your validation schema
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  methode: string;
  id: number;
  category: string;
  desc: string;
}

const CategoryController = ({
  isOpen,
  onClose,
  methode,
  id,
  category,
  desc,
}: ModalProps) => {
  function delay(time: any) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  const handleSubmit = (values: categoryInput) => {
    //call function POST / EDIT
    if (methode === "POST") {
      const params: paramFetchData = {
        urlEndpoint: "http://localhost:8080/categories/",
        methode: methode,
        category: values.CategoryData.category,
        description: values.CategoryData.description,
        id: id,
      };

      postCategory(params)
        .then(function (data) {
          const categoryData: categoryModel | undefined = data;
          if (categoryData?.response === "OK") {
            onClose();
            Swal.fire("Saved!", "", "success");
            delay(2000).then(() => {
              window.location.reload();
            });
          } else {
            alert(categoryData?.response);
          }
        })
        .catch(function (error) {
          console.log("connection timeout, retry maybe ?");
        });
    } else {
      Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const params: paramFetchData = {
            urlEndpoint: `http://localhost:8080/categories/${id}`,
            methode: methode,
            category: values.CategoryData.category,
            description: values.CategoryData.description,
            id: id,
          };
          putCategory(params)
            .then(function (data) {
              const categoryData: categoryModel | undefined = data;
              if (categoryData?.response === "OK") {
                onClose();
                Swal.fire("Saved!", "", "success");
                delay(2000).then(() => {
                  window.location.reload();
                });
              } else {
                Swal.fire(categoryData?.response, "", "error");
              }
            })
            .catch(function (error) {
              Swal.fire("connection timeout, retry maybe ?", "", "error");
            });
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      CategoryData: {
        category: category,
        description: desc,
      },
    },
    validationSchema: CategorySchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        handleSubmit(values);
        setSubmitting(false);
        console.log("Formik values:", values);
      }, 200); // Simulate async operation
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="border-2 border-gray-300 p-4 rounded-md flex flex-col justify-between w-full"
      >
        <fieldset className="mb-4">
          <CategoryForm
            values={formik.values.CategoryData}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errors={formik.errors}
            touched={formik.touched}
          />
        </fieldset>
        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
          <button
            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="submit"
            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            disabled={formik.isSubmitting}
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default CategoryController;
