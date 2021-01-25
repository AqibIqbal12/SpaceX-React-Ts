import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  container: {
  
    padding: theme.spacing(1),
    //width: "100%",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: `1px solid #4457B6`,

    "&:last-child": {
      border: "none",
    },
  },
}));

type RocketInfoItemProps = {
  label: string;
  value: string | number;
  unit?: string | null;
  link?: string;
};

const Characteristic: React.FC<RocketInfoItemProps> = ({ label, value, unit, link,}) => {
  const { container } = useStyles();
  return (
    <div className={container}>
      <Typography component="p" variant="body1"  style={{ color:"rgb(204, 207, 213)" }}>
        {label}
      </Typography>

      {link ? (
        <Link href={link} color="primary" target="_blank">
          <Typography component="p" variant="body1">
            {value} {unit ? unit : ""}
          </Typography>
        </Link>
      ) : (
        <Typography component="p" variant="body1" style={{color:"white"}} align="right">
          {value} {unit ? unit : ""}
        </Typography>
      )}
    </div>
  );
};

export default Characteristic;
