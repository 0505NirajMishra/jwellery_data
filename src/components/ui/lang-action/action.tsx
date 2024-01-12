import ActionButtons from '@/components/common/action-buttons';
import { Config } from '@/config';
import LanguageAction from './language-switcher';
import { useRouter } from 'next/router';

export type LanguageSwitcherProps = {
  record: any;
  id: string;
  deleteModalView?: string | any;
  routes: any;
  className?: string | undefined;
};

export default function LanguageSwitcher({
  record,
  id,
  deleteModalView,
  routes,
  className,
}: LanguageSwitcherProps) {
  const { enableMultiLang } = Config;
  return (
    <>
      {enableMultiLang ? (
        <LanguageAction
          id={id}
          record={record}
          deleteModalView={deleteModalView}
          routes={routes}
          className={className}
        />
      ) : (
        <ActionButtons
          id={record?.id}
          editUrl={routes.editWithoutLang(id)}
          deleteModalView={deleteModalView}
        />
      )}
    </>
  );
}
