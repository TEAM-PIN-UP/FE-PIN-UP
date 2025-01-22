import styled from "styled-components";
import PlaceSearch from "./_components/PlaceSearch/PlaceSearch";
import ReviewHeader from "./_components/ReviewHeader";
import { useState } from "react";
import DatePick from "./_components/DatePick/DatePick";
import ReviewTotal from "./_components/ReviewTotal/ReviewTotal";
import { getSearchPlacesResponse } from "@/interface/apiInterface";
import CompleteModal from "./_components/ReviewTotal/CompleteModal";

type stepType = 1 | 2 | 3 | 4 | 5;

const ReviewPage = () => {
  const [step, setStep] = useState<stepType>(1);
  const [visitDate, setVisitDate] = useState<Date | null>(null);
  const [pickedInfo, setPickedInfo] = useState<getSearchPlacesResponse | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(true)

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

  return (
    <>
      {modalOpen && <CompleteModal setModalOpen={setModalOpen} />}

      <StReview>
        <ReviewHeader stepDown={stepDown} />
        {step === 1 ? <PlaceSearch stepUp={stepUp} setPickedInfo={setPickedInfo} /> : <></>}
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
            <ReviewTotal pickedInfo={pickedInfo} visitDate={visitDate} />
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
`;

export default ReviewPage;
