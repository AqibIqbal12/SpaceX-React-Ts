import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import { useCompanyInfoQuery } from "../../generated/graphql";
import Characteristic from "../LaunchDetails/characteristic";
import Link from "@material-ui/core/Link";
import Loading from "../Loading/Loading";
import Error from '../Error/Error';

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        backgroundImage: "linear-gradient(to right,rgb(72,111,180),rgb(122,146,184),rgb(103,142,201))",
        minHeight: "100vh",
    },
  heading: {
    marginTop: theme.spacing(12),
    color:"white",

    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(9),
    },
  },

  content: {
    display:"flex",

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection:"column",
      marginBottom:"50px"
    },
  },

  details: {
      color:"white",

    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(4),
    },
  },

  tableContainer: {
    width: "100%",

    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(2),
    },

    [theme.breakpoints.up("sm")]: {
      minWidth: 300,
    },
  },
}));

const About = () => {
  const { pageContainer,heading, content, details, tableContainer } = useStyles();
  const { loading, error, data } = useCompanyInfoQuery();

  if (error) return <Error />;

  const headquarters = data?.company?.headquarters
    ? data.company.headquarters.address +
      ", " +
      data.company.headquarters.city +
      ", " +
      data.company.headquarters.state
    : "N/A";

  return (
    <div className={pageContainer}>
      {loading && <Loading />}

      {data && (
        <>
          <Typography className={heading} component="h4" variant="h4" align="center">
            About{" "}
            {data.company?.links?.website && (
              <Link href={data.company.links.website} style={{color:"white"}}  target="_blank">
                SpaceX
              </Link>
            )}
          </Typography>
          <Container maxWidth="md" className={content}>
            <Typography component="p" variant="body1" align="justify" className={details}>
              {data.company?.summary ? data.company.summary : "N/A"}
            </Typography>

            <div className={tableContainer}>
              <Characteristic label="Headquaters" value={headquarters} />
              <Characteristic label="Founded" value={data.company?.founded ? data.company.founded : "N/A"}/>
              <Characteristic
                label="Founder / CEO / CTO"
                value={data.company?.ceo ? data.company.ceo : "N/A"}
                link={
                  data.company?.links?.elon_twitter
                    ? data.company.links.elon_twitter
                    : "#"
                }
              />

              <Characteristic label="COO" value={data.company?.coo ? data.company.coo : "N/A"}/>
              <Characteristic
                label="CTO Propulsion"
                value={
                  data.company?.cto_propulsion
                    ? data.company.cto_propulsion
                    : "N/A"
                }
              />
              <Characteristic label="Employees" value={data.company?.employees ? data.company.employees : "N/A"}/>
              <Characteristic
                label="Valuation"
                value={
                  data.company?.valuation
                    ? "$ " + data.company.valuation.toLocaleString()
                    : "N/A"
                }
              />
            </div>
          </Container>
        </>
      )}

          </div>
  );
};

export default About;
