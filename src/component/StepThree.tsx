import React, { useState } from 'react'
import tailwindStyles from '../scripts/contants/style'

interface StepThreeProps {
  values: {
    username: string
    password: string
  }
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  errors: {
    stepThree?: {
      username?: string
      password?: string
    }
  }
  touched: {
    stepThree?: {
      username?: boolean
      password?: boolean
    }
  }
}

const StepThree = ({
  values,
  onChange,
  onBlur,
  errors,
  touched
}: StepThreeProps) => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <div className={`mb-2 ${tailwindStyles.centerCol}`}>
        <label htmlFor='username'>username</label>
        <input
          type='text'
          name='stepThree.username'
          id='username'
          value={values.username}
          onChange={onChange}
          onBlur={onBlur}
          className={`${tailwindStyles.input} ${
            errors.stepThree?.username && touched.stepThree?.username
              ? 'text-pink-600 border-pink-500'
              : ''
          }`}
        />
        {errors.stepThree?.username && touched.stepThree?.username ? (
          <div className={tailwindStyles.errorText}>
            {errors.stepThree.username}
          </div>
        ) : null}
      </div>
      <div className={`mb-2 ${tailwindStyles.centerCol}`}>
        <label htmlFor='password'>Password</label>
        <div className='relative w-full'>
          <input
            type={showPassword ? 'text' : 'password'}
            name='stepThree.password'
            id='password'
            value={values.password}
            onChange={onChange}
            onBlur={onBlur}
            className={`${tailwindStyles.input} ${
              errors.stepThree?.password && touched.stepThree?.password
                ? 'text-pink-600 border-pink-500'
                : ''
            }`}
          />
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className='absolute inset-y-0 right-0 flex items-center pr-3'
          >
            {showPassword ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 text-gray-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M3.75 12a8.25 8.25 0 0115.452-3.534m-2.1 2.137A8.25 8.25 0 013.75 12m12.302-3.748A8.25 8.25 0 0112 15.75M6.9 15.37a8.25 8.25 0 0011.1-3.137'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 text-gray-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M15 12a3 3 0 01-6 0 3 3 0 016 0zm6.293-5.293A9.95 9.95 0 0121 12a9.95 9.95 0 01-1.707 5.293M4.707 6.707A9.95 9.95 0 003 12a9.95 9.95 0 001.707 5.293m10.586-5.293a3 3 0 00-6 0m-3.5-2.5A9.95 9.95 0 0121 12a9.95 9.95 0 01-1.707 5.293M9 12a3 3 0 01-6 0 3 3 0 016 0z'
                />
              </svg>
            )}
          </button>
        </div>
        {errors.stepThree?.password && touched.stepThree?.password ? (
          <div className={tailwindStyles.errorText}>
            {errors.stepThree.password}
          </div>
        ) : null}
      </div>
    </>
  )
}

export default StepThree
