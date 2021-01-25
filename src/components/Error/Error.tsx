import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Navigation from '../Navigation';
import Footer from '../Footer/Footer';


const useStyles = makeStyles((theme)=>({
    container: {
        backgroundImage: "linear-gradient(to right,rgb(72,111,180),rgb(122,146,184),rgb(103,142,201))",
        backgroundSize: "100% 100%",
        height: "100vh",
        width: "100%",
        position: "relative",
    },
    error:{
        position:"absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor:"white",
        width:"60vw",
        textAlign:"center"

    }
}));

const Error = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Navigation/>
            <div className={classes.error}>
                <Typography variant="h3" component="h3" color="error">
                    Error: Please check your internet connection
                </Typography>
            </div>
            <Footer/>
        </div>
    );
};

export default Error;
