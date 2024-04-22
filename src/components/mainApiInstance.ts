import axios from "axios";

export const mainUrl = () => `https://api.magicslide.uz/api/v1`;

const mainApiInstance = axios.create({
  baseURL: mainUrl(),
  headers: {
    Accept: 'application/json'
  },
  withCredentials: true
});

export default mainApiInstance;