import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor : "white",
    border : "2px solid black",
    // height: "50px",
    // width:"50px"
  },
}));

const Cell = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Grid item>
                <Paper style={{backgroundColor : props.color}} className={classes.paper}
                  >
                {props.children}
                
                </Paper>
            </Grid>
        </div>
    )
}

export default Cell
