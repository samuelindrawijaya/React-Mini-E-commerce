export interface RegistrationFormValues {
    stepOne: {
      fullName: string
      dateOfBirth: string
      email: string
      image : File | null
    }
    stepTwo: {
      streetAddress: string
      city: string
      state: string
      zipCode: string
    }
    stepThree: {
      username: string
      password: string
    }
  }