import {
  CreateSubcategoryInput,
  Subcategory,
  SubcategoryPaginator,
  SubcategoryQueryOptions,
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { crudFactory } from './curd-factory';
import { HttpClient } from './http-client';

export const subcategoryClient = {
  ...crudFactory<Subcategory, any, CreateSubcategoryInput>(API_ENDPOINTS.SUBCATEGORY),
  get() {
    return HttpClient.get<Subcategory>(`${API_ENDPOINTS.SUBCATEGORY}`);
  },
  paginated: ({ subcategory_name, ...params }: Partial<SubcategoryQueryOptions>) => {
    return HttpClient.get<SubcategoryPaginator>(API_ENDPOINTS.SUBCATEGORY, {
      searchJoin: 'and',
      ...params,
      search: HttpClient.formatSearchParams({ subcategory_name }),
    });
  },
};