import styled from "styled-components";

const StGlue: React.FC<{ weight?: number }> = ({ weight = 1 }) => {
  return <StDiv $weight={weight} />;
};

const StDiv = styled.div<{ $weight: number }>`
  flex-grow: ${({ $weight }) => $weight};
`;

export default StGlue;
