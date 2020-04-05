const host = `${window.location.origin}`;

export const fetchDownloads = async (appName, setDownloads) => {
  const response = await fetch(`${host}/api/v1/download`);
  response
    .json()
    .then((resp) => {
      const filteredData = resp.data.filter(download => download.application_name === appName);
      setDownloads(filteredData);
    })
    .catch((err) => console.log(err));
};
