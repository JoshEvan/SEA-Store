import React, { Component } from "react";
import "regenerator-runtime/runtime.js";
import { Box } from "@material-ui/core";
import { BACKEND_URL, GET_ALL_ITEM } from "../../config/api";
import { OutlinedCard } from "./card";
import Button from "@material-ui/core/Button";
import { Link } from "gatsby";

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
    fetch(BACKEND_URL + GET_ALL_ITEM)
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          rawContent: data,
        });
      });
  };

  async componentDidMount() {
    await this.loadAllItems();
  }

  render() {
    return (
      <div>
        <Box display="flex" flexWrap="wrap">
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
                        to={"item-detail/"+c.id}
                        style={{ textDecoration: "none" }}
                        item={c}
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
