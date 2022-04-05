import { useInfiniteQuery } from 'react-query';
import { AxiosRequestConfig } from 'axios';
import axios from '../../infrastructure/ApiHelper';
import { pageDataLimit } from '../../utils/constants';

function getQueryStr (query: any) {
  if (query) {
      if (query.toString().length) {
          return `&countryCode=us&${query.toString()}`;
      }
      return '&countryCode=us';

  }
  return '&countryCode=us';
}

const getAllUsersList = async (
  pageParam: number,
  searchTerm: string,
  sortOrder: { sortBy: string; order: string },
  filterParams?: { [key: string]: string[] }
) => {
  const query = new URLSearchParams();
  if (searchTerm) {
    query.append('search', searchTerm);
  }
  if (sortOrder.sortBy.trim()) {
    query.append('sortBy', sortOrder.sortBy);
  }
  if (sortOrder.order.trim()) {
    query.append('order', sortOrder.order);
  }
  if (filterParams && Object.keys(filterParams).length > 0) {
    for (const key of Object.keys(filterParams)) {
      query.append(key, JSON.stringify(filterParams[key]));
    }
  }


  const allUsersListEntitySet = `api/user-service/users?limit=${pageDataLimit}&offset=${pageParam}`;
  const url = getQueryStr(query);

  const options: AxiosRequestConfig = {
      method: 'get',
      url: allUsersListEntitySet + url
  };
  const { data } = await axios(options);
  return data;
};

export const useAllUsersList = (
  query: string,
  sortOrder: { sortBy: string; order: string },
  filterParams?: { [key: string]: string[] }
) => {
  return useInfiniteQuery(
    ['getAllUsersList', query, sortOrder, filterParams],
    ({ pageParam = 0 }) =>
      getAllUsersList(pageParam, query, sortOrder, filterParams),
    {
      getNextPageParam: (lastGroup: any) => {
        if (lastGroup.data.pagination.offset < lastGroup.data.pagination.totalCount) {
          return lastGroup.data.pagination.offset + pageDataLimit;
        }
        return lastGroup.data.pagination.offset; 
      },
      keepPreviousData: true,
    }
  );
};
