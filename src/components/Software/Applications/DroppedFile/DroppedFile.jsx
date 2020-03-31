import React from 'react';
import { Container, Col, Row, ListGroup } from 'react-bootstrap';
import droppedfileMainView from '../../../../images/software/droppedfile/main_page_DroppedFile.jpg';
import droppedfileReport from '../../../../images/software/droppedfile/report_file_DroppedFile.jpg';
import droppedfileTerms from '../../../../images/software/droppedfile/terms_DroppedFile.jpg';
import logo from '../../../../images/software/droppedfile/Simple_Comic_zip.png';
import SoftwareTitle from '../../SoftwareTitle/SoftwareTitle';
import SoftwareFeature from '../../SoftwareFeature/SoftwareFeature';
import SoftwarePage from '../../SoftwarePage/SoftwarePage';
import MaintenanceAlert from '../../SoftwarePage/MaintenanceAlert';
import SoftwareCompatibility from '../../SoftwareCompatibility/SoftwareCompatibility';
import SoftwareTableRow from '../../SoftwareTable/SoftwareTableRow';
import SoftwareCode from '../../SoftwareCode/SoftwareCode';
import ListItem from '../../SoftwarePage/SoftwareListItem';

function DroppedFile(props) {
  const { sample = false } = props;
  const compatibility = {
    windows: false,
    linux: false,
    mac: false,
    android: false,
    ios: false
  };

  return (
    <>
      {sample ? (
        <SoftwareTableRow
          applicationName='DroppedFile'
          icon={`${logo}`}
          pageLink='/software/DroppedFile'
          language='C#, Javascript'
          compatibility={{ ...compatibility, windows: true }}
        />
      ) : (
        <SoftwarePage>
          <MaintenanceAlert applicationName='DroppedFile' />
          <SoftwareTitle
            titleObject={{
              title: 'DroppedFile',
              description: appTitleInfo,
              image: `${droppedfileMainView}`,
              imageWidth: { desktop: '30vw', mobile: '50vw' },
              thumbnail: `${logo}`,
              thumbnailWidth: { desktop: '3vw', mobile: '6vw' }
            }}
          />
          <SoftwareCompatibility
            compatibility={{ ...compatibility, windows: true }}
          ></SoftwareCompatibility>

          <SoftwareCode repoLink='https://github.com/prathercc/DroppedFile' />

          <SoftwareFeature
            descriptionObject={{
              image: `${droppedfileMainView}`,
              imageWidth: { desktop: '35vw', mobile: '50vw' },
              description: desc1,
              content: content1
            }}
          />

          <SoftwareFeature
            descriptionObject={{
              image: `${droppedfileReport}`,
              imageWidth: { desktop: '35vw', mobile: '50vw' },
              description: desc2,
              content: content2
            }}
          />

          <SoftwareFeature
            descriptionObject={{
              image: `${droppedfileTerms}`,
              imageWidth: { desktop: '35vw', mobile: '50vw' },
              description: desc3,
              content: content3
            }}
          />
        </SoftwarePage>
      )}
    </>
  );
}

let appTitleInfo = (
  <Container>ASP .NET Web Framework file sharing application.</Container>
);

let desc1 = (
  <Container>
    <Row>
      <Col>
        <strong>Upload File</strong>
      </Col>
    </Row>
  </Container>
);
let content1 = (
  <Container>
    <Row>
      <Col>
        <strong>Uploading a file</strong>
      </Col>
    </Row>
    <ListGroup style={{ textAlign: 'left' }}>
      <ListItem>Select file under 30mb in size and upload.</ListItem>
      <ListItem>
        Shareable link is generated and can be used by other users to download
        the uploaded content.
      </ListItem>
    </ListGroup>
  </Container>
);

let desc2 = (
  <Container>
    <Row>
      <Col>
        <strong>Report File</strong>
      </Col>
    </Row>
  </Container>
);

let content2 = (
  <Container>
    <Row>
      <Col>
        <strong>Reporting a file link</strong>
      </Col>
    </Row>
    <ListGroup style={{ textAlign: 'left' }}>
      <ListItem>Enter the shareable link of the offending file.</ListItem>
      <ListItem>Click the 'Report' button.</ListItem>
      <ListItem>A new report is created in the database.</ListItem>
    </ListGroup>
  </Container>
);

let desc3 = (
  <Container>
    <Row>
      <Col>
        <strong>Visitor Logging</strong>
      </Col>
    </Row>
  </Container>
);

let content3 = (
  <Container>
    <ListGroup style={{ textAlign: 'left' }}>
      <ListItem>User data logged on initial page load.</ListItem>
      <ListItem>User data logged on file link report.</ListItem>
      <ListItem>User data logged on file upload.</ListItem>
      <ListItem>Logged data retained in database.</ListItem>
    </ListGroup>
  </Container>
);

export default DroppedFile;
