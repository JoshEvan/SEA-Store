import { BACKEND_URL, GET_ALL_ITEM } from "../config/api";
import callAPI from './api.js';

export const serviceGetAllItems = async () => {
  return await fetch(BACKEND_URL + GET_ALL_ITEM);
};

export const serviceDeleteItem = async(itemId) => {
  const res = await callAPI(`/products/delete/${itemId}`, 'DELETE');
  if (res.status != 200) {
    return null;
  }
  return await res.json();
}
