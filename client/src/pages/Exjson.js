import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Exjson.css";

import "./table.css";
import { JsonToTable } from "react-json-to-table";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import useStyles from "./style";
import pattern from "../images/a7.jpg";
import Plist from "./PageLists/Plist";
import { useNavigate } from "react-router-dom";
import Brand from "../components/Brand/Brand";
import home from "../images/home-button.png";

import 'bootstrap/dist/css/bootstrap.min.css';

const Exjson = ({ currentId, currentP }) => {
  var jf, jsEncode, csvjf;
  try {
    const jsfile = currentP.selectedFile;
    const jsreplace = jsfile.replace("data:application/json;base64,", "");
    jsEncode = JSON.parse(atob(jsreplace));
    // jsEncode = JSON.parse(jsfile);
    jf = JSON.stringify(jsEncode, undefined, 4);
    csvjf = JSON.stringify(currentP.code, undefined, 4);
  } catch (e) {
    console.log(e);
  }
  if (typeof currentP.code === "undefined") {
    currentP.code = "No Code Input Given";
  }
  if (currentP.description === "") {
    currentP.description = "No Description Provided";
  }
  const dataPart = [
    {
      id: 1,
      title: "Data",
      content: currentP.description,
      name: currentP.name,
      code: "",
      jff: jf,
      tabelfm: jsEncode,
    },
  ];
  const codePart = [
    {
      id: 1,
      title: "Data",
      content: currentP.description,
      name: currentP.name,
      code: "",
      jff: csvjf,
      tabelfm: currentP.code,
    },
  ];

  const [selected, setSelected] = useState("data");
  const [data, setData] = useState([]);

  const classes = useStyles();
  const navigate = useNavigate();

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );

  const downloadTxtFile = (e) => {
    const element = document.createElement("a");
    const file = new Blob([jf], {
      type: "JSON/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.JSON";
    document.body.appendChild(element);
    element.click();
  };

  const downloadTxtFilecsv = () => {
    const element = document.createElement("a");
    const file = new Blob([csvjf], {
      type: "JSON/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "DownloadFile.JSON";
    document.body.appendChild(element);
    element.click();
  };
  const list1 = [
    {
      id: "data",
      titlee: "Data",
    },
    {
      id: "code",
      titlee: "Code",
    },
  ];
  useEffect(() => {
    switch (selected) {
      case "data":
        setData(dataPart);
        break;
      case "code":
        setData(codePart);
        break;
      default:
        setData(dataPart);
        break;
    }
  }, [selected]);

  try {
    return (
      <>
        <div className="main-container">
          <Brand />
          <Card className={classes.card} id="displayCard" style={{ padding:'0px'}}>
            <CardMedia className={classes.media} image={pattern} title="hello" />
            <div className={classes.overlay}>
              <div className="h6fontchanger">
              <Typography variant="h6">{currentP.title}</Typography>
              </div>
              <Typography variant="body2"></Typography>
            </div>
            <div className="row">
                {/* {list1.map((item) => (
                  <Plist titlee={item.titlee} active={selected === item.id} id={item.id} setSelected={setSelected}/>
                ))} */}
                {/* <button id="downloadButton" onClick={selected==='data'?downloadTxtFile:downloadTxtFilecsv}>
                   JSON
                </button> */}
                {/* <button onClick={() => { navigate("/");}}>
                <img src={home} alt="" style={{ width: "30px" }} />
                </button> */}
              <div className="col">
               <Button style={{backgroundColor:"white",margin:"10px",width:"auto",border:"2px solid #ff793fce"}} variant='contained' onClick={selected==='data'?downloadTxtFile:downloadTxtFilecsv} >DOWNLOAD</Button>
              </div>
              <div className="col d-flex justify-content-end">
                <Button style={{backgroundColor:"#ff793fce",margin:"10px",width:"auto"}} variant='contained' onClick={() => { navigate("/");}} >HOME</Button>
              </div>
            </div>
            <div className="tab">
              {data.map((d) => (
                <>
                  <div className="container1">
                    <div className="description row" >Description</div>
                    <div className="DescriptionContainer row">{d.content}</div>
                  </div>
                  <div className="container2 row" style={{margin:"0rem 2rem"}}>
                    <div className="left-container2 col">
                      <div className={classes.details}>
                          <div id="dataexplorer">
                            Data Explorer:
                          </div>
                      </div>
                      <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                        <div id="creator"> {d.name} </div>
                      </Typography>
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {d.code}
                        </Typography>
                      </CardContent>
                    </div>
                    <div className="codeDiv col">
                      <div className="code">
                        <code id="output">
                          <textarea rows="60" cols="80" id="textbox" value={d.jff}></textarea>
                        </code>
                      </div>
                    </div>
                  </div>
                  <div className="container1" style={{marginTop:"5rem"}}>
                    <div className="description row" >DETAILS</div>
                  </div>
                  <div className="scrolling-wrapper">
                    {<JsonToTable json={d.tabelfm} />}
                  </div>
                </>
              ))}
            </div>
            <CardActions className={classes.cardActions}>
              {currentP.likeCount}
            </CardActions>
          </Card>

          <div style={{ height: "1rem" }}></div>
        </div>
      </>
    );
  } catch (err) {
    return <>{console.log(err)}</>;
  }
};

export default Exjson;
