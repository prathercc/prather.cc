const host = `${window.location.origin}`;

export const fetchDownloads = async (software_id, setDownloads) => {
  const response = await fetch(
    `${host}/api/v1/download?software_id=${software_id}`
  );
  response
    .json()
    .then((resp) => {
      setDownloads(resp.data);
    })
    .catch((err) => console.log(err));
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
    })
    .catch((err) => console.log(err));
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
    .catch((err) => console.log(err));

};

export const incrementDownload = async (id) => {
  const response = await fetch(`${host}/api/v1/download/${id}?dl=true`, {
    method: 'PUT'
  });
  response
    .json()
    .then((resp) => {
    })
    .catch((err) => console.log(err));

};

export const deleteDownload = async (downloadId) => {
  const response = await fetch(`${host}/api/v1/download/${downloadId}`, {
    method: 'DELETE',
  });
  response
    .json()
    .then((resp) => {
    })
    .catch((err) => console.log(err));
};
