import * as Yup from "yup";

const CategorySchema = Yup.object().shape({
  CategoryData: Yup.object({
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
  })
});

export { CategorySchema };
