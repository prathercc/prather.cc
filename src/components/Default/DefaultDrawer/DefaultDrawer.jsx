import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ComputerIcon from '@material-ui/icons/ComputerTwoTone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    paper: {
        background: '#474444',
        color: 'white'
    },
  }));

function DefaultDrawer() {
    const style = useStyles();
  return (
    <>
    <Drawer anchor='right' variant='permanent' classes={{paper: style.paper}}>
        <List>
            <ListItem button key={'home'} >
            <ListItemIcon> {<HomeIcon style={{fill: 'white'}} />} </ListItemIcon>
            <ListItemText primary='Home' />
            </ListItem>

            <ListItem button key={'software'}>
            <ListItemIcon> {<ComputerIcon style={{fill: 'white'}} />} </ListItemIcon>
            <ListItemText primary='Software' />
            </ListItem>
        </List>
    </Drawer>
    </>
  );
}

export default DefaultDrawer;
