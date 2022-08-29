import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const CustomModal = ({ isOpen, onClose, title, children, size = "sm" }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      isCentered
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bgColor="brand.600" color="white" h={"4"}>
          {title}
        </ModalHeader>
        <ModalCloseButton color="white" variant="filled" />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
