import Layout from '@/components/layouts/admin';
import ErrorMessage from '@/components/ui/error-message';
import {Loader} from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useSubcategoryQuery } from '@/data/subcategory';
import CreateOrUpdateSubcategoryForm from '@/components/subcategory/subcategory-form';

export default function UpdateSubcategorysPage() {
  const { query, locale } = useRouter();
  const { t } = useTranslation();
  const { subcategory, loading, error } = useSubcategoryQuery();

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-edit-subcategory')}
        </h1>
      </div>
      <CreateOrUpdateSubcategoryForm initialValues={subcategory} />
    </>
  );
}
UpdateSubcategorysPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
}); 