import React, { useRef, useImperativeHandle } from "react";
import { Button, Modal } from "react-bootstrap";
import "./styles.css";

const ModalComp = (props, ref) => {
  const buttonRef = useRef();
  const modalRef = useRef();

  useImperativeHandle(ref, () => ({
    get Button() {
      return buttonRef.current;
    },
    get Modal() {
      return modalRef.current;
    },
  }));
  const { onHide, show, buttonOnSave, heading, footerbutton, ...rest } = props;
  return (
    <Modal
      ref={modalRef}
      onHide={onHide}
      show={show}
      size="lg"
      centered
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {props.footerbutton && (
          <Button ref={buttonRef} onClick={buttonOnSave}>
            {props.footerbutton}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
const ModalForm = React.forwardRef(ModalComp);
export default ModalForm;
