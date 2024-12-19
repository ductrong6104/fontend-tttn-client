import Modal from "react-modal";
import { customStyles } from "./customStyles";
import { Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
const SubFrmYesNoDialog = ({ isOpen, onClose, title, bodyText, onYes }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} style={customStyles}>
      <div className="mb-2 cursor-pointer flex justify-between">
        <Typography variant="h6" align="left">
          {title}
        </Typography>
        <CloseIcon onClick={onClose} className="hover:bg-red-500" />
      </div>
      <div className="text-center">
        <Typography variant="body1" align="left">
          {bodyText}
        </Typography>
        <div className="flex justify-end mt-4">
          <Button
            color="danger"
            variant="light"
            className="hover:text-blue-600 hover:bg-white transition-all"
            onClick={onYes}
          >
            Xác nhận
          </Button>
          <Button
            color="danger"
            variant="light"
            className="hover:bg-red-100 hover:text-red-500 transition-all"
            onClick={onClose}
          >
            Hủy
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SubFrmYesNoDialog;
