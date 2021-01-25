import React from 'react';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(()=> ({
    footer:{
        position:"absolute",
        bottom:"0",
        width:"100%",
        //height:"50px",
        fontWeight:"bold",
        padding:"15px 0px",
        textAlign:"center",
        fontSize:"19px",
        color:"white",
        backgroundColor:"rgb(63, 81, 181)",
        opacity:"0.9"
 
    }   
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <p>Developed By AqibIqbal</p>
        </footer>
    )
}
export default Footer;