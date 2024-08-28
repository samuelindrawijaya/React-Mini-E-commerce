export interface RegistrationFormValues {
    stepOne: {
      fullName: string
      dateOfBirth: string
      email: string
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