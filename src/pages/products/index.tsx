import Card from '@/components/common/card';
import Search from '@/components/common/search';
import { ArrowDown } from '@/components/icons/arrow-down';
import { ArrowUp } from '@/components/icons/arrow-up';
import { MoreIcon } from '@/components/icons/more-icon';
import Layout from '@/components/layouts/admin';
import CategoryTypeFilter from '@/components/product/category-type-filter';
import ProductList from '@/components/product/product-list';
import Button from '@/components/ui/button';
import ErrorMessage from '@/components/ui/error-message';
import LinkButton from '@/components/ui/link-button';
import {Loader} from '@/components/ui/loader/loader';
import { Config } from '@/config';
import { Routes } from '@/config/routes';
import { useProductsQuery } from '@/data/product';
import { Category, SortOrder, Type } from '@/types';
import { adminOnly } from '@/utils/auth-utils';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const { locale } = useRouter();
  const [orderBy, setOrder] = useState('created_at');
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [visible, setVisible] = useState(true);

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  const { products, loading, paginatorInfo, error } = useProductsQuery({
    language: locale,
    limit: 20,
    page,
    type,
    categories: category,
    name: searchTerm,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text={t('common:text-loading')} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }

  function handlePagination(current: any) {
    setPage(current);
  }

  return (
    <>
      <Card className="mb-8 flex flex-col">
      <div className="flex w-full flex-col items-center md:flex-row">
          <div className="mb-4 md:mb-0 md:w-1/4">
            <h1 className="text-lg font-semibold text-heading">
              {t('form:input-label-products')}
            </h1>
          </div>

          <div className="flex w-full flex-col items-center md:w-3/4 md:flex-row">
            <div className="flex w-full items-center">
              <Search
                onSearch={handleSearch}
                placeholderText={t('form:input-placeholder-search-name')}
              />

              {locale === Config.defaultLanguage && (
                <LinkButton
                  href={`${Routes.product.create}`}
                  className="h-12 ms-4 md:ms-6"
                >
                  <span className="hidden md:block">
                    + {t('form:button-label-add-product')}
                  </span>
                  <span className="md:hidden">
                    + {t('form:button-label-add')}
                  </span>
                </LinkButton>
              )}
            </div>

            <Button
              // onClick={handleImportModal}
              className="mt-5 w-full md:hidden"
            >
              {t('common:text-export-import')}
            </Button>

            <button
              className="mt-5 flex items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5"
              onClick={toggleVisible}
            >
              {t('common:text-filter')}{' '}
              {visible ? (
                <ArrowUp className="ms-2" />
              ) : (
                <ArrowDown className="ms-2" />
              )}
            </button>
          </div>
        </div>

        <div
          className={cn('flex w-full transition', {
            'visible h-auto': visible,
            'invisible h-0': !visible,
          })}
        >
          <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8">
            <CategoryTypeFilter
              className="w-full"
              type={type}
              onCategoryFilter={(category: Category) => {
                setCategory(category?.slug!);
                setPage(1);
              }}
              onTypeFilter={(type: Type) => {
                setType(type?.slug!);
                setPage(1);
              }}
            />
          </div>
        </div>
      </Card>
      
      {/* {
         products?.map((item:any) =>(
            <>
             {console.log("my product data is => " + JSON.stringify(item.shop?.name))}
            </>
         ))
      } */}

      <ProductList
        products={products}
        paginatorInfo={paginatorInfo}
        onPagination={handlePagination}
        onOrder={setOrder}
        onSort={setColumn}
      />

    </>
  );
}
ProductsPage.authenticate = {
  permissions: adminOnly,
};
ProductsPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['table', 'common', 'form'])),
  },
});





{/* <Card className="mb-8 flex flex-col">
        <div className="flex w-full flex-col items-center md:flex-row">

          <div className="mb-4 md:mb-0 md:w-1/4">
            <h1 className="text-lg font-semibold text-heading">
              {t('form:input-label-products')}
            </h1>
          </div>

          <div className="flex w-full flex-col items-center ms-auto md:w-3/4">

            <div className="flex w-full items-center">
              <Search
                onSearch={handleSearch}
                placeholderText={t('form:input-placeholder-search-name')}
              />

              {locale === Config.defaultLanguage && (
                <LinkButton
                  href={`/${shop}/products/create`}
                  className="h-12 ms-4 md:ms-6"
                >
                  <span className="hidden md:block">
                    + {t('form:button-label-add-product')}
                  </span>
                  <span className="md:hidden">
                    + {t('form:button-label-add')}
                  </span>
                </LinkButton>
              )}

            </div>

            <Button
              onClick={handleImportModal}
              className="mt-5 w-full md:hidden"
            >
              {t('common:text-export-import')}
            </Button> 
            <button
              className="mt-5 flex items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5"
              onClick={toggleVisible}
            >
              {t('common:text-filter')}{' '}
              {visible ? (
                <ArrowUp className="ms-2" />
              ) : (
                <ArrowDown className="ms-2" />
              )}
            </button>

            <button
              onClick={handleImportModal}
              className="hidden h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-50 transition duration-300 ms-5 hover:bg-gray-100 md:flex"
            >
              <MoreIcon className="w-3.5 text-body" />
            </button>

          </div>

          <button
            className="mt-5 flex items-center whitespace-nowrap text-base font-semibold text-accent md:mt-0 md:ms-5"
            onClick={toggleVisible}
          >
            {t('common:text-filter')}{' '}
            {visible ? (
              <ArrowUp className="ms-2" />
            ) : (
              <ArrowDown className="ms-2" />
            )}
          </button>

        </div>

        <div
          className={cn('flex w-full transition', {
            'visible h-auto': visible,
            'invisible h-0': !visible,
          })}
        >
          <div className="mt-5 flex w-full flex-col border-t border-gray-200 pt-5 md:mt-8 md:flex-row md:items-center md:pt-8">
            <CategoryTypeFilter
              className="w-full"
              type={type}
              onCategoryFilter={(category: Category) => {
                setCategory(category?.slug!);
                setPage(1);
              }}
              onTypeFilter={(type: Type) => {
                setType(type?.slug!);
                setPage(1);
              }}
            />
          </div>
        </div>
      </Card> */}