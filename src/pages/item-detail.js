import React from "react";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import jwt_decode from "jwt-decode";
import { Header } from "../components/organism";
import { serviceDeleteItem } from "../services/item-service";
import { Redirect } from "react-router-dom";

export class ItemDetail extends React.Component {
  state;
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      merchant: {},
      snackbar: {
        isShown: false,
        msg: "",
        color: "green",
        parentCallback: this.closeSnackbar(),
      },
    };
  }

  closeSnackbar = () => {
    this.setState({
      snackbar: {
        isShown: false,
        msg: [],
      },
      pass: false,
    });
  };

  deleteItem = async (itemId) => {
    let res = await serviceDeleteItem(itemId);
    var msg = "fail to delete item [x]";
    var newColor = "red";
    if (res !== null) {
      msg = "success delete item [x]";
      newColor = "green";
      this.setState({
        item:null,
        merchant:null
      })
    }
    this.setState({
      snackbar: {
        isShown: true,
        msg: msg.split(),
        color: newColor,
      },
    });
  };

  async componentDidMount() {
    this.setState({
      item: this.props.location.state.item,
      merchant: this.props.location.state.item.merchant
    });
  }

  render() {
    if(this.state.item === null){
      return <Redirect to="/" />
    }
    return (
      <React.Fragment>
        <Header></Header>
        {this.state.snackbar.isShown && (
          <span style={{ width: "fit-content", color: this.state.snackbar.color }}>
            <div onClick={this.closeSnackbar}>{this.state.snackbar.msg}</div>
          </span>
        )}
        <Card variant="outlined" style={{ minWidth: 275, padding: "5%" }}>
          <CardContent>
            <Grid container spacing-xs-4>
              <Grid item xs>
                <h2 style={{ float: "left", paddingLeft: "5%" }}>
                  {this.state.item.name}
                </h2>
              </Grid>

              <Grid item>
                <h2>IDR {this.state.item.price}</h2>
              </Grid>
            </Grid>

            <Grid container spacing-2>
              <Grid item xs={8} alignContent="flex-start">
                <h5>Decription</h5>
                <div>{this.state.item.description}</div>

                <h5>Category</h5>
                <div>
                  <Chip color="primary" label={this.state.item.category} />
                </div>
              </Grid>

              <Grid item>
                <h5>Merchant</h5>
                <div>
                  <h5>
                    <Chip variant="default" label={this.state.merchant.name} />
                  </h5>
                </div>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            {(localStorage.getItem("token") == null ||
              jwt_decode(localStorage.getItem("token")).sub !==
                this.state.merchant.email) && (
              <Button
                fullWidth={true}
                variant="outlined"
                color="inherit"
                style={{ textTransform: "none" }}
              >
                add to cart
              </Button>
            )}
            {localStorage.getItem("token") !== null &&
              jwt_decode(localStorage.getItem("token")).sub ===
                this.state.merchant.email && (
                <React.Fragment>
                  <Button
                    fullWidth={true}
                    variant="outlined"
                    color="inherit"
                    style={{ textTransform: "none" }}
                  >
                    Edit
                  </Button>
                  <Button
                    fullWidth={true}
                    variant="outlined"
                    color="secondary"
                    style={{ textTransform: "none" }}
                    onClick={() => this.deleteItem(this.state.item.id)}
                  >
                    Delete
                  </Button>
                </React.Fragment>
              )}
          </CardActions>
        </Card>
      </React.Fragment>
    );
  }
}
