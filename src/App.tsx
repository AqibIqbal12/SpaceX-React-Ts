import React from 'react';
import Routes from './RoutesConfig';
import { ApolloProvider } from "@apollo/client";
import client from './config/gqlconfig'
import './App.css';
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  mainContainer: {
     //minHeight: "100vh",
     display: "flex",
     flexDirection: "column",
     //justifyContent: "space-between",
     position:"relative",
    //backgroundColor:"red",
  },
}));


function App() {
  const classes = useStyles();
  
  return (
    <div className={classes.mainContainer}>
      <ApolloProvider client={client}>
        <Routes />
      </ApolloProvider>

    </div>
  );
}

export default App;
