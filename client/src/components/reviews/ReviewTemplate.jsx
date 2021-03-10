import React, { useState, useEffect } from 'react';
import styles from '../../styleComponents/Reviews.module.css';
import Helpful from '../Helpful';
import ExpandedPhotos from '../ExpandedPhotos';

const ReviewTemplate = ({ review }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className={styles.reviewTemplate}>
        <StarRating rating={review.rating} />
        <div className={styles.templateSummary}>{review.summary}</div>
        <div className={styles.templateBody} style={{ fontSize: '15px' }}>{review.body}</div>
        <div className={styles.templateUserDateBar}>
          <UserDateBar review={review} />
        </div>
        <div className={styles.templateHelpfulReportBar}>
          <Helpful review_id={review.review_id} helpfulness={review.helpfulness} />
        </div>
        {(review.response)
          ? (
            <div className={styles.templateResponseFromSeller}>
              <p style={{ margin: '0px', fontWeight: 'bolder', padding: '10px 10px 0 10px' }}>Response from Seller:</p>
              <p style={{ margin: '0px', padding: '10px', fontSize: '15px' }}>{review.response}</p>
            </div>
          )
          : null}
        <div className={styles.templateImages}>
          {review.photos.map((photo, id) => <ExpandedPhotos photo={photo} key={id} />)}
        </div>
        {(review.recommend)
          ? (
            <div className={styles.templateRecommendsBar} style={{ paddingRight: '10px', fontSize: '12px'}}>
              &#10003; Yes, I recommend this product
            </div>
          )
          : null}
      </div>
    </div>
  );
};

const StarRating = ({ rating }) => {
  const starPercentage = (rating / 5) * 100;
  const roundedPercentage = (Math.round(starPercentage * 5) / 5);

  return (
    <div className={styles.starRating} style={{ justifyContent: 'left' }}>
      <div className={styles.starRatingTop} style={{ width: roundedPercentage }}>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
      <div className={styles.starRatingBottom}>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
        <span>★</span>
      </div>
    </div>
  );
};

const UserDateBar = ({ review }) => {
  const getDate = (date) => {
    const dateArr = date.slice(0, date.indexOf('T')).split('-');
    const year = dateArr.shift();
    dateArr.push(year);
    return dateArr.join('-');
  };

  const date = getDate(review.date);

  return (
    <div>
      <span style={{fontSize: 10, fontStyle: 'italic'}}>&#10003; Verified Purchaser</span>
      <div className={styles.userDateBar}>{review.reviewer_name}</div>
      <div className={styles.userDateBar}>{date}</div>
    </div>
  );
};
export default ReviewTemplate;
