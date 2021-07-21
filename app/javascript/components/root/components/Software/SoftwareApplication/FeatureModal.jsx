import React, { useState, useEffect } from "react";
import {
  StandardModal,
  StandardButton,
  toggleNotification,
} from "../../Utility/Utility";
import { putFeature, postFeature } from "../../../featureService";
import { Row, Col, Form, Input } from "antd";

const FeatureModal = ({ featureObj, handleModalClose, modalOpen }) => {
  const [feature, setFeature] = useState(featureObj);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(featureObj);
  }, [featureObj]);

  const handleCreateFeature = async () => {
    try {
      await postFeature(feature);
      toggleNotification("success", "Success", "Successfully created feature!");
      handleModalClose();
    } catch (e) {
      toggleNotification("error", "Failure", "Failed to create feature!");
    }
  };

  const handleEditFeature = async () => {
    try {
      await putFeature(feature);
      toggleNotification("success", "Success", "Successfully saved feature!");
      handleModalClose();
    } catch (e) {
      toggleNotification("error", "Failure", "Failed save feature!");
    }
  };

  return (
    <StandardModal
      title={`Feature Alteration - ${featureObj.id ? "Modify" : "Create"}`}
      modalOpen={modalOpen}
      handleModalClose={handleModalClose}
    >
      {feature && (
        <Form
          preserve={false}
          initialValues={feature}
          onValuesChange={(e) => setFeature({ ...feature, ...e })}
          form={form}
          layout="vertical"
          onFinish={featureObj.id ? handleEditFeature : handleCreateFeature}
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "An application name must be present",
              },
            ]}
            name="application_name"
            label="Application Name"
          >
            <Input disabled placeholder="Type a file name" />
          </Form.Item>
          <Form.Item
            rules={[
              { required: true, message: "A feature title must be present" },
            ]}
            name="title"
            label="Feature Title"
          >
            <Input placeholder="Type a title" />
          </Form.Item>
          <Form.Item
            rules={[{ required: false }]}
            name="image_link"
            label="Image Link"
          >
            <Input placeholder="Type a URL" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "A feature description must be present",
              },
            ]}
            name="content_description"
            label="Description"
          >
            <Input.TextArea rows={4} placeholder="Type a description" />
          </Form.Item>
          <Form.Item>
            <Row>
              <Col span={12}>
                <StandardButton onClick={handleModalClose}>
                  Cancel
                </StandardButton>
              </Col>
              <Col span={12}>
                <StandardButton htmlType="submit">Save</StandardButton>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      )}
    </StandardModal>
  );
};

export default FeatureModal;
