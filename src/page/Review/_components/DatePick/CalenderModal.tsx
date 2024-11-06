import Button from "@/components/Button";
import Calendar from "@/components/Calendar";
import styled from "styled-components";

interface CalendarModalProps {
  visitDate: Date | null;
  setVisitDate: React.Dispatch<React.SetStateAction<Date | null>>;
  setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  stepUp: () => void;
}

const CalendarModal: React.FC<CalendarModalProps> = ({
  visitDate,
  setVisitDate,
  setCalendarOpen,
  stepUp,
}) => {
  return (
    <StCalendarModal>
      <div className="modalBack" onClick={() => setCalendarOpen(false)} />
      <div className="calendarModal">
        <Calendar
          setCalendarModal={setCalendarOpen}
          date={visitDate}
          setDate={setVisitDate}
        />
        <Button
          size="xlarge"
          active={visitDate ? true : false}
          onClick={() => {
            stepUp();
            setCalendarOpen(false);
          }}
        >
          선택 완료
        </Button>
      </div>
    </StCalendarModal>
  );
};

const StCalendarModal = styled.div`
  width: 100%;
  .calendarModal {
    max-width: 440px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    left: 50%;
    bottom: 78px;
    z-index: 1;
    transform: translate(-50%, 0);
    gap: 12px;
  }
  .modalBack {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
  }
`;

export default CalendarModal;
