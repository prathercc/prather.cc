const host = `${window.location.origin}`;

export const getSession = async () => {
  const response = await fetch(
    `${host}/api/v1/sessions`
  );
  response
    .json()
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => console.err(err));
};

export const authenticate = async (user) => {
  const response = await fetch(`${host}/api/v1/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  response
    .json()
    .then((resp) => {
      console.log(resp);
    })
    .catch((err) => console.err(err));
};

