const host = `${window.location.origin}`;

export const fetchDownloads = async (appName) => {
    console.log(appName)
  const response = await fetch(`${host}/api/v1/download`);
  if (response.status === 200) {
    const jsonData = await response.json();
    return jsonData.data.filter(
      (download) => download.application_name === appName
    );
  } else {
    return null;
  }
};
