const host = `${window.location.origin}`;

export const fetchDownloads = (software_id) => {
  return fetch(
    `${host}/api/v1/download?software_id=${software_id}`
  ).then(resp => resp.json());
};

export const postDownload = (download) => {
  return fetch(`${host}/api/v1/download`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(download),
  }).then(resp => resp.json());
};

export const putDownload = (download) => {
  return fetch(`${host}/api/v1/download/${download.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(download),
  }).then(resp => resp.json());
};

export const deleteDownload = (downloadId) => {
  return fetch(`${host}/api/v1/download/${downloadId}`, {
    method: 'DELETE',
  }).then(resp => resp.json());
};
