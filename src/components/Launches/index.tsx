import React, { useState } from 'react';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useLaunchesQuery } from '../../generated/graphql';
import Error from '../Error/Error';
import Loading from '../Loading/Loading';
import Timeline from './Timeline';
import LaunchHistoryItem from './LaunchHistoryItem';
import { Button } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  container: {
     backgroundImage: "linear-gradient(to right,rgb(72,111,180),rgb(122,146,184),rgb(103,142,201))",
     minHeight: "100vh",
  },
  heading: {
    marginTop:theme.spacing(12),
    color: "white",
  },
  content: {
    marginTop:theme.spacing(3),
  },
  buttonContainer: {
    textAlign: "center",
    marginBottom:theme.spacing(10), 
  },
}));

const Launches = () => {
  const limit = 20;
  const limitForLoadMore = 3;

  const [offset, setOffset] = useState(20);
  
  const classes = useStyles();
  const { loading, error, data, fetchMore } = useLaunchesQuery({
    variables: {
      order: "desc",
      sort: "launch_date_local",
      limit: limit,
      offset: 0,
    },
     notifyOnNetworkStatusChange: true,
  });
  const theme = useTheme();

  //console.log(error)
  if (error) return (<Error />)

  const past_launches = data?.launches?.filter((launch) => !launch?.upcoming);
  //console.log(past_launches)

  function loadMoreHandler() {
    fetchMore({
      variables: {
        order: "desc",
        sort: "launch_date_local",
        limit: limitForLoadMore,
        offset: offset,
      },
    });
    setOffset(offset + limitForLoadMore);
  }

  //console.log(data)

  return (
    <div className={classes.container}>
      <Typography className={classes.heading} component="h3" variant="h3" align="center">
        Launches
      </Typography>
      <div className={classes.content}>
      {
        loading && offset === limit 
        ? 
        (<Loading />)
        :
        (
          <>
            {
            past_launches && (
              <Timeline
                data={past_launches?.map((launch, i) => ({
                  time: launch?.launch_date_local ? launch.launch_date_local : "",
                  dotColor: launch?.upcoming
                    ? theme.palette.secondary.main
                    : launch?.launch_success
                    ? "rgb(12, 242, 108)"
                    : theme.palette.error.main,
                  content: 
                    <LaunchHistoryItem
                      id={launch?.id ? launch?.id : ""}
                      title={launch?.mission_name ? launch?.mission_name : "N/A"}
                      details={launch?.details ? launch.details : "N/A"}
                      date={
                        launch?.launch_date_local ? launch.launch_date_local : ""
                      }
                      site={
                        launch?.launch_site?.site_name_long
                          ? launch.launch_site.site_name_long
                          : "N/A"
                      }
                      status={
                        launch?.upcoming
                          ? "Upcoming"
                          : launch?.launch_success
                          ? "Successful"
                          : "Failed"
                      }
                      rocket={
                        launch?.rocket?.rocket_name
                          ? launch.rocket.rocket_name
                          : "N/A"
                      }
                    />
                  
                }))}
              />
            )
            }
  
            {loading && <Loading />}
  
            <div className={classes.buttonContainer}>
              <Button color="primary" variant="contained" onClick={loadMoreHandler}>
                Load more
              </Button>
              
            </div>
          </>
        )
        }
        </div>
    </div>
  )
}
export default Launches;