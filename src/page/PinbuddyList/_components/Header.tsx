import Header from "@/components/Header";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import { H3 } from "@/style/font";
import styled from "styled-components";

const PinbuddyListHeader: React.FC = () => {
  return (
    <StReviewHeader>
      <Header.Left>
        <img src={chevronLeft} />
      </Header.Left>
      <Header.Center>핀버디</Header.Center>
    </StReviewHeader>
  );
};

const StReviewHeader = styled(Header)`
  ${H3}
  img {
    cursor: pointer;
  }
`;

export default PinbuddyListHeader;
