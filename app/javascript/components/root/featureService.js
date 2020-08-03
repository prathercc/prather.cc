const host = `${window.location.origin}`;

export const fetchFeatures = (software_id) => {
  return fetch(
    `${host}/api/v1/feature?software_id=${software_id}`
  ).then(resp => resp.json());
};

export const postFeature = (feature) => {
  return fetch(`${host}/api/v1/feature`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feature),
  }).then(resp => resp.json());
};

export const putFeature = (feature) => {
  return fetch(`${host}/api/v1/feature/${feature.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(feature),
  }).then(resp => resp.json());
};

export const deleteFeature = (featureId) => {
  return fetch(`${host}/api/v1/feature/${featureId}`, {
    method: 'DELETE',
  }).then(resp => resp.json());
};
