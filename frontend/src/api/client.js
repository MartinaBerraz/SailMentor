// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper
const baseUrl = "http://127.0.0.1:8000/api/";

export async function client(endpoint, { body, ...customConfig } = {}) {
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
  };

  if (body) {
    if (!(body instanceof FormData)) {
      // Add the "Content-Type" header only when the body is not FormData
      config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
      };
      // Stringify the body if it's not FormData
      config.body = JSON.stringify(body);
    } else {
      config.body = body;
      config.headers = {};
    }
  }

  let data;
  try {
    const response = await window.fetch(baseUrl + endpoint, config);
    console.log(baseUrl + endpoint);
    data = await response.json();
    if (response.ok) {
      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      };
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body });
};

client.delete = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body, method: "DELETE" });
};
