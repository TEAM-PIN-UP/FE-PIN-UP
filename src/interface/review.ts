export type DateTimeTuple = [
  /* year */ number,
  /* month */ number,
  /* day */ number,
  /* hour */ number,
  /* minute */ number,
  /* second */ number,
  /* timestamp */ number
];

export interface TextReview {
  id: number;
  content: string;
  starRating: number;
  type: "TEXT";
  imageUrls: string[];
  createdAt: DateTimeTuple;
}

export interface PhotoReview {
  id: number;
  content: string;
  createdAt: DateTimeTuple;
  previewImageUrl: string;
}

export interface ReviewDetail {
  id: number;
  content: string;
  starRating: number;
  type: string;
  imageUrls: string[];
  createdAt: DateTimeTuple;
}
