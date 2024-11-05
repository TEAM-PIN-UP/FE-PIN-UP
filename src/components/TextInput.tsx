import React from "react";
import styled from "styled-components";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const TextInput: React.FC<TextInputProps> = (props) => {
  return <StInput {...props} />;
};

const StInput = styled.input`
  border: 1px solid var(--neutral_200);
  border-radius: var(--radius_circle);
  box-sizing: border-box;
  height: 52px;
  padding: var(--spacing_16) var(--spacing_20);
`;

export default TextInput;
