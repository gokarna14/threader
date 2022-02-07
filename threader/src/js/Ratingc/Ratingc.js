import React, { useState } from 'react'
import {Rating} from 'react-simple-star-rating'
 
export default function Ratingc(props) {

    return (
      <div className='App'>
        <Rating
            onClick={props.rated}
        //   ratingValue={props.rating}
          size={props.size}
          label
          transition
          fillColor='orange'
          emptyColor='gray'
          className='foo' // Will remove the inline style if applied
        />
        {/* Use rating value */}
      </div>
    )
  }