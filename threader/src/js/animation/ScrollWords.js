import { animated, useSpring, config } from 'react-spring';
import React, { useEffect, useState} from 'react';

function ScrollWords(props) {
    const [flip, set] = useState(false)
    const words = (props.words)
    
    const { scroll } = useSpring({
      scroll: (words.length - 1) * 50,
      from: { scroll: 0 },
      reset: true,
      reverse: flip,
      delay: 200,
      config: config.molasses,
      onRest: () => set(!flip),
    })
  
    return (
        <animated.div
        style={{
          position: 'relative',
          width: props.width,
          height: props.height,
          overflow: 'auto',
          fontSize: '0.5',
        }}
        scrollTop={scroll}>
        {words.map((word, i) => (
          <h3
            key={`${word}_${i}`}
            style={{ width: '100%', height: props.textSep, textAlign: 'center' }}>
            {word}
          </h3>
        ))}
      </animated.div>
    )
  }

  export default ScrollWords;