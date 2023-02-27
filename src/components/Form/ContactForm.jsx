import React, { PureComponent } from "react";
import { Formik } from "formik";
import { Display } from "./display/Display";
// import { message } from "antd";
// import { send } from "@emailjs/browser";
// import { toast } from 'react-toastify';

const initialValues = {
  email: "",
  password: "",
};

export default class ContactForm extends PureComponent {
  handleSubmit = (formProps, { resetForm }) => {
    // console.log(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_SERVICE_ID, formProps, process.env.REACT_APP_PUBLIC_KEY)
    // send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, formProps, process.env.REACT_APP_PUBLIC_KEY).then(function(response) {
    //   message.success('Mail sent 👍');
    //   //  toast('Mail sent 👍', {
    //   //     position: "top-right",
    //   //     autoClose: 5000,
    //   //     hideProgressBar: false,
    //   //     closeOnClick: true,
    //   //     pauseOnHover: true,
    //   //     draggable: true,
    //   //     progress: undefined,
    //   //     theme: "colored",
    //   //   });
    //     resetForm({values: ''})
    // }, function(error) {
    //   message.error('Sorry an error occured')
    //   //  toast('Sorry an error occured', {
    //   //     position: "top-right",
    //   //     autoClose: 5000,
    //   //     hideProgressBar: false,
    //   //     closeOnClick: true,
    //   //     pauseOnHover: true,
    //   //     draggable: true,
    //   //     progress: undefined,
    //   //     theme: "colored",
    //   //   });
    //     resetForm({values: ''})
    // });
    // alert(
    //   `Email: ${email} \nName: ${name} \nMessage: ${message}\n}`
    // );
  };

  render = () => (
    <Formik
      initialValues={initialValues}
      onSubmit={this.handleSubmit}
      // render={Display}
    >
      {Display}
    </Formik>
  );
}
