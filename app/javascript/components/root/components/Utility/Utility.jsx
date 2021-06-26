import React, { useState, useContext } from "react";
import { AppContext } from "../../AppContext";
import { Row, Col, Spin, Tooltip, notification, Modal, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

export const StandardImageModal = ({
  modalOpen,
  handleModalClose,
  imageLink,
}) => {
  const CancelButton = () => (
    <StandardButton onClick={handleModalClose}>Cancel</StandardButton>
  );
  return (
    <StandardModal
      buttons={<CancelButton />}
      title="View Image"
      modalOpen={modalOpen}
      handleModalClose={handleModalClose}
    >
      <div style={{ maxWidth: "max-content", margin: "auto" }}>
        <StandardImage
          onClick={() => {
            window.open(imageLink);
            handleModalClose();
          }}
          className="defaultImageNudge"
          src={imageLink}
          style={{ maxWidth: "85%" }}
        />
      </div>
    </StandardModal>
  );
};

export const StandardConfirmationModal = ({
  modalOpen,
  handleModalClose,
  confirmationMessage,
  callback,
}) => {

  const Buttons = () => (
    <Row>
      <Col span={12}>
        <StandardButton onClick={handleModalClose}>Cancel</StandardButton>
      </Col>
      <Col span={12}>
        <StandardButton onClick={callback}>Continue</StandardButton>
      </Col>
    </Row>
  );
  return (
    <StandardModal
      width={450}
      modalOpen={modalOpen}
      handleModalClose={handleModalClose}
      title="Are you sure?"
      buttons={<Buttons />}
    >
      {confirmationMessage}
    </StandardModal>
  );
};

export const StandardLinkModal = ({
  modalOpen,
  handleModalClose,
  children,
  link,
}) => {
  const handleLinkOpen = () => {
    window.open(link);
    handleModalClose();
  };
  const Buttons = () => (
    <Row>
      <Col span={12}>
        <StandardButton onClick={handleModalClose}>Cancel</StandardButton>
      </Col>
      <Col span={12}>
        <StandardButton onClick={handleLinkOpen}>Open</StandardButton>
      </Col>
    </Row>
  );
  return (
    <StandardModal
      width={450}
      modalOpen={modalOpen}
      handleModalClose={handleModalClose}
      title="External Link"
      buttons={<Buttons />}
    >
      {children}
    </StandardModal>
  );
};

export const StandardImage = ({
  style,
  noErrorMessage,
  src,
  className,
  onClick,
  onLoaded = () => {},
  toolTip,
  noLoader = false,
  includeModal = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleOnLoad = () => {
    setIsLoading(false);
    onLoaded();
  };
  const handleOnError = () => {
    setHasError(true);
    setIsLoading(false);
    onLoaded();
  };
  const handleClick = () => {
    includeModal ? setModalOpen(true) : onClick();
  };
  return (
    <>
      <StandardImageModal
        imageLink={src}
        modalOpen={modalOpen}
        handleModalClose={() => setModalOpen(false)}
      />
      {isLoading && !noLoader && <Spin />}
      {hasError && noErrorMessage && (
        <CloseCircleOutlined
          style={{
            fontSize: getIconSizing(),
            color: getThemeColor(),
            paddingLeft: "3px",
            paddingRight: "3px",
          }}
        />
      )}
      {hasError && !noErrorMessage && (
        <div
          style={{
            padding: "15px",
            borderRadius: "10px",
            marginTop: "2vh",
            marginBottom: "2vh",
            paddingTop: "2px",
            paddingBottom: "2px",
          }}
        >
          <CloseCircleOutlined
            style={{ fontSize: getIconSizing(), color: getThemeColor() }}
          />
        </div>
      )}
      {!hasError && !toolTip && (
        <img
          onClick={handleClick}
          className={className}
          src={src}
          style={{ ...style, display: isLoading ? "none" : "" }}
          onLoad={handleOnLoad}
          onError={handleOnError}
        />
      )}
      {!hasError && toolTip && (
        <StandardTooltip text={toolTip}>
          <img
            onClick={handleClick}
            className={className}
            src={src}
            style={{ ...style, display: isLoading ? "none" : "" }}
            onLoad={handleOnLoad}
            onError={handleOnError}
          />
        </StandardTooltip>
      )}
    </>
  );
};

export const StandardButton = ({
  onClick,
  style,
  children,
  disabled = false,
  ...props
}) => {
  const { standardSmallFontSize } = useContext(AppContext);
  return (
    <Button
      {...props}
      onClick={disabled ? () => {} : onClick}
      className={disabled ? "defaultButtonDisabled" : "defaultButton"}
      style={{
        margin: "auto",
        ...style,
        fontSize: standardSmallFontSize,
        alignItems: "center",
        maxWidth: "95%",
        minWidth: "95%",
        textAlign: "center",
      }}
    >
      {children}
    </Button>
  );
};

export const StandardIconButton = ({
  icon,
  style,
  onClick,
  toolTip,
  disabled = false,
}) => {
  return (
    <Tooltip title={toolTip}>
      <span
        style={{ cursor: "pointer", ...style }}
        onClick={disabled ? () => {} : onClick}
        className={disabled ? "iconButtonDisabled" : "iconButton"}
      >
        {icon}
      </span>
    </Tooltip>
  );
};

export const toggleNotification = (
  type = "success",
  title = "Notification Title",
  text = "Default Notification Message"
) => {
  notification[type]({ message: title, description: text });
};

export const StandardSeparator = ({ style, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{ ...style, display: "inline", color: getThemeColor() }}
    >
      {" "}
      <em>/</em>{" "}
    </div>
  );
};

export const StandardCard = ({
  title,
  style,
  children,
  className,
  onClick,
  noBorders,
}) => {
  const { standardBodyFontSize, fontStyle } = useContext(AppContext);
  return (
    <div
      onClick={onClick}
      className={className}
      style={
        noBorders
          ? { ...style, margin: "auto" }
          : {
              ...style,
              fontSize: standardBodyFontSize,
              margin: "auto",
              borderBottom: `none`,
              borderTop: `none`,
              borderRadius: "5px",
              boxShadow: "3px 3px 10px black",
              fontFamily: fontStyle,
            }
      }
    >
      <div
        style={{
          fontSize: standardBodyFontSize,
          minWidth: "100%",
          color: "white",
          background: getThemeBackground(),
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
};

export const StandardPage = ({ title = "", children, style }) => {
  const { bgColor, fontStyle, standardBodyFontSize, standardTitleFontSize } =
    useContext(AppContext);
  return (
    <div
      style={{
        backgroundColor: "transparent",
        position: "relative",
        maxWidth: "75%",
        margin: "auto",
        ...style,
        paddingTop: "6vh",
        borderRadius: "10px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgb(0, 21, 41, 0.8)",
          marginTop: "0vh",
          borderRadius: "10px",
          boxShadow: "3px 3px 10px black",
        }}
      >
        <div
          style={{
            fontFamily: fontStyle,
            fontSize: standardBodyFontSize,
            paddingTop: "0vh",
            paddingBottom: "2vh",
            borderTop: "none",
            paddingLeft: "0vw",
            paddingRight: "0vw",
            borderRadius: "5px",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
        >
          <div
            style={{
              fontFamily: fontStyle,
              fontSize: standardTitleFontSize,
              margin: "auto",
              padding: 0,
              borderRadius: "5px",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              background: getThemeBackground(),
            }}
          >
            {title}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export const StandardModal = ({
  modalOpen,
  handleModalClose,
  children,
  buttons,
  title,
  width = 800,
}) => {
  return (
    <Modal
      destroyOnClose
      width={width}
      onCancel={handleModalClose}
      centered
      mask={false}
      style={{}}
      footer={null}
      closable={false}
      title={title}
      visible={modalOpen}
    >
      <div style={{ textAlign: "center" }}>{children}</div>
      <div style={{ marginTop: "1vh" }}>{buttons}</div>
    </Modal>
  );
};

export const getThemeBackground = () => {
  return "linear-gradient(to top left, #5a415a, rgb(79, 201, 201, 0.5))";
};

export const getThemeColor = (opacity = 1) => {
  return `rgb(79, 201, 201, ${opacity})`;
};

export const getIconSizing = (size = "small") => {
  let largeLogic = "calc(1px + 3.5vmin)";
  let smallLogic = "calc(1px + 2.5vmin)";
  return size === "large" ? largeLogic : smallLogic;
};
