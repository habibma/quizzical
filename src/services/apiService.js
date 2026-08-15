// generic HTTP client for making API requests

export async function request(url, options = {}) {

  console.log("Making API request to:", url, "with options:", options);
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  return response.json();
}

