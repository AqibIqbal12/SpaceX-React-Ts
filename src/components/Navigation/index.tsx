import React from 'react';
import NavBar from './NavBar';
import RightDrawer from './Drawer';

const Navigation = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <NavBar onMenuClickHandler={() => openDrawer()} />
            <RightDrawer open={drawerOpen} onClickHandler={() => closeDrawer()} />
        </>
    );

}
export default Navigation;
