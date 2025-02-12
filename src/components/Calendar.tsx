import React from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { getMonth, getYear } from "date-fns";
import prev from "@/image/icons/arrowLeft.svg";
import next from "@/image/icons/chevronDown.svg";

interface DatePickerProp {
  setCalendarModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  date: Date | null;
}

const Calendar: React.FC<DatePickerProp> = ({ setDate, date }) => {
  const onChangeDate = (e: Date | null) => {
    if (e) setDate(e);
  };

  return (
    <>
      <CustomDatePicker>
        <div className="datePicker">
          <ReactDatePicker
            onChange={(e: Date | null) => onChangeDate(e)}
            selected={date}
            inline
            maxDate={new Date()}
            //디자인 커스텀

            renderCustomHeader={({
              date,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className="headerContent">
                <button
                  onClick={() => decreaseMonth()}
                  disabled={prevMonthButtonDisabled}
                >
                  <img src={prev} alt="" />
                </button>
                <div className="headerText">
                  {getYear(date)}. {getMonth(date) + 1}
                </div>
                <button
                  onClick={() => increaseMonth()}
                  disabled={nextMonthButtonDisabled}
                >
                  <img src={next} alt="" />
                </button>
              </div>
            )}
          />
        </div>
      </CustomDatePicker>
    </>
  );
};

const CustomDatePicker = styled.div`
  z-index: 1;

  .react-datepicker {
    border: none;
  }

  .react-datepicker__month-container {
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.15);
    border-radius: 6px;
    padding: 15px;
  }
  button {
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    cursor: pointer;
    width: 9px;
    height: 15px;
    padding: 0;
    img {
      width: 100%;
    }
  }

  .react-datepicker__header {
    background-color: #fff;
    border: none;
    padding: 0px 0 2px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .headerContent {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0px 0 15px;
      .headerText {
        font-family: "Regular";
        font-size: 22px;
        line-height: 33px;
        padding: 0 50px;
        min-width: 101px;
      }
    }
    .react-datepicker__day-names {
      line-height: 30px;
      display: grid;
      grid-template-columns: repeat(7, 38.5px);
      grid-template-rows: repeat(1, 38.5px);
      place-items: center;
      font-family: "Regular";
      margin-bottom: 2px;
      column-gap: 5px;
      font-size: 18px;
    }
  }
  .react-datepicker__day {
    font-family: "light";
    font-weight: normal;
    margin: 0;
    font-size: 16px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .react-datepicker__day--selected {
    background-color: #20315b;
  }
  .react-datepicker__month {
    margin: 0.4rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
  .react-datepicker__week {
    display: grid;
    grid-template-columns: repeat(7, 38.5px);
    grid-template-rows: repeat(1, 38.5px);
    place-items: center;
    font-size: 20px;
    column-gap: 5px;
  }
`;

export default Calendar;
