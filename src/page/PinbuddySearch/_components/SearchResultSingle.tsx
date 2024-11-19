import styled from "styled-components";
import profileImg from "@/image/icons/profile.jpg";
import { B3, B5, H6 } from "@/style/font";

const SearchResultSingle = () => {
  return (
    <StSearchResultSingle>
      <img src={profileImg} />
      <div className="profileInfo">
        <div className="name">은채vv</div>
        <div className="counts">
          <div className="singleInfo">
            <span className="title">리뷰</span>
            <span>3</span>
          </div>
          <div className="singleInfo">
            <span className="title">핀버디</span>
            <span>24</span>
          </div>
        </div>
      </div>
      <div className="profileButton">프로필</div>
    </StSearchResultSingle>
  );
};

const StSearchResultSingle = styled.div`
  display: flex;
  width: 100%;
  img {
    width: 40px;
    height: 40px;
    border-radius: var(--radius_circle);
  }
  .profileInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    margin-left: 8px;
    text-align: left;
    .name {
      ${B3}
    }
    .counts {
      display: flex;
      gap: 8px;
      ${B5}
      .singleInfo {
        display: flex;
        gap: 2px;
        .title {
          color: var(--neutral_400);
        }
      }
    }
  }
  .profileButton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 55px;
    height: 30px;
    border-radius: 6px;
    background-color: var(--neutral_100);
    margin: auto 0 auto auto;
    ${H6}
    cursor: pointer;
  }
`;

export default SearchResultSingle;
