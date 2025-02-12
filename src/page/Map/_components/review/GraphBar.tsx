import styled from "styled-components";

const GraphBar = ({ percentage = 0 }: { percentage: number }) => {
  return (
    <div>
      <StGraphBar percentage={percentage}>
        <div className="fill" />
      </StGraphBar>
    </div>
  );
};

const StGraphBar = styled.div<{ percentage: number }>`
  display: flex;
  width: 6px;
  height: 64px;
  background-color: white;
  border-radius: 8px;
  .fill {
    width: 100%;
    height: calc(64 * ${(props) => props.percentage}px);
    background-color: black;
    border-radius: 8px;
    margin-top: auto;
  }
`;

export default GraphBar;
