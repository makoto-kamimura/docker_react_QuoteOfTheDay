import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './TypingAnimation.css';
import quotes from '../data/quotes/quotes.json';

function TypingAnimation() {
  const [text, setText] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
    setText('');
    let index = 0;

    const typeInterval = setInterval(() => {
      setText((prev) => prev + randomQuote[index]);
      index += 1;
      if (index >= randomQuote.length) {
        clearInterval(typeInterval);
      }
    }, 50); // 文字の表示速度（ミリ秒）

    return () => clearInterval(typeInterval);
  }, []);

  const springProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  return (
    <div className="terminal">
      <pre>
        <animated.div style={springProps}>{`$ 今日の一言: ${text}`}</animated.div>
      </pre>
    </div>
  );
}

export default TypingAnimation;
