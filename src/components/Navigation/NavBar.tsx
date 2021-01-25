import React, { FC } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import routes from "../../routes";
import  NavLink  from "./NavLink";

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        position:"absolute",
        //position:"sticky",
        opacity:"0.9",
    },
    container: {
        display: "flex",
        justifyContent: "space-between",
        padding: 0,
    },
    links: {
        display: "flex",
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    menuButton: {
        color: theme.palette.primary.contrastText,
        marginRight:"0px",
    },
    rightContainer: {
        // [theme.breakpoints.up("md")]: {
        //     marginRight: "100",
        // },
    },
}));

type NavBarProps = {
    onMenuClickHandler: () => void;
};
const NavBar: FC<NavBarProps> = ({ onMenuClickHandler }) => {
    const classes = useStyles();
    return (
            <AppBar position="sticky" className={classes.appBar}>
                <Toolbar className={classes.container}>
                    <Link to="/">
                        <img src="/images/logo.png" alt="logo" width="285px" style={{marginLeft:"15px"}} />
                    </Link>
                    <div className={classes.rightContainer}>
                        <div className={classes.links}>
                            {routes.map(({ name, path }, i) => (
                                <NavLink key={i} name={name} to={path} end={path === "/"} />
                            ))}
                        </div>

                        <Hidden mdUp>
                            <IconButton className={classes.menuButton} edge="end" aria-label="menu" onClick={onMenuClickHandler}>
                                <MenuIcon fontSize="large" />
                            </IconButton>
                        </Hidden>
                    </div>
                </Toolbar>
            </AppBar>
    )
}
export default NavBar;