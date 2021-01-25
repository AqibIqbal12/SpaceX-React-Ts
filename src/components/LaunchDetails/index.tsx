import React from 'react'
import { useParams } from 'react-router-dom';
import { useLaunchDetailsQuery } from "../../generated/graphql";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Loading from "../Loading/Loading";
import Error from '../Error/Error'
import { Typography } from "@material-ui/core";
import Characteristic from './characteristic';
import ReactPlayer from "react-player";


const useStyles = makeStyles((theme) => ({

  pageContainer: {
    backgroundImage: "linear-gradient(to right,rgb(72,111,180),rgb(122,146,184),rgb(103,142,201))",
    minHeight: "100vh",
  },

  heading: {
    marginTop: theme.spacing(12),
    color: "white",

    [theme.breakpoints.only("xs")]: {
      fontSize: "40px",
    },
  },

  contentContainer: {
    display: "flex",
    justifyContent: "space-around",
    margin: theme.spacing(2, 0, 8, 0),
    height: "700px",
    //minHeight: "700px",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "auto",
    }
  },

  playerAndDetailsWrapper: {
    position: "relative",
    width: "51%",
    //minHeight: "700px",

    [theme.breakpoints.down("sm")]: {
      width: "98%",
      
    },
  },

  videoPlayer: {
    position: "absolute",
  },
  details: {
    marginTop:theme.spacing(61),
    color: "white",
    width: "98.3",
    height: "200px",
    overflow: "auto",
    padding: theme.spacing(1, 1, 0, 1),
    
    "&::-webkit-scrollbar": {                           
      width: "15px",
    },
    "&::-webkit-scrollbar-track": {                     
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      borderRadius: "10px",
      backgroundColor: "white"
    },
    "&::-webkit-scrollbar-thumb": {                       
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      borderRadius: "10px",
      backgroundColor: "#4457B6"
    },

    [theme.breakpoints.down("sm")]: {
      overflow: "visible",
      height:"auto",
      margin:theme.spacing(61,0,1,0),
      paddingBottom: theme.spacing(1),
    },
  },

  infoContainer: {
    width: "40%",
    height: "inherit",
    overflow: "auto",

    "&::-webkit-scrollbar": {                           /* width */
      width: "15px",
    },
    "&::-webkit-scrollbar-track": {                     /* Track */
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      borderRadius: "10px",
      backgroundColor: "white"
    },
    "&::-webkit-scrollbar-thumb": {                       /* Handle */
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
      borderRadius: "10px",
      backgroundColor: "#4457B6"
    },

    [theme.breakpoints.down("sm")]: {
      width: "99%",
      marginTop: "10px",
    },
  },
}));


const LaunchDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useLaunchDetailsQuery({
    variables: {
      id
    },
  });
  const classes = useStyles();

  if (error) return <Error />;

  return (
    <div className={classes.pageContainer}>
      {
        loading ? (<Loading />)
          :
          (
            <>
              <Typography data-testid="name" className={classes.heading} component="h3" variant="h3" align="center">
                {data?.launch?.mission_name}
              </Typography>
              <div className={classes.contentContainer}>

                <div className={classes.playerAndDetailsWrapper}>

                  {data?.launch?.links?.video_link && (
                    <ReactPlayer data-testid="react-player" width="100%" height="480px" controls={true} url={"" + data?.launch?.links?.video_link} className={classes.videoPlayer} />
                  )}
                  {data?.launch?.details && (
                    <Typography data-testid="details" component="div" variant="body1" align="justify" className={classes.details}>
                      {data?.launch?.details}
                    </Typography>
                  )}
                </div>

                <div className={classes.infoContainer} data-testid="info">
                  <Typography component="h5" variant="h5" align="center" color="primary">
                    Overview
                  </Typography>
                  <Characteristic label="Rocket" value={data?.launch?.rocket?.rocket_name ? data.launch.rocket.rocket_name : "N/A"} />
                  {data?.launch?.launch_site?.site_name_long && (
                    <Characteristic label="Launch Site" value={data.launch.launch_site.site_name_long} />
                  )}
                  <Characteristic label="Launch Date" value={moment(data?.launch?.launch_date_local).format("MMMM DD, YYYY")} />
                  <Characteristic label="Successful" value={data?.launch?.launch_success ? "Yes" : "No"} />
                  <br />
                  {data?.launch?.rocket?.first_stage?.cores && (
                    <>
                      <Typography component="h5" variant="h5" align="center" color="primary">
                        First Stage
                      </Typography>
                      {data.launch.rocket.first_stage.cores.map((core, i) => (
                        <div key={i}>
                          <Characteristic label="Reused Core" value={core?.reused ? "Yes" : "No"} />
                          {core?.flight && (
                            <Characteristic label="Flight #" value={core?.flight} />
                          )}
                          <Characteristic label="Landing Intent" value={core?.landing_intent ? "Yes" : "No"} />
                          <Characteristic label="Landing Success" value={core?.land_success ? "Yes" : "No"} />
                          {core?.landing_type && (
                            <Characteristic label="Landing Type" value={core?.landing_type} />
                          )}
                        </div>
                      ))}
                    </>
                  )}
                  <br />
                  {data?.launch?.rocket?.second_stage?.payloads && (
                    <>
                      <Typography component="h5" variant="h5" align="center" color="primary">
                        Second Stage
                      </Typography>

                      {data.launch.rocket.second_stage.payloads.map(
                        (payload, i) => (
                          <div key={i}>
                            {data.launch?.rocket?.second_stage?.payloads &&
                              data.launch.rocket.second_stage.payloads.length >
                              1 && (
                                <Typography variant="h6">
                                  Payload # {i + 1}
                                </Typography>
                              )}
                            {payload?.payload_type && (
                              <Characteristic label="Type" value={payload.payload_type} />
                            )}
                            {payload?.orbit && (
                              <Characteristic label="Orbit" value={payload.orbit} />
                            )}
                            {payload?.payload_mass_kg &&
                              payload.payload_mass_lbs && (
                                <Characteristic label="Mass" value={
                                  payload.payload_mass_kg.toLocaleString() +
                                  " kg / " +
                                  payload.payload_mass_lbs.toLocaleString() +
                                  " lbs"
                                }
                                />
                              )}
                            {payload?.manufacturer && (
                              <Characteristic label="Manufacturer" value={payload.manufacturer} />
                            )}
                            {payload?.nationality && (
                              <Characteristic label="Nationality" value={payload.nationality} />
                            )}
                            {payload?.customers && (
                              <Characteristic label="Customers" value={payload.customers.join(" / ")} />
                            )}
                          </div>
                        )
                      )}
                    </>
                  )}
                  <br />
                  {data?.launch?.rocket?.fairings && (
                    <>
                      <Typography component="h5" variant="h5" align="center" color="primary">
                        Fairings
                      </Typography>
                      <Characteristic label="Reused" value={data.launch.rocket.fairings.reused ? "Yes" : "No"} />
                      <Characteristic label="Recovery Attempt" value={data.launch.rocket.fairings.recovery_attempt ? "Yes" : "No"}
                      />
                      <Characteristic label="Recovered" value={data.launch.rocket.fairings.recovered ? "Yes" : "No"} />
                    </>
                  )}

                </div>

              </div>
            </>
          )
      }
    </div>
  )
}
export default LaunchDetails;
