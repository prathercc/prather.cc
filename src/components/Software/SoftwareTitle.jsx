import React, { useContext } from 'react';
import { Image, Card } from 'react-bootstrap';
import { Breakpoint } from 'react-socks';
import { AppContext } from '../../AppContext';

function ClickServant(props) {
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
      <Card.Header>
        <Image
          rounded
          src={titleObject.thumbnail}
          style={{ width: titleObject.thumbnailWidth.desktop }}
        />
        {titleObject.title}
      </Card.Header>
      <Card.Img
        style={{ width: titleObject.imageWidth.desktop }}
        variant='top'
        src={titleObject.image}
      />
      <Card.Body style={{ fontSize: 'calc(5px + 2vmin)' }}>
        <Card.Text>{titleObject.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ClickServant;
