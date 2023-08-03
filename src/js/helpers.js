import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, method = '', uploadData = undefined) {
  try {
    const fetchPromise = method
      ? fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);

    if (method === 'DELETE') {
      if (!res.ok) throw new Error(`${res.status}`);
      return res;
    }

    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    return data;
  } catch (err) {
    throw err;
  }
};
