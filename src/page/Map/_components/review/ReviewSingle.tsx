import styled from "styled-components";
import profileImg from "@/image/icons/profile.jpg";
import star from "@/image/icons/star.svg";
import option from "@/image/icons/option.svg";

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
      <img className="profileImg" src={profileImg} alt="profileImg" />
      <div className="bucket">
        <div className="commentInfo">
          <div className="commentInfo">
            <p>{data.name}</p>
            <div>
              <img src={star} alt="star" />
              <p>{data.score}</p>
            </div>
            <p>{data.date}</p>
          </div>
          <img src={option} alt="option" />
        </div>
        <div>{data.comment}</div>
      </div>
    </StReviewSingle>
  );
};

const StReviewSingle = styled.div`
  display: flex;
  .profileImg {
    width: 40px;
    height: 40px;
    border-radius: var(--radius_circle);
  }
  .bucket {
    display: flex;
    flex-direction: column;
    .commentInfo {
      display: flex;
    }
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
