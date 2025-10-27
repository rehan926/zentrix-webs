import { useEffect, useRef } from "react";

interface TypedTextProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  loop?: boolean;
}

const TypedText = ({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  loop = true
}: TypedTextProps) => {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    let currentStringIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      if (!textRef.current) return;

      const currentString = strings[currentStringIndex];

      if (isDeleting) {
        textRef.current.textContent = currentString.substring(0, currentCharIndex - 1);
        currentCharIndex--;
      } else {
        textRef.current.textContent = currentString.substring(0, currentCharIndex + 1);
        currentCharIndex++;
      }

      let delay = isDeleting ? backSpeed : typeSpeed;

      if (!isDeleting && currentCharIndex === currentString.length) {
        delay = 2000;
        isDeleting = true;
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentStringIndex = (currentStringIndex + 1) % strings.length;
        if (!loop && currentStringIndex === 0) return;
        delay = 500;
      }

      timeoutId = setTimeout(type, delay);
    };

    type();

    return () => clearTimeout(timeoutId);
  }, [strings, typeSpeed, backSpeed, loop]);

  return <span ref={textRef}></span>;
};

export default TypedText;