import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    container: {
        backgroundImage: "url(/images/bg.jpg)",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        minHeight: "100vh", 
        position:"relative",
    },
    btnsWrapper: {

        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display:"flex",
        
    },
    btnone: {
        color:"white",
        backgroundColor:"rgb(63, 81, 181)",
        // border:"none",
        fontSize: "15px",
        fontWeight: "bold",
        lineHeight: "40px",
        width: "150px",
        border: "3px solid white",
        opacity: "0.9",
        
        "&:hover": {
            cursor: "pointer",
            borderColor:"#7A99C5",
            //borderColor: theme.palette.grey[400],
        },
    },
    btntwo: {
        color:"white",
        backgroundColor:"rgb(63, 81, 181)",
        // border:"none",
        fontSize: "15px",
        fontWeight: "bold",
        lineHeight: "40px",
        width: "150px",
        border: "3px solid white",
        marginLeft: "5px",
        opacity: "0.9",
        "&:hover": {
            cursor: "pointer",
            borderColor:"#7A99C5",
            //borderColor: theme.palette.grey[400],
        },
    }
}));

const Home = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    return (
        <div className={classes.container}>
            <div className={classes.btnsWrapper}>
                <button className={classes.btnone} onClick={() => navigate("/launches")}>Launchesss</button>
                <button className={classes.btntwo} onClick={() => navigate("/rockets")}>Rockets</button>
            </div>
        </div>
    )
}
export default Home;
