import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { AxiosRequestConfig } from 'axios';
import axios from '../../infrastructure/ApiHelper';
import { pageDataLimit } from '../../utils/constants';

const getProductTypes = async () => {
  const options: AxiosRequestConfig = {
    method: 'get',
    url: '/api/product-service/products/product-groups?countryCode=us',
  };
  const { data } = await axios(options);
  return data;
};

export const useGetProductTypes = () => {
  return useQuery(['getProductTypes'], () => getProductTypes());
};

const getProductNames = async (productCd: string) => {
  if (productCd) {
    const options: AxiosRequestConfig = {
      method: 'get',
      url: `/api/product-service/products?countryCode=us&productGroupCd=${productCd}`,
    };
    const { data } = await axios(options);
    return data;
  }
};

export const useGetProductNames = (productCd: string) => {
  return useQuery(['getProductNames', productCd], () =>
    getProductNames(productCd)
  );
};

const getPricingModel = async () => {
  const options: AxiosRequestConfig = {
    method: 'get',
    url: '/api/config-service/pricing-models?countryCode=us',
  };
  const { data } = await axios(options);
  return data;
};

export const useGetPricingModel = () => {
  return useQuery(['getPricingModel'], () => getPricingModel());
};

const getProductsByLotId = async (
  pageParam: number,
  lotId: string,
  searchTerm: string
) => {
  if (lotId) {
    const query = new URLSearchParams();
    if (searchTerm) {
      query.append('search', searchTerm);
    }

    const productEntitySet = `/api/customer-service/lots/${lotId}/products?countryCode=us&limit=${pageDataLimit}&offset=${pageParam}`;
    const url = `${query.toString().length ? `&${query.toString()}` : ''}`;
    const payload: AxiosRequestConfig = {
      method: 'get',
      url: productEntitySet + url,
    };
    const { data } = await axios(payload);
    return data;
  }
};
export const useProductsByLotId = (
  lotId: string,
  searchTerm: string,
  updateKey: null | string
) => {
  return useInfiniteQuery(
    ['getProductsByLotId', lotId, searchTerm, updateKey],
    ({ pageParam = 0 }) => getProductsByLotId(pageParam, lotId, searchTerm),
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

interface IAddProductBody {
  productId: string;
  pricingModelCd: string;
  productNm: string;
  manualPriceAmt: number;
  addedPriceAmt: number;
  discountPriceAmt: number;
}

const addNewProduct = async (
  parkinglotId: string,
  payload: IAddProductBody
) => {
  const options: AxiosRequestConfig = {
    method: 'post',
    url: `api/customer-service/lots/${parkinglotId}/products`,
    data: payload,
  };
  const { data } = await axios(options);
  return data;
};

export const useCreateProduct = (
  parkingLotId: string,
  onError: any,
  onSuccess: any
) => {
  return useMutation(
    (payload: IAddProductBody) => addNewProduct(parkingLotId, payload),
    {
      onError,
      onSuccess,
      retry: false,
    }
  );
};

const editCustomProduct = async (
  parkinglotId: string,
  applicableProductId: string,
  payload: IAddProductBody
) => {
  const options: AxiosRequestConfig = {
    method: 'PUT',
    url: `api/customer-service/lots/${parkinglotId}/products/${applicableProductId}?countryCode=us`,
    data: payload,
  };
  const { data } = await axios(options);
  return data;
};

export const useEditCustomProduct = (
  lotId: string,
  applicableProductId: string,
  onSuccess: any,
  onError: any
) => {
  return useMutation(
    (payload: IAddProductBody) =>
      editCustomProduct(lotId, applicableProductId, payload),
    {
      onError,
      onSuccess,
      retry: false,
    }
  );
};

const getLotProductDetails = async (lotId: string, productId: string) => {
  if (
    lotId != '' &&
    typeof lotId != 'undefined' &&
    productId != '' &&
    typeof productId != 'undefined'
  ) {
    const options: AxiosRequestConfig = {
      method: 'get',
      url: `/api/customer-service/lots/${lotId}/products/${productId}?countryCode=us`,
    };
    const { data } = await axios(options);
    return data;
  }
};

export const useGetLotProductDetails = (
  lotId: string,
  productId: string,
  onSuccess: any,
  onError: any
) => {
  return useQuery(
    ['getLotProductDetails', lotId, productId, onSuccess, onError],
    () => getLotProductDetails(lotId, productId),
    {
      onSuccess,
      onError,
      retry: false,
    }
  );
};

const getOPISRetail = async (
  fetchOPISRetail: boolean,
  lotId: string,
  masterProductName: string
) => {
  if (lotId && fetchOPISRetail) {
    const opisPriceURL = `/api/thirdparty-service/opis/retail-fuel-price?parkingLotId=${lotId}&countryCode=us&masterProductName=${masterProductName}`;
    const payload: AxiosRequestConfig = {
      method: 'get',
      url: opisPriceURL,
    };
    const { data } = await axios(payload);
    return data;
  }
};

export const useGetOPISRetail = (
  fetchOPISRetail: boolean,
  lotId: string,
  masterProductName: string,
  onSuccess: any,
  onError: any
) => {
  return useQuery(
    [
      'getOPISRetail',
      fetchOPISRetail,
      lotId,
      masterProductName,
      onSuccess,
      onError,
    ],
    () => getOPISRetail(fetchOPISRetail, lotId, masterProductName),
    {
      onSuccess,
      onError,
      retry: false,
    }
  );
};

const getTaxRates = async (
  fetchTaxList: boolean,
  productCd: string,
  cityNm: string
) => {
  if (productCd && cityNm && fetchTaxList) {
    const options: AxiosRequestConfig = {
      method: 'get',
      url: `/api/tax-service/fuel-taxes/types?countryCode=us&city=${cityNm}&productCd=${productCd}`,
    };
    const { data } = await axios(options);
    return data;
  }
};

export const useGetTaxRates = (
  fetchTaxList: boolean,
  productCd: string,
  cityNm: string,
  onSuccess: any,
  onError: any
) => {
  return useQuery(
    ['getTaxRates', fetchTaxList, productCd, cityNm, onSuccess, onError],
    () => getTaxRates(fetchTaxList, productCd, cityNm),
    {
      onSuccess,
      onError,
      retry: false,
    }
  );
};

const getServedCities = async () => {
  const options: AxiosRequestConfig = {
    method: 'get',
    url: '/api/product-service/opis/served-cities?countryCode=us&skipPagination=true'
  };

  const { data } = await axios(options);
  return data;
};

export const useGetServedCities = () => {
  return useQuery('getServedCities', () => getServedCities());
};

const getSupplierBrandProducts = async (cityId: string) => {
  if (!cityId) {
    return null;
  }
  const options: AxiosRequestConfig = {
    method: 'get',
    url: `/api/product-service/opis/supplier-brand-products?countryCode=us&cityId=${cityId}`
  };

  const { data }: {
    data?: {
      data?: {
        actualProduct?: string[]
        brand?: string[]
        supplier?: string[]
      }
    }
  } = await axios(options);
  return data;
};

export const useGetSupplierBrandProducts = (cityId: string) => {
  return useQuery(['getSupplierBrandProducts', cityId], () => getSupplierBrandProducts(cityId));
};

interface QueryOptions {
  cityId?: string
  supplier?: string[]
  brandIndicator?: string[]
  actualProduct?: string[]
}

export interface SupplierPrice {
  productKey: string
  opisServedCityId: string | null
  countryCd: string
  cityId: number
  productCategoryId: string | null
  generatedProductName: string
  productIndicator: string
  productType: string
  supplier: string
  state: string
  city: string
  brandIndicator: string
  grossPrice: number
  octaneValue: number
  actualProduct: string
  rvp: string
  priceDate: string
  addedDate: string
  lastUpdatedDate: string
  terms: string
  opisProductName: string
  dieselBlend: string
  bioType: string
}

const getSupplierPrices = async (query: QueryOptions) => {
  if (!query || !query.cityId || !query.supplier?.length || !query.brandIndicator?.length || !query.actualProduct?.length) {
    return {
      data: {
        supplierPrices: [],
        error: null
      }
    };
  }
  const queryParam = new URLSearchParams();
  queryParam.append('cityId', query.cityId);
  queryParam.append('supplier', JSON.stringify(query.supplier));
  queryParam.append('brandIndicator', JSON.stringify(query.brandIndicator));
  queryParam.append('actualProduct', JSON.stringify(query.actualProduct));
  const options: AxiosRequestConfig = {
    method: 'get',
    url: `/api/product-service/opis/rack-prices?${queryParam.toString()}`
  };
  const { data }: {
    data?: {
      data?: {
        supplierPrices: SupplierPrice[]
        error: null
      }
    }
  } = await axios(options);
  return data;
};

export const useGetSupplierPrices = (qery: QueryOptions) => {
  return useQuery(['getSupplierPrices', qery], () => getSupplierPrices(qery));
};
