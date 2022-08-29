import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getLoggedInUser } from "../../storage";
import CustomButton from "../Core/CustomButton";
import ExpenseInputBody from "./ExpenseInputBody";

const InputModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    setLoggedInUser(getLoggedInUser());
  }, []);

  return (
    <>
      <CustomButton type="secondary" label="Add an expense" onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay bg="none" backdropFilter="auto" backdropBlur="6px" />
        <ModalContent>
          <ModalHeader bgColor="brand.600" color="white" h={"4"}>
            Add an expense
          </ModalHeader>
          <ModalCloseButton color="white" variant="filled" />

          <ModalBody>
            <ExpenseInputBody loggedInUser={loggedInUser} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InputModal;
