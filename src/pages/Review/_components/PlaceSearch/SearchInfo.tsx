import contents from "@/images/icons/contentsActive.svg";
import { B3, H1 } from "@/styles/font";
import styled from "styled-components";

const SearchInfo = () => {
  return (
    <StSearchInfo>
      <img src={contents} />
      <div className="title">
        <p>어떤 장소의 핀로그를</p>
        <p>작성할까요?</p>
      </div>
      <p className="alert">*작성 된 리뷰는 핀버디에게만 보여요!</p>
    </StSearchInfo>
  );
};

const StSearchInfo = styled.div`
  display: grid;
  gap: var(--spacing_16);
  margin-top: 40px;
  img {
    width: 26px;
    height: 26px;
  }
  p {
    margin: 0;
  }
  .title {
    display: grid;
    gap: 8px;
    ${H1}
  }
  .alert {
    ${B3}
    color: var(--system_error);
  }
`;

export default SearchInfo;
