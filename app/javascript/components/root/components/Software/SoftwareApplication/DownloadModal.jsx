import React, { useState, useEffect } from "react";
import { postDownload, putDownload } from "../../../downloadService";
import {
  StandardModal,
  StandardButton,
  toggleNotification,
} from "../../Utility/Utility";
import { Row, Col, Form, Input, Select } from "antd";

const DownloadModal = ({ downloadObj, modalOpen, handleModalClose }) => {
  const osTypes = ["Windows", "Linux", "Mac", "Android", "All"];
  const [download, setDownload] = useState(downloadObj);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(downloadObj);
  }, [downloadObj]);

  const handleAddDownload = async () => {
    try {
      await postDownload(download);
      toggleNotification(
        "success",
        "Success",
        "Successfully created download!"
      );
      handleModalClose();
    } catch (e) {
      toggleNotification("error", "Failure", "Failed to create download!");
    }
  };

  const handleEditDownload = async () => {
    try {
      await putDownload(download);
      toggleNotification("success", "Success", "Successfully saved download!");
      handleModalClose();
    } catch (e) {
      toggleNotification("error", "Failure", "Failed save download!");
    }
  };

  return (
    <>
      <StandardModal
        title={`Download Alteration - ${downloadObj.id ? "Modify" : "Create"}`}
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
      >
        <Form
          preserve={false}
          onFinish={downloadObj.id ? handleEditDownload : handleAddDownload}
          initialValues={download}
          onValuesChange={(e) => setDownload({ ...download, ...e })}
          form={form}
          layout="vertical"
        >
          <Form.Item
            rules={[{ required: true, message: "A file name must be present" }]}
            name="file_name"
            label="Name"
          >
            <Input placeholder="Type a file name" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "A file size must be present" }]}
            name="file_size"
            label="Size"
          >
            <Input placeholder="Type a file size" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "An operating system must be present",
              },
            ]}
            name="os_type"
            label="Operating System"
          >
            <Select
              placeholder="Select an operating system"
              onChange={(e) =>
                form.setFieldsValue({ ...form.getFieldsValue(), os_type: e })
              }
            >
              {osTypes.map((os, i) => {
                return (
                  <Select.Option key={i} value={os}>
                    {os}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "A URL must be present" }]}
            name="path"
            label="Path"
          >
            <Input placeholder="Type a URL" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "A file description must be present" }]}
            name="download_description"
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
      </StandardModal>
    </>
  );
};

export default DownloadModal;
