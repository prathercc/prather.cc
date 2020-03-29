import React, { useContext } from 'react';
import { Image, Card, Container } from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import { AppContext } from '../../../AppContext';

function SoftwareTitle(props) {
  return (
    <>
      <Breakpoint large down>
        <MobileView titleObject={props.titleObject} />
      </Breakpoint>
      <Breakpoint xlarge up>
        <DesktopView titleObject={props.titleObject} />
      </Breakpoint>
    </>
  );
}

const MobileView = props => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail } = appSettings;
  const { titleObject } = props;
  return (
    <Card
      style={{
        backgroundColor: fgColorDetail,
        alignItems: 'center',
        outline: '1px solid gray'
      }}
    >
      <Container>
        <Image
          rounded
          src={titleObject.thumbnail}
          style={{ width: titleObject.thumbnailWidth.mobile }}
        />
        {titleObject.title}
      </Container>

      <Card.Body>
        <Card.Text>{titleObject.description}</Card.Text>
        <Card.Img
          style={{ width: titleObject.imageWidth.mobile }}
          variant='top'
          src={titleObject.image}
        />
      </Card.Body>
    </Card>
  );
};

const DesktopView = props => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail } = appSettings;
  const { titleObject } = props;
  return (
    <Card
      style={{
        backgroundColor: fgColorDetail,
        alignItems: 'center',
        outline: '1px solid gray'
      }}
    >
      <Container>
        <Image
          rounded
          src={titleObject.thumbnail}
          style={{ width: titleObject.thumbnailWidth.desktop }}
        />
        <strong>{titleObject.title}</strong>
      </Container>
      <Card.Body>
        <Card.Text>{titleObject.description}</Card.Text>
        <Card.Img
          style={{ width: titleObject.imageWidth.desktop }}
          variant='top'
          src={titleObject.image}
        />
      </Card.Body>
    </Card>
  );
};

export default SoftwareTitle;
