import React, { Component } from "react";
import "regenerator-runtime/runtime.js";
import { Box } from "@material-ui/core";
import { OutlinedCard, Header } from "../components/organism";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { serviceGetAllItems } from "../services/item-service";
import jwt_decode from "jwt-decode";


export class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rawContent: [],
      category: "",
      categories: [],
    };
  }

  loadAllItems = async () => {
    console.log("posting all item request");
    await serviceGetAllItems()
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          rawContent: data
        });
      });
  };

  async componentDidMount() {
    await this.loadAllItems();
  }

  render() {
    return (
      <div>
        <Header></Header>
        { (localStorage.getItem("token") !== null &&  
           localStorage.getItem("ROLE") === 'MERCHANT') &&
            <Link to="add-item/" style={{ textDecoration: "none" }}>
              <Button
                fullWidth={true}
                variant="contained"
                color="inherit"
                style={{ textTransform: "none" }}
              >
                Add Item
              </Button>
            </Link>
        }
        <Box display="flex" flexWrap="wrap" m={10}>
          {this.state.rawContent.map((c) => {
            return (
              <React.Fragment>
                <Box p={1}>
                  <OutlinedCard
                    category={c.category}
                    owner={c.merchant.name}
                    name={c.name}
                    price={"IDR " + c.price}
                    actions={
                      <Link
                        to={{
                          pathname: "item-detail/" + c.id,
                          state: { item: c },
                        }}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          variant="outlined"
                          color="inherit"
                          style={{ textTransform: "none" }}
                        >
                          show more
                        </Button>
                      </Link>
                    }
                  />
                </Box>
              </React.Fragment>
            );
          })}
        </Box>
      </div>
    );
  }
}
