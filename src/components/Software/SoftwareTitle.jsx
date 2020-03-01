import React, { useContext } from 'react';
import { Image, Card, Container } from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import { AppContext } from '../../AppContext';

function SoftwareTitle(props) {
  return (
    <>
      <Breakpoint xlarge down>
        <DesktopView titleObject={props.titleObject} />
      </Breakpoint>
    </>
  );
}

const DesktopView = props => {
  const appSettings = useContext(AppContext);
  const { fgColorDetail } = appSettings;
  const { titleObject } = props;
  return (
    <Card
      style={{
        backgroundColor: fgColorDetail,
        fontSize: 'calc(10px + 2vmin)',
        alignItems: 'center'
      }}
    >
      <Container>
        <Image
          rounded
          src={titleObject.thumbnail}
          style={{ width: titleObject.thumbnailWidth.desktop }}
        />
        {titleObject.title}
      </Container>

      <Card.Body style={{ fontSize: 'calc(5px + 2vmin)' }}>
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
