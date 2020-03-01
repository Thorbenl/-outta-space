import axios from "axios";

export async function fetchBreeds(breed?: string) {
  const headers = {
    "x-api-key": "a6586d3b-0dbc-456e-9b1f-946b9580a546"
  };

  let url = "https://api.thecatapi.com/v1/breeds";
  if (breed) {
    let url = `https://api.thecatapi.com/v1/breeds/search?q=${breed}`;
    try {
      let response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
  try {
    let response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function fetchBreedsPicture(breed: string) {
  const headers = {
    "x-api-key": "a6586d3b-0dbc-456e-9b1f-946b9580a546"
  };
  let url = `https://api.thecatapi.com/v1/images/search?breed_id=${breed}`;
  try {
    let response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
