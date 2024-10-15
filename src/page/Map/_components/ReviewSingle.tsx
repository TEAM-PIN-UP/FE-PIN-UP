import styled from "styled-components";
import profileImg from "@/image/icons/profile.jpg";

interface reviewProps {
  profileImg: string;
  name: string;
  score: number;
  date: string;
  comment: string;
}

const ReviewSingle: React.FC<reviewProps> = (data) => {
  return (
    <StReviewSingle>
      <img src={profileImg} alt="profileImg" />
      <div>
        <div>
          <div>
            <p>{data.name}</p>
            <div>
              <img alt="star" />
              <p>{data.score}</p>
            </div>
            <p>{data.date}</p>
          </div>
          <img alt="etc" />
        </div>
        <div>{data.comment}</div>
      </div>
    </StReviewSingle>
  );
};

const StReviewSingle = styled.div`
  display: flex;
  .profile {
    width: 40px;
    height: 40px;
    border-radius: var(--radius_circle);
  }
  .name {
  }
  .score {
  }
  .date {
  }
  .reviewContent {
  }
`;

export default ReviewSingle;
