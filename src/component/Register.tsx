import React, { useState } from "react";
import { useFormik } from "formik";
import { RegistrationFormValues } from "../interface/RegistrationFormValues";
import {
  stepOneSchema,
  stepThreeSchema,
  stepTwoSchema,
} from "../Utils/registrationValidationSchemas";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import tailwindStyles from "../scripts/contants/style";
import addUser from "../api/addUser";
import { userDataInterface } from "../interface/userDataInterface";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };
  function delay(time : any) {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  const handleSubmit = (step: number, values: RegistrationFormValues) => {
    console.log(values.stepOne.image);
    if (step === 3) {

      const params: userDataInterface = {
        urlEndpoint: `https://api.escuelajs.co/api/v1/users/`,
        methode: "POST",
        body: values,
      };
      addUser(params)
        .then(function (data) {
          alert(data);
          if (data === "sukses") {
            Swal.fire("Saved!", "Redirect Login Page", "success");
            delay(1000).then(() => { navigate("/login"); 
            });
          }
          else{
            Swal.fire("ERROR! 1 ", data, "error");
          }
        })
        .catch(function (error) {
          Swal.fire("ERROR ! ", error, "error");
        });
    } else {
      handleNext();
    }
  };

  const formik = useFormik<RegistrationFormValues>({
    initialValues: {
      stepOne: {
        fullName: "",
        dateOfBirth: "",
        email: "",
        image : null,
      },
      stepTwo: {
        streetAddress: "",
        city: "",
        state: "",
        zipCode: "",
      },
      stepThree: {
        username: "",
        password: "",
      },
    },
    validationSchema:
      step === 1 ? stepOneSchema : step === 2 ? stepTwoSchema : stepThreeSchema,

    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        handleSubmit(step, values);
        setSubmitting(false);
        console.log(values);
      }, 400);
    },
  });

  const titleDesc = (): string => {
    switch (step) {
      case 1:
        return "Personal Information";
      case 2:
        return "Address Information";
      case 3:
        return "Account Information";
      default:
        return "Unknown Step";
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <form
          onSubmit={formik.handleSubmit}
          className={`mt-8 sm:mx-auto sm:w-full sm:max-w-md`}
        >
          <fieldset className="mb-4">
            <legend className="text-xl font-bold mb-4 text-black">
              Step {step} : {titleDesc()}
            </legend>
            <div>
              {step === 1 ? (
                <StepOne
                  values={formik.values.stepOne}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errors={formik.errors}
                  touched={formik.touched}
                />
              ) : step === 2 ? (
                <StepTwo
                  values={formik.values.stepTwo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errors={formik.errors}
                  touched={formik.touched}
                />
              ) : (
                <StepThree
                  values={formik.values.stepThree}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errors={formik.errors}
                  touched={formik.touched}
                />
              )}
            </div>
          </fieldset>

          <div className="flex justify-between w-full">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className={tailwindStyles.button}
              >
                Back
              </button>
            )}
            {step < 4 && (
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={tailwindStyles.button}
              >
                {step === 3 ? "Submit" : "Next"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
