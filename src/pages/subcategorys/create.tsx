import Layout from '@/components/layouts/admin';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CreateOrUpdateBannerForm from '@/components/banner/banner-form';
import CreateOrUpdateSubcategoryForm from '@/components/subcategory/subcategory-form';

export default function CreateSubcategoryPage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-create-subcategory')}
        </h1>
      </div>
      <CreateOrUpdateSubcategoryForm />
    </>
  );
}
CreateSubcategoryPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
});