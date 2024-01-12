import SelectInput from '@/components/ui/select-input';
import Label from '@/components/ui/label';
import { Control, useFormState, useWatch } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useShopsNameQuery } from '@/data/shop';

interface Props {
  control: Control<any>;
  setValue: any;
}

const ProductShopInput = ({ control, setValue }: Props) => {

  const { t } = useTranslation('common');
  const type = useWatch({
    control,
    name: 'type',
  });

  const { dirtyFields } = useFormState({
    control,
  });

  useEffect(() => {
    if (type?.slug && dirtyFields?.type) {
      setValue('shop_id', []);
    }
  }, [type?.slug]);

  const { shop_id, loading } = useShopsNameQuery({
    limit: 999,
    type: type?.slug,
  });


  return (
    <div className="mb-5">
      <Label>{t('form:input-label-shops')}</Label>
      <SelectInput
        name="shop_id"
        isMulti
        control={control}
        getOptionLabel={(option: any) => option.name}
        getOptionValue={(option: any) => option.id}
        // @ts-ignore
        options={shop_id}
        isLoading={loading}
      />
    </div>
  );
};

export default ProductShopInput;