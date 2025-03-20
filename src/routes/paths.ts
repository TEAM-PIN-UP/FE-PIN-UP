export const paths = {
  base: () => "/",
  articles: (() => {
    const articles = "/articles";
    return Object.assign(() => articles, {
      post: () => `${articles}/post`,
    });
  })(),
  map: () => "/map",
  review: () => "/review",
  bookmarks: () => "/bookmarks",
  contents: () => "/contents",
  profile: (() => {
    const profile = "/profile";
    return Object.assign(() => profile, {
      notifications: () => `${profile}/notifications`,
      photoReview: (reviewId: number | string) =>
        `${profile}/photo-review/${reviewId}`,
      search: () => `${profile}/search`,
      settings: (() => {
        const profileSettings = `${profile}/settings`;
        return Object.assign(() => profileSettings, {
          editProfile: () => `${profileSettings}/edit-profile`,
        });
      })(),
      id: (() => {
        const profileId = (memberId: string | number) =>
          `${profile}/${memberId}`;
        return Object.assign(
          (memberId: string | number) =>
            Object.assign(profileId(memberId), {
              friends: () => `${profileId(memberId)}/friends`,
            }),
          {}
        );
      })(),
    });
  })(),
  signup: () => "/signup",
  auth: (() => {
    const auth = () => "/auth";
    return {
      naver: () => `${auth}/naver`,
    };
  })(),
};
