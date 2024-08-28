import React from 'react'
import tailwindStyles from '../scripts/contants/style'

interface StepTwoProps {
  values: {
    streetAddress: string
    city: string
    state: string
    zipCode: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  errors: {
    stepTwo?: {
      streetAddress?: string
      city?: string
      state?: string
      zipCode?: string
    }
  }
  touched: {
    stepTwo?: {
      streetAddress?: boolean
      city?: boolean
      state?: boolean
      zipCode?: boolean
    }
  }
}

const StepTwo = ({
  values,
  onChange,
  onBlur,
  errors,
  touched
}: StepTwoProps) => {
  return (
    <>
      <div className={`mb-2 ${tailwindStyles.centerCol}`}>
        <label htmlFor='streetAddress'>Street Address</label>
        <input
          type='text'
          name='stepTwo.streetAddress'
          id='streetAddress'
          value={values.streetAddress}
          onChange={onChange}
          onBlur={onBlur}
          className={`${tailwindStyles.input} ${
            errors.stepTwo?.streetAddress && touched.stepTwo?.streetAddress
              ? 'text-pink-600 border-pink-500'
              : ''
          }`}
        />
        {errors.stepTwo?.streetAddress && touched.stepTwo?.streetAddress ? (
          <div className={tailwindStyles.errorText}>
            {errors.stepTwo.streetAddress}
          </div>
        ) : null}
      </div>
      <div className={`mb-2 ${tailwindStyles.centerCol}`}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          name='stepTwo.city'
          id='city'
          value={values.city}
          onChange={onChange}
          onBlur={onBlur}
          className={`${tailwindStyles.input} ${
            errors.stepTwo?.city && touched.stepTwo?.city
              ? 'text-pink-600 border-pink-500'
              : ''
          }`}
        />
        {errors.stepTwo?.city && touched.stepTwo?.city ? (
          <div className={tailwindStyles.errorText}>{errors.stepTwo.city}</div>
        ) : null}
      </div>
      <div className={`mb-2 ${tailwindStyles.centerCol}`}>
        <label htmlFor='state'>State</label>
        <input
          type='text'
          name='stepTwo.state'
          id='state'
          value={values.state}
          onChange={onChange}
          onBlur={onBlur}
          className={`${tailwindStyles.input} ${
            errors.stepTwo?.state && touched.stepTwo?.state
              ? 'text-pink-600 border-pink-500'
              : ''
          }`}
        />
        {errors.stepTwo?.state && touched.stepTwo?.state ? (
          <div className={tailwindStyles.errorText}>{errors.stepTwo.state}</div>
        ) : null}
      </div>
      <div className={`mb-2 ${tailwindStyles.centerCol}`}>
        <label htmlFor='zipCode'>Zip Code</label>
        <input
          type='text'
          name='stepTwo.zipCode'
          id='zipCode'
          value={values.zipCode}
          onChange={onChange}
          onBlur={onBlur}
          className={`${tailwindStyles.input} ${
            errors.stepTwo?.zipCode && touched.stepTwo?.zipCode
              ? 'text-pink-600 border-pink-500'
              : ''
          }`}
        />
        {errors.stepTwo?.zipCode && touched.stepTwo?.zipCode ? (
          <div className={tailwindStyles.errorText}>
            {errors.stepTwo.zipCode}
          </div>
        ) : null}
      </div>
    </>
  )
}

export default StepTwo
