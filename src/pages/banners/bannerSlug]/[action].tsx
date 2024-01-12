import Layout from '@/components/layouts/admin';
import ErrorMessage from '@/components/ui/error-message';
import Loader from '@/components/ui/loader/loader';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useBannerQuery } from '@/data/banner';
import CreateOrUpdateBannerForm from '@/components/banner/banner-form';

export default function UpdateBannersPage() {
  
  const { query, locale } = useRouter();
  const { t } = useTranslation();

  const { banner, loading, error } = useBannerQuery();

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <div className="flex border-b border-dashed border-border-base py-5 sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-edit-banners')}
        </h1>
      </div>
      <CreateOrUpdateBannerForm initialValues={banner} />
    </>
  );
}
UpdateBannersPage.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['form', 'common'])),
  },
}); 