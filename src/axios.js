import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://calm-ruby-slug-wig.cyclic.app',
  baseURL: 'http://localhost:9000',
});

export default instance;
