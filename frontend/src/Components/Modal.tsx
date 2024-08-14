import React from "react";
import Modal from "react-modal";

// Define the props interface
interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: React.ReactNode;
}

// CustomModal component
const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onRequestClose,
  children,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={{
      overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.75)",
      },
      content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        borderRadius: "8px",
      },
    }}
  >
    {children}
  </Modal>
);

export default CustomModal;
