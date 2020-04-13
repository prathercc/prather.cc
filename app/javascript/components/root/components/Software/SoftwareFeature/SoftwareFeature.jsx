import React, { useContext, useState } from 'react';
import {
  Image,
  Card,
  Accordion,
  Container,
  Col,
  Row,
  ListGroup,
} from 'react-bootstrap';
import { AppContext } from '../../../AppContext';
import { Window } from 'react-bootstrap-icons';
import ListItem from '../SoftwarePage/SoftwareListItem';
import './SoftwareFeature.css';

function SoftwareFeature(props) {
  const appSettings = useContext(AppContext);
  const { fgColorDetail } = appSettings;
  const { userData, descriptionObject } = props;
  return (
    <Accordion>
      <Card
        style={{
          backgroundColor: fgColorDetail,
          alignItems: 'center',
          marginTop: '5vh',
          flexDirection: 'row',
          outline: '1px solid gray',
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
                    onClick={() =>
                      descriptionObject.image !== undefined
                        ? window.open(descriptionObject.image)
                        : ''
                    }
                    style={{
                      width: descriptionObject.imageWidth.desktop,
                      cursor: 'pointer',
                    }}
                  />

                  <Container style={{ marginTop: '1vh' }}>
                    <Row>
                      <Col>
                        <strong>{descriptionObject.content_title}</strong>
                      </Col>
                    </Row>
                    <ListGroup style={{ textAlign: 'left' }}>
                      <ListItem>
                        {descriptionObject.content_description}
                      </ListItem>
                    </ListGroup>
                  </Container>
                </Card.Body>
              </Accordion.Collapse>
            </Col>
          </Row>
        </Container>
      </Card>
    </Accordion>
  );
}

const FeatureHeader = (props) => {
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

            <Container>
              <Row>
                <Col>
                  <strong>{descriptionObject.title}</strong>
                </Col>
              </Row>
              <Row>
                <Col>{descriptionObject.description}</Col>
              </Row>
            </Container>
          </Card.Header>
        </Accordion.Toggle>
      </Col>
    </Row>
  );
};

export default SoftwareFeature;
