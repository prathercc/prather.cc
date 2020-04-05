const host = `${window.location.origin}`;

export const fetchDownloads = async (appName, setDownloads) => {
  const response = await fetch(
    `${host}/api/v1/download?application_name=${appName}`
  );
  response
    .json()
    .then((resp) => {
      setDownloads(resp.data);
    })
    .catch((err) => console.err(err));
};

export const postDownload = async (download) => {
  const response = await fetch(`${host}/api/v1/download`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(download),
  });
  response
    .json()
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => console.err(err));
};

export const putDownload = async (download) => {
  const response = await fetch(`${host}/api/v1/download/${download.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(download),
  });
  response
    .json()
    .then((resp) => {
    })
    .catch((err) => console.err(err));

};

export const deleteDownload = async (downloadId) => {
  const response = await fetch(`${host}/api/v1/download/${downloadId}`, {
    method: 'DELETE',
  });
  response
    .json()
    .then((resp) => {
    })
    .catch((err) => console.err(err));
};
