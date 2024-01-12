import Router, { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { mapPaginatorData } from '@/utils/data-mappers';
import { Banner, BannerPaginator, BannerQueryOptions } from '@/types';
import { Routes } from '@/config/routes';
import { API_ENDPOINTS } from './client/api-endpoints';
import { Config } from '@/config';
import { bannerClient } from './client/banner';

export const useCreateBannerMutation = () => {
  
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(bannerClient.create, {
    onSuccess: () => {
      Router.push(Routes.banner.list, undefined,{
        locale: Config.defaultLanguage,
      });
      toast.success(t('common:successfully-created'));
    },
    onError: (error: any) => {
      const {data, status} =  error?.response;
      if (status === 422) {
        const errorMessage:any = Object.values(data).flat();
        toast.error(errorMessage[0]);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.BAN);
    },
  });
};

export const useDeleteBannerMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(bannerClient.delete, {
    onSuccess: () => {
      toast.success(t('common:successfully-deleted'));
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.BAN);
    },
  });
};

export const useUpdateBannerMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { locale } = useRouter();

  return useMutation(bannerClient.update, {
    onSuccess: async (data) => {
      toast.success(t('common:successfully-updated'));
      await Router.replace(
        `${Routes.banner.list}/${data?.id}/edit`,
        undefined,
        {
          locale,
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.BAN);
    },
  });

};

export const useBannerQuery = () => {
  const { data, error, isLoading } = useQuery<Banner, Error>(
    [API_ENDPOINTS.BAN],
    () => bannerClient.get()
  );
  return {
    banner: data,
    error,
    loading: isLoading,
  };
};

export const useBannersQuery = (params: Partial<BannerQueryOptions>,options: any={}) => {
  const { data, error, isLoading } = useQuery<BannerPaginator, Error>(
    [API_ENDPOINTS.BAN, options,params],
    ({ queryKey, pageParam }) =>
    bannerClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {keepPreviousData: true,}
  );
  return {
    banner: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
};