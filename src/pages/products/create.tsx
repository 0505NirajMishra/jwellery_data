import ShopLayout from '@/components/layouts/shop';
import CreateOrUpdateProductForm from '@/components/product/product-form_old';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  adminOnly,
  adminOwnerAndStaffOnly,
  getAuthCredentials,
  hasAccess,
} from '@/utils/auth-utils';
import { Routes } from '@/config/routes';
import { useShopQuery } from '@/data/shop';
import { useMeQuery } from '@/data/user';
import { useRouter } from 'next/router';
import Layout from '@/components/layouts/admin';
import { GetStaticProps } from 'next';

export default function CreateProductPage() {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex py-5 border-b border-dashed border-border-base sm:py-8">
        <h1 className="text-lg font-semibold text-heading">
          {t('form:form-title-create-product')}
        </h1>
      </div>
      <CreateOrUpdateProductForm />
    </>
  );
}
CreateProductPage.authenticate = {
  permissions: adminOnly,
};
CreateProductPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'form'])),
    },
});