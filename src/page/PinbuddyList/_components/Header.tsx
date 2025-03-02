import Header from "@/components/Header";
import chevronLeft from "@/image/icons/chevronLeft.svg";
import { H3 } from "@/style/font";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PinbuddyListHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StReviewHeader>
      <Header.Left>
        <img src={chevronLeft} onClick={() => navigate(-1)} />
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
