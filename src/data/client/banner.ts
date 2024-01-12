import {
  Banner,
  BannerPaginator,
  BannerQueryOptions,
  CreateBannerInput
} from '@/types';
import { API_ENDPOINTS } from './api-endpoints';
import { crudFactory } from './curd-factory';
import { HttpClient } from './http-client';

export const bannerClient = {
  ...crudFactory<Banner, any, CreateBannerInput>(API_ENDPOINTS.BAN),
  get() {
    return HttpClient.get<Banner>(`${API_ENDPOINTS.BAN}`);
  },
  paginated: ({ title, ...params }: Partial<BannerQueryOptions>) => {
    return HttpClient.get<BannerPaginator>(API_ENDPOINTS.BAN, {
      searchJoin: 'and',
      ...params,
      search: HttpClient.formatSearchParams({ title }),
    });
  },
};