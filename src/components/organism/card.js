import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Chip } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "max-content",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    marginTop: 12,
  },
});

export function OutlinedCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.owner}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography className={classes.pos} component="p">
          <Chip color="primary" label={props.category} />
        </Typography>
        <Typography variant="body2" component="p">
          {props.price}
        </Typography>
      </CardContent>
      <CardActions>{props.actions}</CardActions>
    </Card>
  );
}
