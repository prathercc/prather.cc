const host = `${window.location.origin}`;

export const fetchDownloads = (software_id, sortBy = 'os_type', sortDir = 'asc') => {
  return fetch(
    `${host}/api/v1/download?software_id=${software_id}&sort_by=${sortBy}&sort_dir=${sortDir}`
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
