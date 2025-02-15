import { GetSearchPlacesResponse } from "@/interface/apiInterface";
import useToastPopup from "@/utils/toastPopup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DatePick from "./_components/DatePick/DatePick";
import PlaceSearch from "./_components/PlaceSearch/PlaceSearch";
import ReviewHeader from "./_components/ReviewHeader";
import CompleteModal from "./_components/ReviewTotal/CompleteModal";
import ReviewTotal from "./_components/ReviewTotal/ReviewTotal";

type stepType = 1 | 2 | 3 | 4 | 5;

const ReviewPage = () => {
  const navigate = useNavigate();
  const toast = useToastPopup();

  const [step, setStep] = useState<stepType>(1);
  const [visitDate, setVisitDate] = useState<Date | null>(null);
  const [pickedInfo, setPickedInfo] = useState<GetSearchPlacesResponse | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [kakaoPlaceId, setKakaoPlaceId] = useState<string>("");

  const stepDown = () => {
    setStep((prevStep) => {
      const newStep = prevStep - 1;
      return newStep >= 1 ? (newStep as stepType) : prevStep;
    });
  };

  const stepUp = () => {
    setStep((prevStep) => {
      const newStep = prevStep + 1;
      return newStep <= 5 ? (newStep as stepType) : prevStep;
    });
  };

  const [isLoggedIn] = useState(
    !!localStorage.getItem("accessToken") &&
      !!localStorage.getItem("memberResponse")
  );
  useEffect(() => {
    if (!isLoggedIn) {
      toast("로그인 후 이용해 주세요.");
      navigate("/signup");
    }
    return () => {};
  }, [isLoggedIn, navigate, toast]);

  return (
    <>
      {modalOpen && (
        <CompleteModal
          setModalOpen={setModalOpen}
          kakaoPlaceId={kakaoPlaceId}
        />
      )}

      <StReview>
        <ReviewHeader step={step} stepDown={stepDown} />
        {step === 1 ? (
          <PlaceSearch stepUp={stepUp} setPickedInfo={setPickedInfo} />
        ) : (
          <></>
        )}
        {step === 2 ? (
          <DatePick
            visitDate={visitDate}
            setVisitDate={setVisitDate}
            stepUp={stepUp}
            name={pickedInfo?.name}
          />
        ) : (
          <></>
        )}
        {step === 3 ? (
          pickedInfo && visitDate ? (
            <ReviewTotal
              pickedInfo={pickedInfo}
              visitDate={visitDate}
              setModalOpen={setModalOpen}
              setKakaoPlaceId={setKakaoPlaceId}
            />
          ) : null
        ) : null}
      </StReview>
    </>
  );
};

const StReview = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
  padding-top: 44px;
`;

export default ReviewPage;
