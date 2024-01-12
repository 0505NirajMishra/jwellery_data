import { useDeleteTypeMutation } from '@/data/type';
import { useModalAction, useModalState } from '../ui/modal/modal.context';
import ConfirmationCard from '../common/confirmation-card';

const TypeDeleteView = () => {
  const { mutate: deleteType, isLoading: loading } = useDeleteTypeMutation();

  const { data } = useModalState();
  const { closeModal } = useModalAction();
  async function handleDelete() {
    deleteType(data);
    closeModal();
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default TypeDeleteView;
