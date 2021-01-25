import React, { FC } from 'react';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink as RouterNavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => {
    
    return {
        container: {
            padding: theme.spacing(3),
            borderBottom:"1px solid #648AC8",
            textDecoration: "none",

            "&:hover": {
                cursor: "pointer",
                backgroundColor:"#648AC8",
            },
        },

        nameText: {
            color: "white",
            fontWeight: "bold",
        },

        active: {
            backgroundColor:"#648AC8",
        },
    };
});


type NavLinkProps = {
    name: string;
    to: string;
    end: boolean;
};

const NavLink: FC<NavLinkProps> = ({ name, to, end }) => {
    const classes = useStyles();
    
    return (
        <div>
            <RouterNavLink to={to} className={classes.container} activeClassName={classes.active} end={end}>
                <Typography variant="button" className={classes.nameText}>
                    {name}
                </Typography>
            </RouterNavLink>
        </div>
    )
}
export default NavLink;