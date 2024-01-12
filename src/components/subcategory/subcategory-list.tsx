import Pagination from '@/components/ui/pagination';
import { Table } from '@/components/ui/table';
import { Banner, Category, SortOrder, Subcategory } from '@/types';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useIsRTL } from '@/utils/locals';
import { useState } from 'react';
import TitleWithSort from '@/components/ui/title-with-sort';
import { MappedPaginatorInfo, Attachment } from '@/types';
import LanguageSwitcher from '@/components/ui/lang-action/action';
import { Routes } from '@/config/routes';

export type IProps = {
  subcategory: Subcategory[] | undefined;
  paginatorInfo: MappedPaginatorInfo | null;
  onPagination: (key: number) => void;
  onSort: (current: any) => void;
  onOrder: (current: string) => void;
};
const SubcatgeoryList = ({
  subcategory,
  paginatorInfo,
  onPagination,
  onSort,
  onOrder,
}: IProps) => {
  
  const { t } = useTranslation();
  const rowExpandable = (record: any) => record.children?.length;
  const { alignLeft, alignRight } = useIsRTL();

  const [sortingObj, setSortingObj] = useState<{
    sort: SortOrder;
    column: string | null;
  }>({
    sort: SortOrder.Desc,
    column: null,
  });

  const onHeaderClick = (column: string | null) => ({
    onClick: () => {
      onSort((currentSortDirection: SortOrder) =>
        currentSortDirection === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc
      );
      onOrder(column!);
      setSortingObj({
        sort:
          sortingObj.sort === SortOrder.Desc ? SortOrder.Asc : SortOrder.Desc,
        column: column,
      });
    },
  });

  const columns = [
    {
      title: t('table:table-item-id'),
      dataIndex: 'id',
      key: 'id',
      align: alignLeft,
      width: 60,
    },
    {
      title: (
        <TitleWithSort
          title={t('table:table-item-title')}
          ascending={
            sortingObj.sort === SortOrder.Asc && sortingObj.column === 'title'
          }
          isActive={sortingObj.column === 'title'}
        />
      ),
      className: 'cursor-pointer',
      dataIndex: 'subcategory_name',
      key: 'subcategory_name',
      align: alignLeft,
      width: 90,
      onHeaderCell: () => onHeaderClick('title'),
    },
    {
      title: t('table:table-item-description'),
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      align: alignLeft,
      width: 200,
    },
    {
      title: t('table:table-item-category-name'),
      dataIndex: 'category_id',
      key: 'category name',
      ellipsis: true,
      align: 'center',
      render: (category_id: Category) => (
        <span className="truncate whitespace-nowrap">{category_id?.name}</span>
      ),
    },
    {
      title: t('table:table-item-image'),
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      width: 100,
      render: (image: Attachment[]) => {
        if (!image?.length) return null;

        return (
          <div className="flex flex-row items-center justify-center gap-x-2">
            {image?.map((image: Attachment, index: number) => (
              <Image
                src={image?.original ?? '/'}
                alt={`brand-image-${image.id}`}
                layout="fixed"
                width={40}
                height={40}
                className="overflow-hidden rounded-lg bg-gray-300 object-contain"
                key={`brand-image-${index}`}
              />
            ))}
          </div>
        );
      },
    },
    {
      title: t('table:table-item-actions'),
      dataIndex: 'id',
      key: 'actions',
      align: 'right',
      render: (id: string, record: Subcategory) => (
        <LanguageSwitcher
          id={id}
          record={record}
          deleteModalView="DELETE_SUBCATEGORY"
          routes={Routes?.subcategory}
        />
      ),
    },
  ];

  return (
    <>
      <div className="mb-6 overflow-hidden rounded shadow">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t('table:empty-table-data')}
          data={subcategory}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => '',
            rowExpandable: rowExpandable,
          }}
        />
      </div>

      {!!paginatorInfo?.total && (
        <div className="flex items-center justify-end">
          {/* <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          /> */}
        </div>
      )}
    </>
  );
};

export default SubcatgeoryList;