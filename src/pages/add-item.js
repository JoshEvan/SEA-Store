import React from "react";
import { Formik, useField } from "formik";
import { TextField, Button, Container, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { Redirect, useHistory, withRouter } from "react-router-dom";
import { register, getUser } from "../services/users";
import { Header } from "../components/organism";
import jwt_decode from "jwt-decode";
import {serviceAddItem} from '../services/item-service';

const validationSchema = yup.object({
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

export class AddItemPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      snackbar: {
        isShown: false,
        msg: "",
        color: "green",
        parentCallback: this.closeSnackbar(),
      },
    };
  }

  addItem = async (data) => {
    data.merchantId = ''
    let res = await serviceAddItem(data);
    let [msg, color] = ["fail to add item [x]", "red"];
    if (res !== null) {
      [msg, color] = ["success add item [x]", "green"];
    }
    this.setState({
      snackbar: {
        isShown: true,
        msg: msg.split(),
        color: color,
      },
    });
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

  componentDidMount() {
  }

  render() {
    if (localStorage.getItem('token') === null) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <Header></Header>
        <Container style={{ textAlign: "center" }}>
          <Paper elevation={0} style={{ padding: "2%" }}>
            {this.state.snackbar.isShown && (
              <span style={{ width: "fit-content", color: this.state.snackbar.color }}>
                <div onClick={this.closeSnackbar}>
                  {this.state.snackbar.msg}
                </div>
              </span>
            )}
            <Formik
              initialValues={{
                name:'',
                category:'',
                quantity:0,
                description:'',
                price:0
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
                      placeholder="name"
                      name="name"
                      type="input"
                      as={TextField}
                    />
                    <div style={{ padding: "2%" }}>
                      <TextFieldWValidation
                        placeholder="category"
                        name="category"
                        type="input"
                        as={TextField}
                      />
                    </div>
                    <div style={{ padding: "2%" }}>
                      <TextFieldWValidation
                        placeholder="quantity"
                        name="quantity"
                        type="number"
                        as={TextField}
                      />
                    </div>
                    <div style={{ padding: "2%" }}>
                      <TextFieldWValidation
                        placeholder="description"
                        name="description"
                        type="input"
                        as={TextField}
                      />
                    </div>
                    <div style={{ padding: "2%" }}>
                      <TextFieldWValidation
                        placeholder="price"
                        name="price"
                        type="number"
                        as={TextField}
                      />
                    </div>
                  </div>
                  <Button disabled={isSubmitting} type="submit">
                    add item
                  </Button>
                </form>
              )}
            </Formik>
          </Paper>
        </Container>
      </div>
    );
  }
}
