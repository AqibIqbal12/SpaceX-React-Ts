import React, { FC } from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import routes from "../../routes";
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    drawerPaper: {
        width: 240,
    },
}));

type RightDrawerProps = {
    open: boolean;
    onClickHandler: () => void;
};

const RightDrawer: FC<RightDrawerProps> = ({ open, onClickHandler }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    return (
        <Drawer variant="temporary" anchor="right" open={open} classes={{paper: classes.drawerPaper}} onClick={onClickHandler}>
            <List>
                {routes.map(({ name, path }) => (
                    <div key={name}>
                        <ListItem button onClick={() => navigate(path)}>
                            <ListItemText primary={name} />
                        </ListItem>
                    </div>
                ))}
            </List>
        </Drawer>
    );
}
export default RightDrawer;
