import BaseModal from "../BaseModal";
import CreateChatRoomForm from "@/src/application/lobby/components/CreateChatRoomForm";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}
export default function ModalCreateChatRoom({ isOpen, onClose }: IProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="bg-darkSurface w-600px h-400px flex items-center justify-center">
        <CreateChatRoomForm />
      </div>
    </BaseModal>
  );
}
