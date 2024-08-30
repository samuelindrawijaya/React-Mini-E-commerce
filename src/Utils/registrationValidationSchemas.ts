import * as Yup from 'yup'

const stepOneSchema = Yup.object().shape({
  stepOne: Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    dateOfBirth: Yup.date()
      .required('Date of Birth is required')
      .test('age', 'You must be at least 17 years old', (value) => {
        if (!value) return false
        const today = new Date()
        const minAgeDate = new Date(today.setFullYear(today.getFullYear() - 17))
        return value <= minAgeDate
      }),
    email: Yup.string()
      .required('Email is required')
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        'Invalid email format'
      ),
      
  })
})

const stepTwoSchema = Yup.object().shape({
  stepTwo: Yup.object({
    streetAddress: Yup.string().required('Street Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string()
      .matches(/^[0-9]{5}$/, 'Invalid Zip Code format')
      .required('Zip Code is required')
  })
})

const stepThreeSchema = Yup.object().shape({
  stepThree: Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain a lowercase letter')
      .matches(/[A-Z]/, 'Password must contain an uppercase letter')
      .matches(/[0-9]/, 'Password must contain a number')
      .required('Password is required')
  })
})

export { stepOneSchema, stepTwoSchema, stepThreeSchema }
