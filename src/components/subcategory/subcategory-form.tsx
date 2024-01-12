import Input from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import TextArea from '@/components/ui/text-area';
import Description from '@/components/ui/description';
import Card from '@/components/common/card';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import FileInput from '@/components/ui/file-input';
import { yupResolver } from '@hookform/resolvers/yup';
import { subcategoryValidationSchema } from './subcatgroy-validation-schema';
import { AttachmentInput, ItemProps, Subcategory } from '@/types/index';
import { Config } from '@/config';
import { useSettingsQuery } from '@/data/settings';
import { getErrorMessage } from '@/utils/form-error';
import { useModalAction } from '../ui/modal/modal.context';
import { useCallback, useMemo, useState } from 'react';
import {
  useCreateSubcategoryMutation,
  useUpdateSubcategoryMutation,
} from '@/data/subcategory';
import { useCategoriesQuery } from '@/data/category';
import ReactSelect, { StylesConfig } from 'react-select';

export const chatbotAutoSuggestion = ({ name }: { name: string }) => {
  return [
    {
      id: 1,
      title: `Introduce our new category: ${name} products that cater to [target audience].`,
    },
    {
      id: 2,
      title: `Explore our latest category: ${name} products designed to [address specific customer needs].`,
    },
    {
      id: 3,
      title: `Discover our fresh category: ${name} products that combine style, functionality, and affordability.`,
    },
    {
      id: 4,
      title: `Check out our newest addition: ${name} products that redefine [industry/segment] standards.`,
    },
    {
      id: 5,
      title: `Elevate your experience with our curated ${name} products.`,
    },
    {
      id: 6,
      title: `Enhance your lifestyle with our diverse range of ${name} products.`,
    },
    {
      id: 7,
      title: `Experience the innovation of our cutting-edge ${name} products.`,
    },
    {
      id: 8,
      title: `Simplify [specific task/activity] with our innovative ${name} products.`,
    },
    {
      id: 9,
      title: `Transform the way you [specific activity/task] with our game-changing ${name} products.`,
    },
    {
      id: 10,
      title: `Unleash the potential of your [target audience] with our exceptional ${name} products.`,
    },
  ];
};

type FormValues = {
  category_id: any;
  subcategory_name: string;
  description: string;
  image: AttachmentInput;
};

const defaultValues = {
  image: '',
  description: '',
  subcategory_name: '',
};

type IProps = {
  initialValues?: Subcategory;
};
export default function CreateOrUpdateSubcategoryForm({
  initialValues,
}: IProps) {
  const router = useRouter();
  const { locale } = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    // @ts-ignore
    defaultValues: initialValues
      ? {
          ...initialValues,
        }
      : defaultValues,
    resolver: yupResolver(subcategoryValidationSchema),
  });

  const [selectedOption, setselectedOption] = useState('');
  const [isSelectTouched, setIsSelectTouched] = useState(false);

  const generateName = watch('subcategory_name');
  const autoSuggestionList = useMemo(() => {
    return chatbotAutoSuggestion({ name: generateName ?? '' });
  }, [generateName]);

  const { openModal } = useModalAction();

  const handleGenerateDescription = useCallback(() => {
    openModal('GENERATE_DESCRIPTION', {
      control,
      name: generateName,
      set_value: setValue,
      key: 'details',
      suggestion: autoSuggestionList as ItemProps[],
    });
  }, [generateName]);

  const { mutate: createBanner, isLoading: creating } =
    useCreateSubcategoryMutation();
  const { mutate: updateBanner, isLoading: updating } =
    useUpdateSubcategoryMutation();

  const {} = useSettingsQuery({
    language: locale!,
  });

  const isTranslateCoupon = router.locale !== Config.defaultLanguage;

  const handleselect = (selectedOption: any) => {
    setIsSelectTouched(true);
    const categoryId = selectedOption?.id;
    setselectedOption(categoryId);
  };

  const onSubmit = async (values: FormValues) => {
    const input = {
      language: router.locale,
      subcategory_name: values.subcategory_name,
      description: values.description,
      category_id: values.category_id?.id,
      image: {
        thumbnail: values?.image?.thumbnail,
        original: values?.image?.original,
        id: values?.image?.id,
      },
    };

    try {
      if (
        !initialValues ||
        !initialValues.translated_languages.includes(router.locale!)
      ) {
        createBanner({
          ...input,
        });
      } else {
        updateBanner({
          ...input,
          ...(initialValues.subcategory_name !== values.subcategory_name && {
            title: values.subcategory_name,
          }),
          id: initialValues.id!,
        });
      }
    } catch (error) {
      const serverErrors = getErrorMessage(error);
      Object.keys(serverErrors?.validation).forEach((field: any) => {
        setError(field.split('.')[1], {
          type: 'manual',
          message: serverErrors?.validation[field][0],
        });
      });
    }
  };

  const { categories, loading } = useCategoriesQuery({
    limit: 999,
    language: locale,
  });

  const customStyles: StylesConfig<any, false> = {
    control: (provided, state) => ({
      ...provided,
      padding: '5px',
    }),
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
        <Description
          title={t('form:input-label-image')}
          details={t('form:subcategory-image-helper-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <FileInput name="image" control={control} multiple={false} />
        </Card>
      </div>

      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:input-label-description')}
          details={`${
            initialValues
              ? t('form:item-description-edit')
              : t('form:item-description-add')
          } ${t('form:subcategory-form-info-help-text')}`}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-subcategory-title')}
            {...register('subcategory_name')}
            error={t(errors.subcategory_name?.message!)}
            variant="outline"
            className="mb-5"
          />

          <div className="relative">
            <TextArea
              label={t('form:input-label-description')}
              {...register('description')}
              error={t(errors.description?.message!)}
              variant="outline"
              className="mb-5"
            />
          </div>

          <div className="relative">
            <p style={{ fontSize: '14px', marginBottom: 14 }}>Categories</p>
            <Controller
              name="category_id"
              control={control}
              defaultValue={null}
              render={({ field, fieldState }) => (
                <>
                  <ReactSelect
                    {...field}
                    styles={customStyles}
                    options={categories}
                    getOptionLabel={(option: any) => option.name}
                    getOptionValue={(option: any) => option.id}
                    onChange={(category_id: any) => {
                      field.onChange(category_id);
                    }}
                  />
                  {fieldState.error && (
                    <p style={{ color: 'red', fontSize: '14px' }}>
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
        </Card>
      </div>
      <div className="mb-4 text-end">
        {initialValues && (
          <Button
            variant="outline"
            onClick={router.back}
            className="me-4"
            type="button"
          >
            {t('form:button-label-back')}
          </Button>
        )}

        <Button loading={updating || creating}>
          {initialValues
            ? t('form:button-label-update-subcategory')
            : t('form:button-label-add-subcategory')}
        </Button>
      </div>
    </form>
  );
}
