import { httpClient } from "./interceptor";

// get method
/**
 * @param {*} path
 * @param {*} params
 * @returns
 */
export const _get = async (path, body, params = {}) => {
  return await httpClient.get(path, body, params);
};

// post method
/**
 * @param {*} path
 * @param {*} body
 * @param {*} params
 * @returns
 */
export const _post = async (path, body, params = {}) => {
  return await httpClient.post(path, body, params);
};

// put method
/**
 * @param {*} path
 * @param {*} body
 * @param {*} params
 * @returns
 */
export const _put = async (path, body, params = {}) => {
  return await httpClient.put(path, body, params);
};

// delete method
/**
 * @param {*} path
 * @param {*} body
 * @param {*} params
 * @returns
 */
export const _delete = async (path, body, params = {}) => {
  return await httpClient.delete(path, body, params);
};

// patch method
/**
 * @param {*} path
 * @param {*} body
 * @param {*} params
 * @returns
 */
export const _patch = async (path, body, params = {}) => {
  return await httpClient.patch(path, body, params);
};
