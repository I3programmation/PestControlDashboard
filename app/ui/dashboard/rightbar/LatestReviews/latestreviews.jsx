import styles from './latestreviews.module.css';

const LatestReviews = () => {
  // Fetch or use mock data for the latest reviews
  const latestReviews = [
    // Sample review data
    { user: 'User1', comment: 'Great service!', rating: 5 },
    { user: 'User2', comment: 'Prompt response.', rating: 4 },
    // ... more reviews
  ];

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Latest Reviews</h3>
      <ul className={styles.reviewList}>
        {latestReviews.map((review, index) => (
          <li key={index} className={styles.reviewItem}>
            <div className={styles.reviewHeader}>
              <strong>{review.user}</strong>
              <span className={styles.rating}>Rating: {review.rating}</span>
            </div>
            <p className={styles.comment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestReviews;
