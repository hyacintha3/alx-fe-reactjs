import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function FormikForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Form submitted:", values);
    alert("Registration successful!");
    resetForm();
  };

  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "User Registration (Formik)"),
    React.createElement(
      Formik,
      {
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
      },
      React.createElement(
        Form,
        null,
        React.createElement(
          "div",
          null,
          React.createElement(Field, {
            type: "text",
            name: "username",
            placeholder: "Username",
          }),
          React.createElement(ErrorMessage, {
            name: "username",
            component: "p",
          })
        ),
        React.createElement(
          "div",
          null,
          React.createElement(Field, {
            type: "email",
            name: "email",
            placeholder: "Email",
          }),
          React.createElement(ErrorMessage, {
            name: "email",
            component: "p",
          })
        ),
        React.createElement(
          "div",
          null,
          React.createElement(Field, {
            type: "password",
            name: "password",
            placeholder: "Password",
          }),
          React.createElement(ErrorMessage, {
            name: "password",
            component: "p",
          })
        ),
        React.createElement(
          "button",
          { type: "submit" },
          "Register"
        )
      )
    )
  );
}

export default FormikForm;