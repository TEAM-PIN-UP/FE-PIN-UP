import useBottomSheetSnapPoints from "@/hooks/useBottomSheetSnapPoints";
import noReviews from "@/image/icons/receiptLines.svg";
import {
  GetPlaceResponse,
  placeCategory,
  placeSort,
} from "@/interface/apiInterface";
import { H3 } from "@/style/font";
import { getLastKnownPositionObj } from "@/utils/getFromLocalStorage";
import { useEffect, useRef, useState } from "react";
import { Sheet, SheetRef } from "react-modal-sheet";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import Restaurant from "../Restaurant";
import ReviewHeader from "../headers/ReviewHeader";
import SearchHeader from "../headers/SearchHeader";
import Review from "../review/Review";

interface SheetSetup {
  attachRef: React.RefObject<HTMLDivElement>;
}
interface MapActions {
  setCategory: React.Dispatch<React.SetStateAction<placeCategory>>;
  setSort: React.Dispatch<React.SetStateAction<placeSort>>;
  setDataQuery: React.Dispatch<React.SetStateAction<string>>;
  setBookmark: React.Dispatch<React.SetStateAction<boolean>>;
  setKakaoPlaceId: React.Dispatch<React.SetStateAction<string | null>>;
}
interface MapData {
  places: GetPlaceResponse[] | undefined;
}
interface MapState {
  isReviewView: boolean;
  category: placeCategory;
  dataQuery: string;
  bookmark: boolean;
}
interface MapSheetProps {
  sheet: SheetSetup;
  mapActions: MapActions;
  mapData: MapData;
  mapState: MapState;
}

const MapSheet: React.FC<MapSheetProps> = (props) => {
  // Props
  const { attachRef } = props.sheet;
  const { setCategory, setSort, setDataQuery, setBookmark, setKakaoPlaceId } =
    props.mapActions;
  const { places } = props.mapData;
  const { isReviewView, category, dataQuery, bookmark } = props.mapState;

  // Bottom sheet logic
  const sheetRef = useRef<SheetRef>();
  const { snapPoints, sheetHeaderRef } = useBottomSheetSnapPoints();
  const [sheetLeft, setSheetLeft] = useState(0);
  useEffect(() => {
    const updateLeftPosition = () => {
      const newLeft =
        window.innerWidth > 440 ? (window.innerWidth - 440) / 2 : 0;
      if (newLeft !== sheetLeft) setSheetLeft(newLeft);
    };
    updateLeftPosition();
    window.addEventListener("resize", updateLeftPosition);
    return () => {
      window.removeEventListener("resize", updateLeftPosition);
    };
  }, [sheetLeft]);
  const navigate = useNavigate();

  const removeQueries = () => {
    const path = window.location.pathname; // 현재 경로
    window.history.pushState({}, "", path); // 쿼리 없이 경로만 유지
  };

  return (
    <StSheet
      ref={sheetRef}
      isOpen={true}
      onClose={() => {}}
      snapPoints={snapPoints}
      initialSnap={1}
      mountPoint={attachRef.current!}
      $left={sheetLeft}
    >
      <Sheet.Container>
        <Sheet.Header ref={sheetHeaderRef}>
          <Sheet.Header />
          {!isReviewView && (
            <SearchHeader
              dataQuery={dataQuery}
              setDataQuery={setDataQuery}
              setSort={setSort}
              category={category}
              setCategory={setCategory}
            />
          )}
          {isReviewView && (
            <ReviewHeader
              bookmark={bookmark}
              setBookmark={setBookmark}
              onBack={() => {
                removeQueries();
                setKakaoPlaceId(null);
              }}
            />
          )}
        </Sheet.Header>
        <Sheet.Content style={{ paddingBottom: sheetRef.current?.y }}>
          <Sheet.Scroller>
            {((!isReviewView && !places) ||
              (!isReviewView && places?.length === 0)) && (
              <div className="no-reviews">
                <img src={noReviews} />
                <p>근처에 리뷰 있는</p>
                <p>가게가 없어요!</p>
              </div>
            )}
            {places &&
              !isReviewView &&
              places.map((item) => (
                <div
                  key={item.kakaoPlaceId}
                  onClick={() => {
                    setKakaoPlaceId(item.kakaoPlaceId);
                    navigate(
                      `${window.location.pathname}?kakaoPlaceId=${item.kakaoPlaceId}`
                    );
                  }}
                >
                  <Restaurant
                    key={item.kakaoPlaceId}
                    name={item.name}
                    averageStarRating={item.averageStarRating}
                    reviewImageUrls={item.reviewImageUrls.slice().reverse()}
                    reviewerProfileImageUrls={item.reviewerProfileImageUrls
                      .slice()
                      .reverse()}
                    reviewCount={item.reviewCount}
                    distance={item.distance}
                  />
                </div>
              ))}
            {isReviewView && (
              <Review
                setBookmark={setBookmark}
                currentLatitude={getLastKnownPositionObj().coords.latitude}
                currentLongitude={getLastKnownPositionObj().coords.longitude}
              />
            )}
          </Sheet.Scroller>
        </Sheet.Content>
        <StGap
          $attachHeight={
            attachRef.current?.offsetHeight ?? window.innerHeight - 65
          }
        />
      </Sheet.Container>
    </StSheet>
  );
};

const StSheet = styled(Sheet)<{ $left: number }>`
  display: flex;
  justify-content: center;
  max-width: var(--max_width);
  min-width: var(--min_width);
  left: ${({ $left }) => `${$left}px !important`};

  .react-modal-sheet-content::-webkit-scrollbar {
    width: 8px;
  }

  .react-modal-sheet-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  .react-modal-sheet-content::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  .react-modal-sheet-content::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .no-reviews {
    ${H3}
    height:80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--neutral_500);
    gap: var(--spacing_8);
    margin-top: var(--spacing_12);

    img {
      height: 32px;
    }
  }
`;

const StGap = styled.div<{ $attachHeight: number }>`
  height: ${({ $attachHeight }) => `${window.innerHeight - $attachHeight}px`};
`;
export default MapSheet;
