import React, { useEffect, useState } from "react";
import { fetchAllSoftware } from "../../../softwareService";
import { fetchFeatures, deleteFeature } from "../../../featureService";
import { deleteDownload, fetchDownloads } from "../../../downloadService";
import {
  StandardPage,
  StandardIconButton,
  StandardImage,
  StandardCard,
  StandardConfirmationModal,
  toggleNotification,
} from "../../Utility/Utility";
import { Spin, Descriptions } from "antd";
import {
  EditOutlined,
  FileAddOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import SoftwareModal from "./SoftwareModal";
import FeatureModal from "./FeatureModal";
import DownloadModal from "./DownloadModal";

function SoftwareApplication({ userData, name }) {
  const [features, setFeatures] = useState(null);
  const [downloads, setDownloads] = useState(null);
  const [app, setApp] = useState(null);
  const [deleteFeatureModalOpen, setDeleteFeatureModalOpen] = useState(false);
  const [deleteDownloadModalOpen, setDeleteDownloadModalOpen] = useState(false);
  const [softwareModalOpen, setSoftwareModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [featureModalOpen, setFeatureModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [selectedDownload, setSelectedDownload] = useState(null);

  const handleFeatureModalClose = async () => {
    try {
      setFeatureModalOpen(false);
      setSelectedFeature(null);
      const { data } = await fetchFeatures(app.id);
      setFeatures(data);
    } catch (e) {
      console.error(e);
      toggleNotification("error", "Failure", "Failed to fetch features!");
    }
  };

  const handleDownloadModalClose = async () => {
    try {
      setDownloadModalOpen(false);
      setSelectedDownload(null);
      const { data } = await fetchDownloads(app.id);
      setDownloads(data);
    } catch (e) {
      console.error(e);
      toggleNotification("error", "Failure", "Failed to fetch downloads!");
    }
  };

  const handleDeleteFeature = async () => {
    try {
      await deleteFeature(selectedFeature.id);
      setSelectedFeature(null);
      toggleNotification("success", "Success", "Successfully deleted feature!");
      setDeleteFeatureModalOpen(false);
      const { data } = await fetchFeatures(app.id);
      setFeatures(data);
    } catch (e) {
      toggleNotification("error", "Failure", "Failed to delete feature!");
    }
  };

  const handleDeleteDownload = async () => {
    try {
      await deleteDownload(selectedDownload.id);
      setSelectedDownload(null);
      toggleNotification(
        "success",
        "Success",
        "Successfully deleted download!"
      );
      setDeleteDownloadModalOpen(false);
      const { data } = await fetchDownloads(app.id);
      setDownloads(data);
    } catch (e) {
      toggleNotification("error", "Failure", "Failed to delete download!");
    }
  };

  useEffect(() => {
    const downloadFetch = async () => {
      try {
        const { data } = await fetchDownloads(app.id);
        setDownloads(data);
      } catch (e) {
        console.error(e);
        toggleNotification("error", "Failure", "Failed to fetch downloads");
      }
    };
    if (app) {
      downloadFetch();
    }
  }, [app]);

  useEffect(() => {
    const featureFetch = async () => {
      try {
        const { data } = await fetchFeatures(app.id);
        setFeatures(data);
      } catch (e) {
        console.error(e);
        toggleNotification("error", "Failure", "Failed to fetch features");
      }
    };
    if (app) {
      featureFetch();
    }
  }, [app]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await fetchAllSoftware();
        const selectedSoftware = data.find((x) => x.name === name);
        if (selectedSoftware) {
          setApp(selectedSoftware);
        } else {
          window.open("/", "_self");
        }
      } catch (e) {
        console.error(e);
        toggleNotification("error", "Failure", "Failed to fetch software!");
      }
    };
    setApp(null);
    if (name) {
      fetch();
    }
  }, [name]);

  return (
    <StandardPage title={app && app.name}>
      {!app && <Spin style={{ marginTop: "1vh" }} />}
      {app && (
        <>
          <Descriptions layout="vertical" bordered>
            <Descriptions.Item label="Application Name">
              {app.name}
              <div>
                <a href={app.repo_link}>View on GitHub</a>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Icon">
              <StandardImage
                style={{
                  maxWidth: "180px",
                  minWidth: "180px",
                  width: "95%",
                  borderRadius: "15px",
                  pointerEvents: "none",
                }}
                className="siteLogo"
                src={app && app.icon_link}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              <div
                dangerouslySetInnerHTML={{
                  __html: app.description,
                }}
              />
            </Descriptions.Item>
            {app.youtube_link && (
              <Descriptions.Item span={3} label="Video">
                <div style={{ maxWidth: "50%", margin: "auto" }}>
                  <StandardCard className="video-container">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${app.youtube_link}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </StandardCard>
                </div>
              </Descriptions.Item>
            )}
            {features &&
              features.map((feature, i) => {
                return (
                  <>
                    <Descriptions.Item
                      span={2}
                      label={`Feature ${i + 1} - ${feature.title}`}
                    >
                      <StandardImage
                        className="defaultImageNudge"
                        src={feature.image_link}
                        includeModal
                        style={{ maxWidth: "100%" }}
                      />
                      {userData && (
                        <div>
                          <StandardIconButton
                            onClick={() => {
                              setSelectedFeature(feature);
                              setFeatureModalOpen(true);
                            }}
                            icon={<EditOutlined />}
                            toolTip="Edit Feature"
                          />
                          <StandardIconButton
                            onClick={() => {
                              setSelectedFeature(feature);
                              setDeleteFeatureModalOpen(true);
                            }}
                            icon={<DeleteOutlined />}
                            toolTip="Delete Feature"
                          />
                          <StandardConfirmationModal
                            modalOpen={deleteFeatureModalOpen}
                            handleModalClose={() =>
                              setDeleteFeatureModalOpen(false)
                            }
                            callback={handleDeleteFeature}
                            confirmationMessage="Are you sure you want to delete this feature?"
                          />
                        </div>
                      )}
                    </Descriptions.Item>
                    <Descriptions.Item span={1} label={``}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: feature.content_description,
                        }}
                      />
                    </Descriptions.Item>
                  </>
                );
              })}

            {downloads?.map((download, i) => {
              return (
                <>
                  <Descriptions.Item span={1} label={`Download ${i + 1}`}>
                    {download.file_name}
                    {userData && (
                      <div>
                        <StandardIconButton
                          onClick={() => {
                            setSelectedDownload(download);
                            setDownloadModalOpen(true);
                          }}
                          icon={<EditOutlined />}
                          toolTip="Edit Download"
                        />
                        <StandardIconButton
                          onClick={() => {
                            setSelectedDownload(download);
                            setDeleteDownloadModalOpen(true);
                          }}
                          icon={<DeleteOutlined />}
                          toolTip="Delete Download"
                        />
                        <StandardConfirmationModal
                          modalOpen={deleteDownloadModalOpen}
                          handleModalClose={() =>
                            setDeleteDownloadModalOpen(false)
                          }
                          callback={handleDeleteDownload}
                          confirmationMessage="Are you sure you want to delete this download?"
                        />
                      </div>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Link">
                    <a href={download.path}>Download {download.file_name}</a>
                  </Descriptions.Item>
                  <Descriptions.Item label="Description" span={1}>
                    {download.download_description}
                  </Descriptions.Item>
                </>
              );
            })}

            {userData && (
              <>
                <Descriptions.Item label="">
                  <StandardIconButton
                    onClick={() => setSoftwareModalOpen(true)}
                    icon={<EditOutlined />}
                    toolTip={`Edit ${app?.name}`}
                  />
                  <StandardIconButton
                    onClick={() => {
                      setSelectedFeature({
                        title: "",
                        image_link: "",
                        content_description: "",
                        application_name: app.name,
                        software_id: app.id,
                      });
                      setFeatureModalOpen(true);
                    }}
                    icon={<FileAddOutlined />}
                    toolTip="Add Feature"
                  />
                  <StandardIconButton
                    onClick={() => {
                      setSelectedDownload({
                        application_name: app.name,
                        file_name: "",
                        file_size: "",
                        os_type: "",
                        path: "",
                        download_count: 0,
                        software_id: app.id,
                        download_description: "",
                      });
                      setDownloadModalOpen(true);
                    }}
                    icon={<FileAddOutlined />}
                    toolTip="Add Download"
                  />
                </Descriptions.Item>
              </>
            )}
          </Descriptions>
          <SoftwareModal
            newSoftware={false}
            modalOpen={softwareModalOpen}
            setModalOpen={setSoftwareModalOpen}
            software={app}
            setSoftware={setApp}
          />
          {selectedFeature && (
            <FeatureModal
              modalOpen={featureModalOpen}
              app={app}
              featureObj={selectedFeature}
              handleModalClose={handleFeatureModalClose}
            />
          )}
          {selectedDownload && (
            <DownloadModal
              modalOpen={downloadModalOpen}
              downloadObj={selectedDownload}
              handleModalClose={handleDownloadModalClose}
            />
          )}
        </>
      )}
    </StandardPage>
  );
}

export default SoftwareApplication;
