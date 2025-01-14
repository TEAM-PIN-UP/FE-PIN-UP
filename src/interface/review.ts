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
