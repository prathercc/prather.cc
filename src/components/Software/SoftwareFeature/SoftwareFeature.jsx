import React, { useContext, useState } from 'react';
import { Image, Card, Accordion, Container, Col, Row } from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import { AppContext } from '../../../AppContext';
import { Window } from 'react-bootstrap-icons';
import './SoftwareFeature.css';

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
          alignItems: 'center',
          marginTop: '5vh',
          flexDirection: 'row',
          outline: '1px solid gray'
        }}
      >
        <Container>
          <FeatureHeader descriptionObject={descriptionObject} />
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
  const { fgColorDetail } = appSettings;
  const { descriptionObject } = props;
  return (
    <Accordion>
      <Card
        style={{
          backgroundColor: fgColorDetail,
          alignItems: 'center',
          marginTop: '5vh',
          flexDirection: 'row',
          outline: '1px solid gray'
        }}
      >
        <Container>
          <FeatureHeader descriptionObject={descriptionObject} />
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

const FeatureHeader = props => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail, fgColor, iconSizing, textColor } = appSettings;
  const { descriptionObject } = props;
  const [bgColor, setBgColor] = useState(fgColorDetail);

  return (
    <Row>
      <Col>
        <Accordion.Toggle as={Card.Body} eventKey='0'>
          <Card.Header
            onMouseEnter={() => setBgColor(fgColor)}
            onMouseLeave={() => setBgColor(fgColorDetail)}
            style={{ cursor: 'pointer', backgroundColor: bgColor }}
            className={'Header-glow'}
          >
            <Window style={{ color: textColor, fontSize: iconSizing }} />
            {descriptionObject.description}
          </Card.Header>
        </Accordion.Toggle>
      </Col>
    </Row>
  );
};

export default SoftwareFeature;
