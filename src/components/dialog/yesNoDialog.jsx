import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const YesNoDialog = ({
  isOpen,
  onOpenChange,
  title = "Confirmation",
  bodyText = "Are you sure?",
  onYes,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p>{bodyText}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                className="hover:bg-red-100 hover:text-red-500 transition-all"
                onPress={() => {
                  onClose();
                }}
              >
                Hủy
              </Button>

              <Button
                color="primary"
                className="hover:bg-blue-600 hover:text-white transition-all"
                onPress={() => {
                  onYes?.();
                  onClose();
                }}
              >
                Xác nhận
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default YesNoDialog;
