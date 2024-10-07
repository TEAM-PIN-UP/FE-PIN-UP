import styled from "styled-components";
import { H1, H2, H3 } from "../../style/font";

const MapPage: React.FC = () => {
  return (
    <div>
      <StTitle>This is a map page</StTitle>
    </div>
  );
};

const StTitle = styled.div`
  ${H2};
  background-color: yellow;
`;

export default MapPage;
