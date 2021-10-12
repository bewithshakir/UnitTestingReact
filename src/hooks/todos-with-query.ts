import { AxiosRequestConfig } from "axios";
import axios from "../infrastructure/ApiHelper";

export const fetchQueryTodos = async () => {
  const payload: AxiosRequestConfig = {
    method: 'get',
    url: '/todos'
  };
  const { data } = await axios(payload);
  return data;
};