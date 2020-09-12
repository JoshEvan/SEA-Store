import React from "react";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import jwt_decode from "jwt-decode";
import { Header } from "../components/organism";

export class ItemDetail extends React.Component {
  state;
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      merchant: {},
    };
  }

  loadItem = async () => {
    console.log("posting item request");
  };

  async componentDidMount() {
    this.setState({
      item: this.props.location.state.item,
      merchant: this.props.location.state.item.merchant,
    })
  }

  render() {
    return (
      <React.Fragment>
      <Header></Header>
      <Card variant="outlined" style={{minWidth: 275, padding:'5%'}}>
        <CardContent>
          <Grid container spacing-xs-4>
            <Grid item xs>
              <h2 style={{float:'left', paddingLeft:'5%'}}>{this.state.item.name}</h2>
            </Grid>
            
            <Grid item>
              <h2>IDR {this.state.item.price}</h2>
            </Grid>
          </Grid>

          <Grid container spacing-2>
            <Grid item xs={8} alignContent='flex-start'>
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
                <h5><Chip variant="default" label={this.state.merchant.name}/></h5>
              </div>
            </Grid>
          </Grid>
          
           
        </CardContent>
        <CardActions>
            {(localStorage.getItem("JWT") == null ||
              jwt_decode(localStorage.getItem("JWT")).sub !==
                this.state.item.merchant) && (
              <Button
                fullWidth={true}
                variant="outlined"
                color="inherit"
                style={{ textTransform: "none" }}
              >
                add to cart
              </Button>
            )}
            {localStorage.getItem("JWT") !== null &&
              jwt_decode(localStorage.getItem("JWT")).sub ===
                this.state.item.merchant && (
                <React.Fragment>
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </React.Fragment>
              )}
        </CardActions>
      </Card>
      </React.Fragment>
    );
  }
}