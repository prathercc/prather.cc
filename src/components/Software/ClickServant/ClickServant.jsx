import React, { useContext } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import clickservantMainView from '../../../images/software/clickservant/clickservantMainView.jpg';
import poico5 from '../../../images/software/clickservant/poico5.png';
import SoftwareTitle from '../SoftwareTitle';
import MaintenanceAlert from '../MaintenanceAlert';
import { AppContext } from '../../../AppContext';

function ClickServant() {
  const appSettings = useContext(AppContext);
  const { fgColor } = appSettings;
  return (
    <Container>
      <Jumbotron
        bg='dark'
        style={{
          backgroundColor: fgColor,
          marginTop: '5vh'
        }}
      >
        <SoftwareTitle
          titleObject={{
            title: 'Click-Servant',
            description: appDescription,
            image: `${clickservantMainView}`,
            imageWidth: { desktop: '30vw', mobile: '35vw' },
            thumbnail: `${poico5}`,
            thumbnailWidth: { desktop: '3vw', mobile: '3vw' }
          }}
        />
        <MaintenanceAlert applicationName='Click-Servant' />
      </Jumbotron>
    </Container>
  );
}

let appDescription = (
  <p>
    <strong>Click-Servant</strong>&nbsp;is a&nbsp;
    <a href='https://docs.microsoft.com/en-us/cpp/dotnet' rel='nofollow'>
      C++/CLI
    </a>
    &nbsp;application that is used to automate mouse clicks &amp; key presses.
    This application supports profile saving/loading so that preferred settings
    may be shared or used again with ease.
  </p>
);

export default ClickServant;
