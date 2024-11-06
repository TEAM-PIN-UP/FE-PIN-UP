import { styled } from "styled-components";

interface StGapProps {
  height: string;
}

const StGap: React.FC<StGapProps> = ({ height }) => {
  return <_StGap $height={height} />;
};

const _StGap = styled.div<{ $height: string }>`
  height: ${(props) => props.$height};
`;

export default StGap;
