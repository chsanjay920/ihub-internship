import React from "react";
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
import { useDispatch } from "react-redux";
import { likePost, deletePost, selectPost } from "../../../actions/posts";
import useStyles from "./styles";
import pattern from "../../../images/pattern.jpg";
import { useNavigate } from 'react-router-dom';

const Post = ({ post, setCurrentId, setCurrentP }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    // to="/expenses" state={{ from: "occupation" }}
    <div>
      <Card className={classes.card}>
        <div onClick={() => {
                setCurrentId(post._id);
                setCurrentP(post);
                navigate("/user");
              }}>
          <CardMedia
            className={classes.media}
            image={pattern}
            title={post.title}
          />
          <div className={classes.overlay}>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body2">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </div>
          {/* <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                setCurrentId(post._id);
                setCurrentP(post);
              }}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div> */}
          <div className={classes.details}>
            <Typography variant="body2" color="textSecondary" component="h2">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h6"
            component="h6"
            overflow="hidden"
          >
            {post.creator}
          </Typography>
          {/* <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.code}
            </Typography>
          </CardContent> */}
        </div>
        <CardActions className={classes.cardActions}>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(likePost(post._id))}
          >
            <ThumbUpAltIcon fontSize="small" /> Like {post.likeCount}{" "}
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Post;
