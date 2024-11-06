import styled from "styled-components";
import contents from "@/image/icons/contentsActive.svg";
import { B3, H1 } from "@/style/font";

const SearchInfo = () => {
  return (
    <StSearchInfo>
      <img src={contents} />
      <div className="title">
        <p>어떤 장소의 리뷰를</p>
        <p>작성할까요?</p>
      </div>
      <p className="alert">*작성 된 리뷰는 메이트들에게만 보여요!</p>
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
