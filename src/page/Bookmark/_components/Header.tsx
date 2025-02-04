import styled from "styled-components";
import { H2 } from "@/style/font";



const BookMarkHeader: React.FC = () => {
    return (
        <StBookMarkHeader>
            <p>마이 플레이스</p>
            <div />
        </StBookMarkHeader>
    );
};

const StBookMarkHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--spacing_12) var(--spacing_20);
  box-sizing: border-box;
  border-bottom: 1px solid var(--neutral_100);
  ${H2}
  img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

export default BookMarkHeader;
