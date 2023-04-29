import Modal from "react-modal";

interface IProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}
export default function BaseModal({ children, isOpen, onClose }: IProps) {
  return (
    <Modal
      style={{
        overlay: { background: "rgba(0,0,0,0.7)" },
        content: {
          width: "fit-content",
          height: "fit-content",
          margin: "auto",
          background: "transparent",
          border: "none",
        },
      }}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      isOpen={isOpen}
    >
      <div className="w-fit h-fit m-auto">{children}</div>
    </Modal>
  );
}
