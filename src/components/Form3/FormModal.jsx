import Modal from 'antd/lib/modal/Modal';
import React from 'react';

function FormModal(props) {
  const { isModalVisible, handleOk, handleCancel, data } = props;
  return (
    <Modal visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      {data()}
    </Modal>
  );
}

export default FormModal;
