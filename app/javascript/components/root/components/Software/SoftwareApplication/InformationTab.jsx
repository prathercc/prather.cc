import React, { useState, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { StandardImage, StandardCard, StandardButton, StandardModal, getThemeColor, StandardIconButton } from '../../Utility/Utility';
import CodeIcon from 'react-bootstrap-icons/dist/icons/code-slash';

const InformationTab = ({ setImageModalObj, style, app }) => {
    const { image_link, description } = app;
    const [loadingObj, setLoadingObj] = useState({ content: false, image: false });
    const [repoModalOpen, setRepoModalOpen] = useState(false);

    useEffect(() => {
        if (app)
            setLoadingObj({ ...loadingObj, content: true })
    }, [app]);

    const allContentLoaded = loadingObj.content && loadingObj.image;

    const RepoModalButtons = () => {
        return (
            <Row>
                <Col>
                    <StandardButton onClick={() => { window.open(app.repo_link); setRepoModalOpen(false); }}>Yes</StandardButton>
                </Col>
                <Col>
                    <StandardButton onClick={() => { setRepoModalOpen(false); }}>No</StandardButton>
                </Col>
            </Row>
        );
    };

    return (
        <>
            <Row style={{ ...style }}>
                <Col md={12} lg={allContentLoaded ? 5 : 12} style={{ display: 'flex', marginBottom: '1vh' }}>
                    <StandardCard noBorders style={{ verticalAlign: 'middle', maxWidth: '85%', color: getThemeColor(1) }}>
                        <StandardImage
                            toolTip='Expand Image'
                            className='defaultImageNudge'
                            style={{ maxWidth: '100%' }}
                            onClick={() => setImageModalObj({ open: true, imageLink: image_link })}
                            src={image_link}
                            onLoaded={() => setLoadingObj({ ...loadingObj, image: true })}
                            overlayText={app.is_legacy ? 'No Longer In Development' : ''}
                        />
                    </StandardCard>
                </Col>
                <Col md={12} lg={7} style={{ display: allContentLoaded ? 'flex' : 'none' }}>
                    <StandardCard title={app.name} style={{ verticalAlign: 'middle', width: '95%' }}>
                        <div style={{ margin: 'auto', maxWidth: '90%', textAlign: 'center', marginTop: '1vh' }} dangerouslySetInnerHTML={{ __html: description }} />
                        <StandardIconButton
                            icon={<CodeIcon />}
                            onClick={() => setRepoModalOpen(true)}
                            style={{ marginBottom: '1vh' }}
                            toolTip='View Repository'
                        />
                    </StandardCard>
                </Col>
            </Row >
            <StandardModal buttons={<RepoModalButtons />} title={`View Code`} modalOpen={repoModalOpen} handleModalClose={() => setRepoModalOpen(false)}>
                Open the official <span style={{ color: getThemeColor(1) }}>{app.name}</span> Github repository?
            </StandardModal>
        </>
    );
};

export default InformationTab;
