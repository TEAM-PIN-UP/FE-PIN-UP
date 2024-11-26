import { B3, H2 } from "@/style/font";
import React from "react";
import styled from "styled-components";
import Button from "./Button";

type modalType = "ok" | "cancel-ok";

interface ModalPropsBase {
  title: string;
  body: string;
  type: modalType;
}

interface OkModalProps extends ModalPropsBase {
  type: "ok";
  okButtonText: string;
  onOkButtonClick: () => void;
}

interface CancelOkModalProps extends ModalPropsBase {
  type: "cancel-ok";
  okButtonText: string;
  cancelButtonText: string;
  onOkButtonClick: () => void;
  onCancelButtonClick: () => void;
}

type ModalProps = OkModalProps | CancelOkModalProps;

const Modal: React.FC<ModalProps> = (props) => {
  const { title, body, type } = props;

  return (
    <StDiv>
      <div className="modal-box">
        <span className="title">{title}</span>
        <div className="body-container">
          {body.split("\n").map((line, index) => (
            <span key={index} className="body-line">
              {line}
              <br />
            </span>
          ))}
        </div>
        <div className="button-container">
          {type === "ok" && (
            <Button size="full" onClick={() => props.onOkButtonClick}>
              {props.okButtonText}
            </Button>
          )}
          {type === "cancel-ok" && (
            <>
              <Button
                size="large"
                onClick={() => props.onCancelButtonClick}
                style={{
                  backgroundColor: "var(--white)",
                  color: "var(--neutral_400)",
                }}
              >
                {props.cancelButtonText}
              </Button>
              <Button size="large" onClick={() => props.onOkButtonClick}>
                {props.okButtonText}
              </Button>
            </>
          )}
        </div>
      </div>
    </StDiv>
  );
};

const StDiv = styled.div`
  width: 100%;
  max-width: 440px;
  height: 100%;
  left: 0px;
  top: 0px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--transparent_50);
  z-index: 100;

  .modal-box {
    max-width: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing_24) var(--spacing_20);
    border-radius: var(--radius_16);
    background-color: var(--white);

    .title {
      ${H2}
    }
    .body-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      margin-top: var(--spacing_12);

      .body-line {
        ${B3}
        color: var(--neutral_500);
        text-align: center;
      }
    }
    .button-container {
      display: flex;
      flex-direction: row;
      gap: var(--spacing_12);
      margin-top: var(--spacing_24);
    }
  }
`;

export default Modal;
