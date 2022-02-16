import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Exjson.css";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import useStyles from "./style";
import pattern from "../images/a7.jpg";

const Exjson = ({ currentId, currentSF }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  var arr = [];

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  try {
    const jsfile = currentSF;

    const jsreplace = jsfile.replace("data:application/json;base64,", "");
    var jsEncode = JSON.parse(atob(jsreplace));
    var jf = JSON.stringify(jsEncode, undefined, 4);
    arr = Object.entries(post);
    return (
      <>
        <Card className={classes.card} id="displayCard">
          <CardMedia className={classes.media} image={pattern} title="hello" />
          <div className={classes.overlay}>
            <Typography variant="h6">{arr[1][1]}</Typography>
            <Typography variant="body2"></Typography>
          </div>
          <div className={classes.overlay2}>
            <Button style={{ color: "white" }} size="small">
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              {arr[0][1]}
            </Typography>
          </div>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {arr[3][1]}
          </Typography>
          <div className="codeDiv">
            <div className="code">
              <code id="output">
                <textarea
                  rows="60"
                  cols="80"
                >
                  {jf}
                </textarea>
              </code>
            </div>
          </div>
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {arr[2][1]}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>{arr[7][1]}</CardActions>
        </Card>
        <div style={{ height: "20rem" }}></div>
      </>
    );
  } catch (err) {
    return <>{console.log(err)}</>;
  }
};

export default Exjson;