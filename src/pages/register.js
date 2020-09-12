import React from "react";
import { Formik, useField } from "formik";
import { TextField, Button, Container, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Redirect, useHistory, withRouter } from "react-router-dom";
import { register } from "../services/users";
import { Header } from "../components/organism";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().email().required(),
  address: yup.string().email().required(),
  phone: yup.string().email().required(),
  password: yup.string().required(),
  role: yup
    .mixed()
    .oneOf(["ADMIN", "CUSTOMER", "MERCHANT"])
    .required("Role must be filled ADMIN / MERCHANT / CUSTOMER"),
});

const TextFieldWValidation = ({ placeholder, type, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      label={placeholder}
      type={type}
      InputLabelProps={props.InputLabelProps}
      {...field}
      helperText={errorText}
      error={!!errorText}
      variant="outlined"
    />
  );
};

export class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snackbar: {
        isShown: false,
        msg: "",
        parentCallback: this.closeSnackbar(),
      },
    };
  }

  submitLogin = async (data) => {
    let res = await register(data);
    console.log(res);
    if (res !== null) {
      localStorage.setItem("token", res.token);
    } else {
      this.setState({
        snackbar: {
          isShown: true,
          msg: "invalid username and password [x]".split(),
        },
      });
    }
  };

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        isShown: false,
        msg: [],
      },
      pass: false,
    });
  };

  render() {
    if (localStorage.getItem("token")) {
      return <Redirect to="/" />;
    }
    if (this.state.pass) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Header></Header>
        <Container style={{ textAlign: "center" }}>
          <Paper elevation={0} style={{ padding: "2%" }}>
            {this.state.snackbar.isShown && (
              <span style={{ width: "fit-content", color: "red" }}>
                <div onClick={this.closeSnackbar}>
                  {this.state.snackbar.msg}
                </div>
              </span>
            )}
            <Formik
              initialValues={{
                email: "",
                password: "",
                role: "",
                address: "",
                name: "",
                phone: "",
              }}
              onSubmit={(data, { setSubmitting }) => {
                setSubmitting(true);
                console.log("SUBMITTING");

                this.submitLogin(data);

                setSubmitting(false);
                console.log("done submit add data");
              }}
              validationSchema={validationSchema}
            >
              {({ errors, values, isSubmitting, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div style={{ padding: "2%" }}>
                    <TextFieldWValidation
                      placeholder="email"
                      name="email"
                      type="input"
                      as={TextField}
                    />
                  </div>
                  <div style={{ padding: "2%" }}>
                    <TextFieldWValidation
                      placeholder="name"
                      name="name"
                      type="input"
                      as={TextField}
                    />
                    <div style={{ padding: "2%" }}>
                      <TextFieldWValidation
                        placeholder="password"
                        name="password"
                        type="password"
                        as={TextField}
                      />
                    </div>
                    <div style={{ padding: "2%" }}>
                      <TextFieldWValidation
                        placeholder="role"
                        name="role"
                        type="input"
                        as={TextField}
                      />
                    </div>
                    <div style={{ padding: "2%" }}>
                      <TextFieldWValidation
                        placeholder="address"
                        name="address"
                        type="input"
                        as={TextField}
                      />
                    </div>
                    <div style={{ padding: "2%" }}>
                      <TextFieldWValidation
                        placeholder="phone"
                        name="phone"
                        type="input"
                        as={TextField}
                      />
                    </div>
                  </div>
                  <Button disabled={isSubmitting} type="submit">
                    register
                  </Button>
                </form>
              )}
            </Formik>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "black" }}
            >
              <Button>login</Button>
            </Link>
          </Paper>
        </Container>
      </div>
    );
  }
}
