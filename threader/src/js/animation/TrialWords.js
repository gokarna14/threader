import { useTrail, animated, config } from 'react-spring'
import React, { useEffect, useState} from 'react';

function TrialWords(props) {

    const items = props.words;
    const config = { mass: 5, tension: 2000, friction: 200 };
    const [flip, set] = useState(false)

    const [state, setState] = useState(true);
    const trail = useTrail(items.length, {
        config,
        from: { opacity: 5, x: -100 },
        to: { opacity: 1 , x: 100},
        reverse: flip,
        reset: true,
        delay: 2000,
        onRest: () => set(!flip),
    });


    return (
        <div className="trails-div">
        {trail.map(({ x, ...otherProps }, i) => (
            <animated.div
            key={items[i]}
            style={{
                ...otherProps,
                transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`)
            }}
            className="trails-text"
            >
            <animated.div>
                <h6
                key={items[i]}
                style={{ width: '100%', height: props.textSep, textAlign: 'center' }}>
                    {items[i]}
                </h6>
            </animated.div>
            </animated.div>
        ))}
        </div>
    );
  }

  export default TrialWords;