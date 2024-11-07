import { styled } from "styled-components";

const StGap: React.FC<{ height: string }> = ({ height }) => {
  return <_StGap $height={height} />;
};

const _StGap = styled.div<{ $height: string }>`
  height: ${(props) => props.$height};
`;

export default StGap;
