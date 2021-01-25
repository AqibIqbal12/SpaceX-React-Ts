import React from "react";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link, useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 0,
    marginBottom: theme.spacing(5),
    maxWidth: 600,
  },

  statusText: {
    color: (props: { status: string }) =>
      props.status === "Successful"
        ? "rgb(12, 242, 108)"
        : props.status === "Failed"
        ? theme.palette.error.main
        : theme.palette.text.primary,
  },
}));

type LaunchHistoryItemProps = {
  id: string;
  date: string;
  title: string;
  details: string;
  site: string;
  status: string;
  rocket: string;
};

const LaunchHistoryItem: React.FC<LaunchHistoryItemProps> = ({ id, title, date, site, status, rocket, details,}) => {
  const { container, statusText } = useStyles({ status });
  const navigate = useNavigate();

  return (
    <div className={container}>
      <Hidden smUp>
        <Typography variant="body1" component="p" color="primary" gutterBottom>
          {moment(date).format("MMMM Do, YYYY")}
        </Typography>
      </Hidden>

      <Link to={id} style={{ textDecoration: "none" }}>
        <Typography component="h5" variant="h5" color="primary" gutterBottom>
          {title}
        </Typography>
      </Link>

      <Typography variant="body1" align="justify" gutterBottom style={{color:"white"}}>
        {details}
      </Typography>

      <Typography component="p" variant="body1" gutterBottom style={{color:"white"}}>
        <Typography variant="inherit" style={{ color:"rgb(204, 207, 213)" }}>
          LAUNCH SITE:{" "}
        </Typography>
        {site}
      </Typography>

      <Typography component="p" variant="body1" gutterBottom style={{color:"white"}}>
        <Typography variant="inherit"  style={{ color: "rgb(204, 207, 213)" }}>
          ROCKET:{" "}
        </Typography>
        {rocket}
      </Typography>

      <Typography component="p" variant="body1" gutterBottom className={statusText}>
        <Typography variant="inherit" color="textSecondary" style={{ color:"rgb(204, 207, 213)" }}>
          STATUS:{" "}
        </Typography>
        {status}
      </Typography>

      <Button variant="outlined" color="primary" onClick={() => navigate(id)}>
        More Details
      </Button>
    </div>
  );
};

export default LaunchHistoryItem;
