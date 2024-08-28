import React from 'react'
import tailwindStyles from '../scripts/contants/style'

interface CategoryProps {
  values: {
    category: string
    description: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  errors: {
    CategoryData?: {
      category?: string
      description?: string
    }
  }
  touched: {
    CategoryData?: {
    category?: boolean
    description?: boolean
    }
  }
}

const CategoryForm = ({
  values,
  onChange,
  onBlur,
  errors,
  touched
}: CategoryProps) => {
   console.log('masuk sini');
   console.log(values);
   console.log(errors.CategoryData?.category);
   console.log(touched);
  return (
    <>
      <div className={`mb-2 ${tailwindStyles.centerCol}`}>
        <label htmlFor='category'>Category</label>
        <input
          type='text'
          name='CategoryData.category'
          id='category'
          value={values.category}
          onChange={onChange}
          onBlur={onBlur}
          className={`${tailwindStyles.input} ${
            errors.CategoryData?.category && touched.CategoryData?.category
              ? 'text-pink-600 border-pink-500'
              : ''
          }`}
        />
        {errors.CategoryData?.category && touched.CategoryData?.category ? (
          <div className={tailwindStyles.errorText}>
            {errors.CategoryData.category}
          </div>
        ) : null}
      </div>
      <div className={`mb-2 ${tailwindStyles.centerCol}`}>
        <label htmlFor='description'>Description</label>
        <input
          type='text'
          name='CategoryData.description'
          id='description'
          value={values.description}
          onChange={onChange}
          onBlur={onBlur}
          className={`${tailwindStyles.input} ${
            errors.CategoryData?.description && touched.CategoryData?.description
              ? 'text-pink-600 border-pink-500'
              : ''
          }`}
        />
        {errors.CategoryData?.description && touched.CategoryData?.description ? (
          <div className={tailwindStyles.errorText}>{errors.CategoryData.description}</div>
        ) : null}
      </div>
    </>
  )
}

export default CategoryForm
