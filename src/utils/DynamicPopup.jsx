import React from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
const DynamicPopup = ({ open, onCloseModal, data }) => {
  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <main>{data}</main>
      </Modal>
    </div>
  );
};

export default DynamicPopup;
