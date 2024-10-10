// import React, { useState } from 'react';
// import { AiFillStar } from 'react-icons/ai'; // Import AiFillStar from React Icons
// import './FeedbackForm.css'; // Import the CSS file

// const FeedbackForm = () => {
//   const [rating, setRating] = useState(0);
//   const [hover, setHover] = useState(0);
//   const [review, setReview] = useState('');

//   const handleSubmitReview = (e) => {
//     e.preventDefault();
//     // Handle the form submission logic here
//     console.log('Rating:', rating);
//     console.log('Review:', review);
//   };

//   return (
//     <form className='feedback-form' onSubmit={handleSubmitReview}>
//       <div>
//         <h3 className='feedback-question'>
//           How would you rate the overall experience?*
//         </h3>

//         <div className='rating-stars'>
//           {[...Array(5).keys()].map(index => {
//             const starIndex = index + 1;
//             return (
//               <button
//                 key={starIndex}
//                 type="button"
//                 className={`star-button ${starIndex <= (rating || hover) ? 'text-yellowColor' : 'text-gray-400'}`}
//                 onClick={() => setRating(starIndex)}
//                 onMouseEnter={() => setHover(starIndex)}
//                 onMouseLeave={() => setHover(rating)}
//               >
//                 <AiFillStar className='star-icon' />
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       <div className='feedback-textarea'>
//         <h3 className='feedback-question'>
//           Share your feedback and suggestions*
//         </h3>
//         <textarea
//           className='feedback-textarea-field'
//           rows='5'
//           placeholder='Write a review'
//           value={review}
//           onChange={(e) => setReview(e.target.value)}
//         ></textarea>
//       </div>

//       <button type='submit' className='btn'>
//         Submit Feedback
//       </button>
//     </form>
//   );
// };

// export default FeedbackForm;




import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReview] = useState('');

  const handleSubmitReview = (e) => {
    e.preventDefault();
    console.log('Rating:', rating);
    console.log('Review:', review);
  };

  return (
    <form className='feedback-form' onSubmit={handleSubmitReview}>
      <div>
        <h3 className='feedback-question'>
          How would you rate the overall experience?*
        </h3>

        <div className='rating-stars'>
          {[...Array(5).keys()].map(index => {
            const starIndex = index + 1;
            return (
              <button
                key={starIndex}
                type="button"
                className={`star-button ${starIndex <= (rating || hover) ? 'text-yellowColor' : 'text-gray-400'}`}
                onClick={() => setRating(starIndex)}
                onMouseEnter={() => setHover(starIndex)}
                onMouseLeave={() => setHover(rating)}
              >
                <AiFillStar className='star-icon' />
              </button>
            );
          })}
        </div>
      </div>

      <div className='feedback-textarea'>
        <h3 className='feedback-question'>
          Share your feedback and suggestions*
        </h3>
        <textarea
          className='feedback-textarea-field'
          rows='5'
          placeholder='Write a review'
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
      </div>

      <button type='submit' className='btn'>
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
