import { Review, ReviewLog } from 'src/@types/index';

export default function(state: { reviews: { reviews: Review[] } }) {
  const reviewList: { [key: string]: Review } = {};
  const logList: { [key: string]: ReviewLog } = {};

  state.reviews.reviews.forEach(review => {
    reviewList[review.id] = review;

    const logsIds: string[] = [];
    ((review.logs as unknown) as ReviewLog[]).forEach(log => {
      logList[log.id] = log;
      logList[log.id].reviewId = review.id;
      logsIds.push(log.id);
    });
    reviewList[review.id].logs = logsIds;
  });

  return {
    ...state,
    reviews: { reviews: reviewList },
    logs: { logs: logList },
  };
}
