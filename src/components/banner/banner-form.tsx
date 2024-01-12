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
import { bannervalidationschema } from './banner-validation-schema';
import { AttachmentInput, Banner, ItemProps, Subcategory, } from '@/types/index';
import { Config } from '@/config';
import { useSettingsQuery } from '@/data/settings';
import { getErrorMessage } from '@/utils/form-error';
import { useModalAction } from '../ui/modal/modal.context';
import { useCallback, useMemo, useState } from 'react';
import { useCreateSubcategoryMutation, useUpdateSubcategoryMutation } from '@/data/subcategory';
import { useCategoriesQuery } from '@/data/category';
// import ReactSelect, { StylesConfig, OptionTypeBase } from 'react-select';
import { useCreateBannerMutation, useUpdateBannerMutation } from '@/data/banner';


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
    title: string;
    description: string;
    image: AttachmentInput;
    language:string;
};

const defaultValues = {
    title: '',
    description: '',
    image: '',
    language:''
};

type IProps = {
    initialValues?: Banner;
};

export default function CreateOrUpdateBannerForm({ initialValues }: IProps) {

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
        // resolver: yupResolver(subcategoryValidationSchema),
    });


    const generateName = watch('title');
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

    const { mutate: createBanner, isLoading: creating } = useCreateBannerMutation();
    const { mutate: updateBanner, isLoading: updating } = useUpdateBannerMutation();

    const { } = useSettingsQuery({
        language: locale!,
    });

    const isTranslateCoupon = router.locale !== Config.defaultLanguage;

    const onSubmit = async (values: FormValues) => {

        const input = {
            language:router.locale,
            title: values.title,
            description: values.description,
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
                    ...input
                });
            } else {
                updateBanner({
                    ...input,
                    ...(initialValues.title !== values.title && { title: values.title }),
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


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-5 flex flex-wrap border-b border-dashed border-border-base pb-8 sm:my-8">
                <Description
                    title={t('form:input-label-image')}
                    details={t('form:banner-image-helper-text')}
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <FileInput name="image" control={control} multiple={false} />
                </Card>
            </div>

            <div className="my-5 flex flex-wrap sm:my-8">
                <Description
                    title={t('form:input-label-description')}
                    details={`${initialValues
                        ? t('form:item-description-edit')
                        : t('form:item-description-add')
                        } ${t('form:banner-form-info-help-text')}`}
                    className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5 "
                />

                <Card className="w-full sm:w-8/12 md:w-2/3">
                    <Input
                        label={t('form:input-label-banner-title')}
                        {...register('title')}
                        error={t(errors.title?.message!)}
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
                        ? t('form:button-label-update-banner')
                        : t('form:button-label-add-banner')}
                </Button>
            </div>
        </form>
    );
}