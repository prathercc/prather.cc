import React, { useContext } from 'react';
import {
  Image,
  Card,
  Accordion,
  OverlayTrigger,
  Tooltip,
  Popover
} from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import { AppContext } from '../../AppContext';

function SoftwareDescription(props) {
  return (
    <>
      <Breakpoint xlarge down>
        <DesktopView descriptionObject={props.descriptionObject} />
      </Breakpoint>
    </>
  );
}

const DesktopView = props => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail } = appSettings;
  const { descriptionObject } = props;
  return (
    <Accordion>
      <Card
        style={{
          backgroundColor: fgColorDetail,
          fontSize: 'calc(5px + 2vmin)',
          alignItems: 'center',
          marginTop:'5vh'
        }}
      >
        <Accordion.Toggle as={Card.Body} eventKey='0'>
          <OverlayTrigger
            placement='bottom'
            overlay={
                <Popover>
                    <Popover.Title>Click to expand/collapse</Popover.Title>
                </Popover>
            }
          >
            <Card.Header>{descriptionObject.description}</Card.Header>
          </OverlayTrigger>
        </Accordion.Toggle>

        <Accordion.Collapse eventKey='0'>
          <Card.Body>
            <Image
              src={
                descriptionObject.image !== undefined
                  ? descriptionObject.image
                  : ''
              }
              style={{ width: descriptionObject.imageWidth.desktop }}
            />
            <div style={{ marginTop: '1vh' }}>{descriptionObject.content}</div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default SoftwareDescription;
