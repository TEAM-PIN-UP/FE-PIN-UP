import calendar from "@/image/icons/calendar.svg";
import { B3, H1 } from "@/style/font";
import { useState } from "react";
import styled from "styled-components";
import CalendarModal from "./CalenderModal";

interface DatePickProp {
  stepUp: () => void;
  setVisitDate: React.Dispatch<React.SetStateAction<Date | null>>;
  visitDate: Date | null;
  name?: string;
}

const DatePick: React.FC<DatePickProp> = ({
  stepUp,
  visitDate,
  setVisitDate,
  name,
}) => {
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);

  return (
    <StDatePick>
      <img className="calendarImg" src={calendar} />
      <div className="dateInfo">
        <p>
          <span>'{name}'</span> 은/는
        </p>
        <p>언제 방문하셨나요?</p>
      </div>
      <div className="datePick" onClick={() => setCalendarOpen(true)}>
        {visitDate ? visitDate.toLocaleDateString() : "날짜 선택"}
      </div>
      {calendarOpen ? (
        <CalendarModal
          visitDate={visitDate}
          setVisitDate={setVisitDate}
          setCalendarOpen={setCalendarOpen}
          stepUp={stepUp}
        />
      ) : (
        <></>
      )}
    </StDatePick>
  );
};

const StDatePick = styled.div`
  display: grid;
  margin-top: 40px;
  padding: 0 var(--spacing_20);
  box-sizing: border-box;
  .calendarImg {
    width: 26px;
    height: 26px;
  }
  .dateInfo {
    display: grid;
    gap: 8px;
    margin: 16px 0 28px;
    ${H1}
    p {
      color: var(--neutral_400);
      span {
        color: var(--neutral_800);
      }
    }
  }
  .datePick {
    ${B3}
    padding: 16px 12px;
    border: 1px solid var(--neutral_200);
    border-radius: 8px;
    cursor: pointer;
  }
`;

export default DatePick;
