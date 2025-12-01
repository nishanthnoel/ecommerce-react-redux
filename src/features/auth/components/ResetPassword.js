// src/features/counter/Counter.js
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Navigate } from "react-router-dom";
import {
  resetPasswordAsync,
  selectError,
  selectPasswordReset,
} from "../authSlice";

function ResetPassword() {
  const passwordReset = useSelector(selectPasswordReset);
  const error = useSelector(selectError);
  const query = new URLSearchParams(window.location.search);
  const token = query.get("token");
  const email = query.get("email");
  console.log("token", token);
  console.log("email", email);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // console.log(errors);
  const dispatch = useDispatch();
  // console.log(user); // this logs logincredentails

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      {/* the above line logins the logged in user's details. If user is logged in, it redirects to homepage. Otherwise, it renders the login form. */}
      {email && token ? (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="/ecommerce.png"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Enter New password{" "}
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              noValidate
              onSubmit={handleSubmit((data) => {
                // console.log(data); //this logs the email and password
                // TODO: implementation of this in the backend
                dispatch(
                  resetPasswordAsync({ email, token, password: data.password })
                );
              })}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    New Password
                  </label>
                  <div className="text-sm">
                    {/* <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a> */}
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    // name="password"
                    {...register("password", {
                      required: "password is required",
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message:
                          " Password must contain at least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, Can contain special characters",
                      },
                    })}
                    type="password"
                    // autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />{" "}
                  <p className="text-red-500 text-xs italic">
                    {errors.password && errors.password.message}{" "}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Confirm New Password
                  </label>
                  <div className="text-sm">
                    {/* <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a> */}
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    // name="confirmPassword"
                    {...register("confirmPassword", {
                      required: "confirmPassword is required",
                      validate: (value, formValues) =>
                        value === formValues.password ||
                        "Passwords do not match",
                    })}
                    type="password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  <p className="text-red-500 text-xs italic">
                    {errors.confirmPassword && errors.confirmPassword?.message}{" "}
                    {/* or
                  {errors.confirmPassword?.message} */}
                  </p>
                  {passwordReset && (
                    <p className="text-green-500 text-xs italic">
                      Password reset successful
                    </p>
                  )}
                  {error && (
                    <p className="text-red-500 text-xs italic">
                      {error}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Reset Password
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              Send me back to{" "}
              <Link
                to="/login"
                href="#"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <p> Incorrect Link</p>
      )}
    </>
  );
}

export default ResetPassword;
