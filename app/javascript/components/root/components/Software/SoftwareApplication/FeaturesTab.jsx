import React, { useState, useEffect } from 'react';
import { StandardImage, StandardCard, StandardModal, StandardIconButton, StandardButton, toggleNotification } from '../../Utility/Utility';
import { fetchFeatures, putFeature, deleteFeature, postFeature } from '../../../featureService';
import { Row, Col, Carousel, Form, Input } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

const FeaturesTab = ({ setImageModalObj, userData, style, app }) => {
    const [features, setFeatures] = useState(null);
    useEffect(() => {
        const featureFetch = async () => {
            const { data } = await fetchFeatures(app.id);
            setFeatures(data);
        };
        setFeatures(null);
        featureFetch();
    }, [app]);

    return (
        <div style={{ ...style }}>
            <Carousel autoplaySpeed={2500} adaptiveHeight autoplay effect='scrollx' dotPosition='bottom'>
                {
                    features?.map((feature, i) => {
                        return (
                            <div key={i}>
                                <SoftwareFeature
                                    app={app}
                                    setImageModalObj={setImageModalObj}
                                    userData={userData}
                                    feature={feature}
                                    setFeatures={setFeatures} />
                            </div>
                        )
                    })
                }
            </Carousel>
            {features?.length === 0 && <div>No features found</div>}
            {userData?.group === 'Administrator' && <EditFeature setFeatures={setFeatures} app={app} />}
        </div>
    );
};

const SoftwareFeature = ({ userData, setImageModalObj, feature, setFeatures, app }) => {
    const [loadingObj, setLoadingObj] = useState({ content: false, image: false });

    useEffect(() => {
        if (feature)
            setLoadingObj({ ...loadingObj, content: true })
    }, [feature]);

    const allContentLoaded = loadingObj.content && loadingObj.image;

    return (
        <Row style={{ marginBottom: '5vh' }}>
            <Col xs={24} md={allContentLoaded ? 9 : 24} style={{ display: 'flex', marginBottom: '1vh' }}>
                <StandardCard noBorders style={{ verticalAlign: 'middle', margin: 'auto', maxWidth: '85%' }}>
                    <StandardImage
                        className='defaultImageNudge'
                        src={feature.image_link}
                        onClick={() => setImageModalObj({ open: true, imageLink: feature.image_link })}
                        style={{ maxWidth: '100%' }}
                        onLoaded={() => setLoadingObj({ ...loadingObj, image: true })}
                        overlayText={app.is_legacy ? 'No Longer In Development' : ''}
                    />
                </StandardCard>
            </Col>
            <Col xs={24} md={15} style={{ display: allContentLoaded ? 'flex' : 'none' }}>
                <StandardCard title={feature.title} style={{ verticalAlign: 'middle', width: '95%' }}>
                    <div style={{ margin: 'auto', maxWidth: '95%', textAlign: 'left', marginTop: '1vh', color: 'white' }} dangerouslySetInnerHTML={{ __html: feature.content_description }} />
                    {userData?.group === 'Administrator' && <EditFeature app={app} setFeatures={setFeatures} feature={feature} />}
                </StandardCard>
            </Col>
        </Row >
    );
};

const EditFeature = ({ feature, setFeatures, app: { id, name } }) => {
    const blankFeature = { title: '', image_link: '', content_description: '', application_name: name, software_id: id };
    const [modalOpen, setModalOpen] = useState(false);
    const [activeFeature, setActiveFeature] = useState(feature ? feature : blankFeature);
    const saveButtonDisabled = activeFeature.title.length === 0 || activeFeature.content_description.length === 0 ||
        activeFeature.application_name.length === 0 || activeFeature.application_name.length === 0;
    const [form] = Form.useForm();
    const handleCreateFeature = async () => {
        const { data } = await postFeature(activeFeature);
        if (data) {
            const { data } = await fetchFeatures(id);
            setFeatures(data);
            setActiveFeature(blankFeature);
            form.setFieldsValue(blankFeature);
            setModalOpen(false);
            toggleNotification('success', 'Success', 'Successfully created feature!');
        }
        else {
            toggleNotification('error', 'Failure', 'Failed to create feature!');
        }
    };

    const handleEditFeature = async () => {
        const { data } = await putFeature(activeFeature);
        if (data) {
            const { data } = await fetchFeatures(id);
            setFeatures(data);
            setModalOpen(false);
            toggleNotification('success', 'Success', 'Successfully saved feature!');
        }
        else {
            toggleNotification('error', 'Failure', 'Failed save feature!');
        }
    };

    const handleDeleteFeature = async () => {
        const { data } = await deleteFeature(activeFeature.id);
        if (data) {
            setFeatures(null);
            const { data } = await fetchFeatures(id);
            setFeatures(data);
            setModalOpen(false);
            toggleNotification('success', 'Success', 'Successfully deleted feature!');
        }
        else {
            toggleNotification('error', 'Failure', 'Failed to delete feature!');
        }
    };

    const EditButtons = () => {
        return (
            <Row>
                <Col span={8}>
                    <StandardButton onClick={() => setModalOpen(false)}>Cancel</StandardButton>
                </Col>
                <Col span={8}>
                    <StandardButton onClick={handleDeleteFeature}>Delete</StandardButton>
                </Col>
                <Col span={8}>
                    <StandardButton disabled={saveButtonDisabled} onClick={handleEditFeature}>Save</StandardButton>
                </Col>
            </Row>
        );
    };

    const CreateButtons = () => {
        return (
            <Row>
                <Col span={12}>
                    <StandardButton onClick={() => setModalOpen(false)}>Cancel</StandardButton>
                </Col>
                <Col span={12}>
                    <StandardButton disabled={saveButtonDisabled} style={{ maxWidth: 'max-content', paddingLeft: '15px', paddingRight: '15px' }} onClick={() => handleCreateFeature()}>Save</StandardButton>
                </Col>
            </Row>
        );
    };

    return (
        <>
            {feature && <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Edit Feature' style={{ marginBottom: '1vh' }} icon={<EditOutlined />} />}
            {!feature && <StandardIconButton onClick={() => setModalOpen(true)} toolTip='Add Feature' style={{ marginTop: '1vh' }} icon={<PlusOutlined />} />}
            <StandardModal title={`Feature Alteration - ${feature ? 'Modify' : 'Create'}`} buttons={feature ? <EditButtons /> : <CreateButtons />} modalOpen={modalOpen} handleModalClose={() => setModalOpen(false)}>
                <Form initialValues={{ ...activeFeature }} onValuesChange={(e) => setActiveFeature({ ...activeFeature, ...e })} form={form} layout='vertical'>
                    <Form.Item name='application_name' label='Application Name'>
                        <Input disabled placeholder='Type a file name' />
                    </Form.Item>
                    <Form.Item name='title' label='Feature Title'>
                        <Input placeholder='Type a title' />
                    </Form.Item>
                    <Form.Item name='image_link' label='Image Link'>
                        <Input placeholder='Type a URL' />
                    </Form.Item>
                    <Form.Item name='content_description' label='Description'>
                        <Input.TextArea rows={4} placeholder='Type a description' />
                    </Form.Item>
                </Form>
            </StandardModal>
        </>
    );
};

export default FeaturesTab;
