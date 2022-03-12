import { useInfiniteQuery, useQuery } from 'react-query';
import { AxiosRequestConfig } from 'axios';
import axios from '../../infrastructure/ApiHelper';
import { pageDataLimit } from '../../utils/constants';

const getAllParkingLotList = async (
  pageParam: number,
  searchTerm: string,
  sortOrder: { sortBy: string; order: string },
  filterParams: { [key: string]: string[] }
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

  const allParkingLotListEntitySet = `api/customer-service/lots?limit=${pageDataLimit}&offset=${pageParam}`;
  const queryStr = query && query.toString().length ? `&${query.toString()}` : '';
  const url = query
    ? `&countryCode=us${queryStr}`
    : `&countryCode=us`;
  const options: AxiosRequestConfig = {
    method: 'get',
    url: allParkingLotListEntitySet + url,
  };
  const { data } = await axios(options);
  return data;
};

export const useAllParkingLotList = (
  query: string,
  sortOrder: { sortBy: string; order: string },
  filterParams: { [key: string]: string[] }
) => {
  return useInfiniteQuery(
    ['getAllParkingLotList', query, sortOrder, filterParams],
    ({ pageParam = 0 }) =>
      getAllParkingLotList(pageParam, query, sortOrder, filterParams),
    {
      getNextPageParam: (lastGroup: any) => {
        if (
          lastGroup.data.pagination.offset <
          lastGroup.data.pagination.totalCount
        ) {
          return lastGroup.data.pagination.offset + pageDataLimit;
        }
      },
      keepPreviousData: true,
    }
  );
};

const getProductsByLotId = async (lotId: string) => {
  if (lotId) {
    const options: AxiosRequestConfig = {
      method: 'get',
      url: `/api/customer-service/lots/${lotId}/products?countryCode=us&skipPagination=true`
    };
    const { data } = await axios(options);
    return data;
  }else{
    return null;
  }
};

export const useGetProductsByLotId = (
  lotId: string,
  onSuccess: any,
  onError: any
) => {
  return useQuery(
    ['getLotProductDetails', lotId, onSuccess, onError],
    () => getProductsByLotId(lotId),
    {
      onSuccess,
      onError,
      retry: false,
    }
  );
};
