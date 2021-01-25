import React from 'react';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useRocketsQuery } from "../../generated/graphql";
import Loading from "../Loading/Loading";
import Error from '../Error/Error';
import RocketItem from "./RocketItem";


const useStyles = makeStyles((theme) => ({

    pageContainer: {
        backgroundImage: "linear-gradient(to right,rgb(72,111,180),rgb(122,146,184),rgb(103,142,201))",
        minHeight: "100vh",
    },
    heading: {
        marginTop: theme.spacing(12),
        color: "white"
    },
    contentWrapper: {
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        
    },
    content: {
        width: "100%",
        margin: theme.spacing(5,0,7,0),
        padding:theme.spacing(1),
           
        [theme.breakpoints.up("md")]: {
            width: "90%",
          },
    },
    
}));

const Rockets = () => {

    const { loading, error, data } = useRocketsQuery();
    const { heading, pageContainer, contentWrapper ,content } = useStyles();
    console.log(data)

    if (error) return <Error />;

    return (
        <div className={pageContainer}>
            <Typography className={heading} component="h3" variant="h3" align="center">
                Rockets
            </Typography>
            {loading && <Loading />}
            {data?.rockets &&
                <div className={contentWrapper}>
                    <div className={content}>
                        {
                            data.rockets.map((rocket, i) => (
                                <RocketItem
                                    key={i}
                                    data={{
                                        name: rocket?.name ? rocket.name : "N/A",
                                        description: rocket?.description ? rocket.description : "N/A",
                                        active: rocket?.active ? rocket.active : false,
                                        costPerLaunch: rocket?.cost_per_launch
                                            ? rocket.cost_per_launch
                                            : 0,
                                        successRate: rocket?.success_rate_pct
                                            ? rocket.success_rate_pct
                                            : 0,
                                        wikipedia: rocket?.wikipedia ? rocket.wikipedia : null,
                                        firstFlight: rocket?.first_flight ? rocket.first_flight : null,
                                        boosters: rocket?.boosters ? rocket.boosters : 0,
                                        diameter: rocket?.diameter,
                                        height: rocket?.height,
                                        mass: rocket?.mass,
                                        engine: {
                                            number: rocket?.engines?.number ? rocket.engines.number : 0,
                                            type: rocket?.engines?.type ? rocket.engines.type : "N/A",
                                            propellant1: rocket?.engines?.propellant_1
                                                ? rocket.engines.propellant_1
                                                : "N/A",
                                            propellant2: rocket?.engines?.propellant_2
                                                ? rocket.engines.propellant_2
                                                : "N/A",
                                            thrustToWeight: rocket?.engines?.thrust_to_weight
                                                ? rocket.engines.thrust_to_weight
                                                : 0,
                                            thrust: {
                                                seaLevelKN: rocket?.engines?.thrust_sea_level,
                                                vaccumKN: rocket?.engines?.thrust_vacuum,
                                            },
                                        },
                                    }}
                                />
                            ))}
                    </div>
                </div>
            }
        </div>
    )
}
export default Rockets;
