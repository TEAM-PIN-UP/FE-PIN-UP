import { useModalStore } from "@/store";
import { B3, H2 } from "@/style/font";
import React from "react";
import styled, { keyframes } from "styled-components";
import Button from "./Button";

const Modal: React.FC = () => {
  const {
    modalOn,
    title,
    body,
    type,
    okButtonText,
    cancelButtonText,
    onOkButtonClick,
    onCancelButtonClick,
  } = useModalStore();

  return (
    <StDiv $modalOn={modalOn}>
      <div className="modal-box">
        <span className="title">{title}</span>
        <div className="body-container">
          {body.map((line, index) => (
            <span key={index} className="body-line">
              {line}
            </span>
          ))}
        </div>
        <div className="button-container">
          {type === "ok" && (
            <Button size="full" onClick={onOkButtonClick}>
              {okButtonText}
            </Button>
          )}
          {type === "cancel-ok" && (
            <>
              <Button
                size="large"
                onClick={onCancelButtonClick!}
                style={{
                  backgroundColor: "var(--white)",
                  color: "var(--neutral_400)",
                }}
              >
                {cancelButtonText}
              </Button>
              <Button size="large" onClick={onOkButtonClick}>
                {okButtonText}
              </Button>
            </>
          )}
        </div>
      </div>
    </StDiv>
  );
};

const bounce = keyframes`
  0% {
    transform: scale(0.92);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
`;

const StDiv = styled.div<{ $modalOn: boolean }>`
  width: 100%;
  max-width: var(--max_width);
  height: 100%;
  left: 0px;
  top: 0px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--transparent_50);
  z-index: 100;
  opacity: ${(props) => (props.$modalOn ? 1 : 0)};
  pointer-events: ${(props) => (props.$modalOn ? "auto" : "none")};
  transition: opacity 0.4s;

  .modal-box {
    min-width: 50%;
    max-width: 75%;
    display: ${(props) => (props.$modalOn ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: var(--spacing_24) var(--spacing_20);
    border-radius: var(--radius_16);
    background-color: var(--white);

    animation: ${bounce} 0.15s;

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
      width: 100%;
      display: flex;
      flex-direction: row;
      gap: var(--spacing_12);
      margin-top: var(--spacing_24);
    }
  }
`;

export default Modal;
