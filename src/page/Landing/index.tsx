import { B1, B2, B3, B4, B5, H1, H2, H3, H4, H5 } from "@/style/font";
import useToastPopup from "@/utils/toastPopup";
import styled from "styled-components";

const LandingPage: React.FC = () => {
  const toast = useToastPopup();

  return (
    <div>
      <p>This is LandingPage</p>
      <button
        onClick={() => {
          toast(
            "위치 확인을 위해 기기 설정에서 ‘위치 정보 사용’을 허용해주세요."
          );
        }}
      >
        토스트 테스트 버튼
      </button>
      <StExample>
        <div className="test1">테스트1</div>
        <div className="test2">테스트2</div>
        <div className="test3">테스트3</div>
        <div className="test4">테스트4</div>
        <div className="test5">테스트4</div>
        <div className="test6">테스트b</div>
        <div className="test7">테스트b</div>
        <div className="test8">테스트b</div>
        <div className="test9">테스트b</div>
        <div className="test10">테스트b</div>
        <div className="test11">테스트b11</div>
      </StExample>
    </div>
  );
};

const StExample = styled.div`
  .test1 {
    ${H1}
  }
  .test2 {
    ${H2}
  }
  .test3 {
    ${H3}
  }
  .test4 {
    ${H4}
  }
  .test5 {
    ${H5}
  }
  .test6 {
    ${B1}
  }
  .test7 {
    ${B2}
  }
  .test8 {
    ${B3}
  }
  .test9 {
    ${B4}
  }
  .test10 {
    ${B5}
  }
`;

export default LandingPage;
