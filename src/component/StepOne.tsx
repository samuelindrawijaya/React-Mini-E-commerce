import React from 'react'
import tailwindStyles from '../scripts/contants/style'

interface StepOneProps {
  values: {
    fullName: string
    dateOfBirth: string
    email: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  errors: {
    stepOne?: {
      fullName?: string
      dateOfBirth?: string
      email?: string
    }
  }
  touched: {
    stepOne?: {
      fullName?: boolean
      dateOfBirth?: boolean
      email?: boolean
    }
  }
}

const StepOne = ({
  values,
  onChange,
  onBlur,
  errors,
  touched
}: StepOneProps) => {
  const today = new Date()
  const minDate = new Date(today.setFullYear(today.getFullYear() - 17))
  console.log('minDate : ', minDate)
  const minDateString = minDate.toISOString().split('T')[0]
  console.log('minDate string : ', minDateString)
  console.log(errors.stepOne?.fullName);

  return (
    <>
      <div className={`mb-2 ${tailwindStyles.centerCol}`}>
        <label htmlFor='fullName'>Full Name</label>
        <input
          type='text'
          name='stepOne.fullName'
          id='fullName'
          value={values.fullName}
          onChange={onChange}
          onBlur={onBlur}
          className={`${tailwindStyles.input} ${
            errors.stepOne?.fullName && touched.stepOne?.fullName
              ? 'text-pink-600 border-pink-500'
              : ''
          }`}
        />
        {errors.stepOne?.fullName && touched.stepOne?.fullName ? (
          <div className={tailwindStyles.errorText}>
            {errors.stepOne.fullName}
          </div>
        ) : null}
      </div>
      <div className={`mb-2 ${tailwindStyles.centerCol}`}>
        <label htmlFor='dateOfBirth'>Date of Birth</label>
        <input
          type='date'
          name='stepOne.dateOfBirth'
          id='dateOfBirth'
          value={values.dateOfBirth}
          onChange={onChange}
          onBlur={onBlur}
          max={minDateString}
          className={`${tailwindStyles.input} ${
            errors.stepOne?.dateOfBirth && touched.stepOne?.dateOfBirth
              ? 'text-pink-600 border-pink-500'
              : ''
          }`}
        />
        {errors.stepOne?.dateOfBirth && touched.stepOne?.dateOfBirth ? (
          <div className={tailwindStyles.errorText}>
            {errors.stepOne.dateOfBirth}
          </div>
        ) : null}
      </div>
      <div className={`mb-2 ${tailwindStyles.centerCol}`}>
        <label htmlFor='dateOfBirth'>Email</label>
        <input
          type='email'
          name='stepOne.email'
          id='dateOfBirth'
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
          className={`${tailwindStyles.input} ${
            errors.stepOne?.email && touched.stepOne?.email
              ? 'text-pink-600 border-pink-500'
              : ''
          }`}
        />
        {errors.stepOne?.email && touched.stepOne?.email ? (
          <div className={tailwindStyles.errorText}>{errors.stepOne.email}</div>
        ) : null}
      </div>
    </>
  )
}

export default StepOne
