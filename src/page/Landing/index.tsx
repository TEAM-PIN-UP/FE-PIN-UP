import useToastPopup from "@/utils/toastPopup";

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
    </div>
  );
};

export default LandingPage;
