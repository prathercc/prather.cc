import React, { useContext, useState } from 'react';
import {
  Image,
  Card,
  Accordion,
  OverlayTrigger,
  Popover,
  Container,
  Col,
  Row
} from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import { AppContext } from '../../AppContext';

function SoftwareFeature(props) {
  return (
    <>
      <Breakpoint xlarge up>
        <DesktopView descriptionObject={props.descriptionObject} />
      </Breakpoint>
      <Breakpoint large down>
        <MobileView descriptionObject={props.descriptionObject} />
      </Breakpoint>
    </>
  );
}

const MobileView = props => {
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
          marginTop: '5vh',
          flexDirection: 'row'
        }}
      >
        <Container>
          <Row>
            <Col>
              <Accordion.Toggle as={Card.Body} eventKey='0'>
                <Card.Header style={{ cursor: 'pointer' }}>
                  {descriptionObject.description}
                </Card.Header>
              </Accordion.Toggle>
            </Col>
          </Row>
          <Row>
            <Col>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>
                  <Image
                    src={
                      descriptionObject.image !== undefined
                        ? descriptionObject.image
                        : ''
                    }
                    style={{ width: descriptionObject.imageWidth.mobile }}
                  />
                  <div style={{ marginTop: '1vh' }}>
                    {descriptionObject.content}
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Col>
          </Row>
        </Container>
      </Card>
    </Accordion>
  );
};

const DesktopView = props => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, fgColor } = appSettings;
  const { descriptionObject } = props;
  const [bgColor, setBgColor] = useState(fgColorDetail);
  return (
    <Accordion>
      <Card
        style={{
          backgroundColor: fgColorDetail,
          fontSize: 'calc(5px + 2vmin)',
          alignItems: 'center',
          marginTop: '5vh',
          flexDirection: 'row'
        }}
      >
        <Container>
          <Row>
            <Col>
              <Accordion.Toggle as={Card.Body} eventKey='0'>
                <OverlayTrigger
                  placement='bottom'
                  overlay={
                    <Popover>
                      <Popover.Title>Click to expand/collapse</Popover.Title>
                    </Popover>
                  }
                >
                  <Card.Header
                    onMouseEnter={() => setBgColor(fgColor)}
                    onMouseLeave={() => setBgColor(fgColorDetail)}
                    style={{ cursor: 'pointer', backgroundColor: bgColor }}
                  >
                    {descriptionObject.description}
                  </Card.Header>
                </OverlayTrigger>
              </Accordion.Toggle>
            </Col>
          </Row>
          <Row>
            <Col>
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
                  <div style={{ marginTop: '1vh' }}>
                    {descriptionObject.content}
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Col>
          </Row>
        </Container>
      </Card>
    </Accordion>
  );
};

export default SoftwareFeature;
