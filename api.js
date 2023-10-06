import { baseUrl } from './constants';
import { setup } from 'axios-cache-adapter';
import axios from 'axios';

// const api = setup({
//   baseURL: baseUrl,
// });

const api = axios.create({
  baseURL: baseUrl,
});

export { api };
