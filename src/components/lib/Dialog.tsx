/** @jsxImportSource @emotion/react */

import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { ReactNode } from "react";

type DialogProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void
};

function Dialog(props: DialogProps) {
  return (
    <Modal
      wrapClassName="modal-wrapper"
      css={{ backgroundColor: "#000" }}
      title="Edit User"
      open={props.isOpen}
      destroyOnClose={true}
      centered
      onCancel={() => props.setIsOpen(false)}
      maskClosable={false}
      keyboard={false}
      closeIcon={<CloseOutlined css={{ color: "#fff" }} />}
      styles={{
        header: { padding: "20px 24px", margin: "0" },
        body: { padding: "20px 24px" },
        footer: { padding: "20px 24px", margin: "0" },
      }}
      footer={null}
    >
      {props.children}
    </Modal>
  );
}

export { Dialog };
