import Router, { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import { mapPaginatorData } from '@/utils/data-mappers';
import { Subcategory, SubcategoryPaginator, SubcategoryQueryOptions } from '@/types';
import { Routes } from '@/config/routes';
import { API_ENDPOINTS } from './client/api-endpoints';
import { Config } from '@/config';
import { subcategoryClient } from './client/subcategory';

export const useCreateSubcategoryMutation = () => {
  
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(subcategoryClient.create, {
    onSuccess: () => {
      Router.push(Routes.subcategory.list, undefined,{
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
      queryClient.invalidateQueries(API_ENDPOINTS.SUBCATEGORY);
    },
  });
};

export const useDeleteSubcategoryMutation = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  return useMutation(subcategoryClient.delete, {
    onSuccess: () => {
      toast.success(t('common:successfully-deleted'));
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SUBCATEGORY);
    },
  });
};

export const useUpdateSubcategoryMutation = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { locale } = useRouter();
  return useMutation(subcategoryClient.update, {
    onSuccess: async (data) => {
      toast.success(t('common:successfully-updated'));
      await Router.replace(
        `${Routes.subcategory.list}/${data?.id}/edit`,
        undefined,
        {
          locale,
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries(API_ENDPOINTS.SUBCATEGORY);
    },
  });
};

export const useSubcategoryQuery = () => {
  const { data, error, isLoading } = useQuery<Subcategory, Error>(
    [API_ENDPOINTS.SUBCATEGORY],
    () => subcategoryClient.get()
  );

  return {
    subcategory: data,
    error,
    loading: isLoading,
  };
};

export const useSubcategorysQuery = (params: Partial<SubcategoryQueryOptions>,options: any={}) => {
  const { data, error, isLoading } = useQuery<SubcategoryPaginator, Error>(
    [API_ENDPOINTS.SUBCATEGORY, options,params],
    ({ queryKey, pageParam }) =>
    subcategoryClient.paginated(Object.assign({}, queryKey[1], pageParam)),
    {keepPreviousData: true,}
  );

  return {
    subcategory: data?.data ?? [],
    paginatorInfo: mapPaginatorData(data),
    error,
    loading: isLoading,
  };
  
};