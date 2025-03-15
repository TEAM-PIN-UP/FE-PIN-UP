import styled from "styled-components";
import { H2, H3 } from "@/style/font";

const MyPlaceHeader: React.FC = () => {
  return (
    <StMyPlaceHeader>
      <div className="title">마이 플레이스</div>
      {/* <div className="tabNav">
        <div>
          <p>전체</p>
          <div className="bar" />
        </div>
        <div>
          <p>지역별</p>
          <div className="bar" />
        </div>
      </div> */}
    </StMyPlaceHeader>
  );
};

const StMyPlaceHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid var(--neutral_100);
  padding: 12px 20px;
  border: 1px solid var(-neutral_100);
  .title {
    display: flex;
    box-sizing: border-box;
    ${H2}
  }
  /* .tabNav {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 39px;
    padding: 0px 20px;
    p {
      ${H3}
    }
    .bar {
      height: 3px;
      background-color: black;
    }
  } */
`;

export default MyPlaceHeader;
