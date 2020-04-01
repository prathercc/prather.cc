import React from 'react';
import { ListGroup } from 'react-bootstrap';

const ListItem = props => {
  return (
    <ListGroup.Item style={{ cursor: 'default' }} action variant='dark'>
      {props.children}
    </ListGroup.Item>
  );
};

export default ListItem;
