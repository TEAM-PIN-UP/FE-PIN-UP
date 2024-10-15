import ReviewSingle from "./ReviewSingle";

const Review = () => {
  const dummy = [
    {
      profileImg: "aa",
      name: "강석우",
      score: 1.5,
      date: "2024-10-07",
      comment: "나쁘지 않음",
    },
    {
      profileImg: "aa",
      name: "김하연",
      score: 3,
      date: "2024-10-04",
      comment: "굿굿",
    },
    {
      profileImg: "aa",
      name: "이서윤",
      score: 2.5,
      date: "2024-10-02",
      comment: "다시 안갈듯",
    },
    {
      profileImg: "aa",
      name: "임하늘",
      score: 3.5,
      date: "2024-10-11",
      comment: "좋았음",
    },
  ];

  return (
    <div>
      <p>리뷰 3</p>
      {dummy.map((value, index) => {
        return (
          <ReviewSingle
            key={index}
            name={value.name}
            score={value.score}
            profileImg={value.profileImg}
            date={value.date}
            comment={value.comment}
          />
        );
      })}
    </div>
  );
};

export default Review;
