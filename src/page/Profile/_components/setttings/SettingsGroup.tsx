import { H5 } from "@/style/font";
import React from "react";
import styled from "styled-components";

interface SettingsItemProps {
  title: string;
}

const SettingsGroup: React.FC<SettingsItemProps> = ({ title }) => {
  return <StDiv>{title}</StDiv>;
};

const StDiv = styled.div`
  ${H5}
  display: flex;
  color: var(--neutral_400);
  justify-content: start;
  padding-top: 28px;
`;
export default SettingsGroup;
