import {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";

import { motion } from "motion/react";

import "./decrypted.css";

function Decrypted({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "hover",
  clickMode = "once",
  ...props
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(
    animateOn !== "click",
  );
  const [direction, setDirection] = useState("forward");

  const containerRef = useRef(null);
  const orderRef = useRef([]);
  const pointerRef = useRef(0);
  const intervalRef = useRef(null);

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter(
          (character) => character !== " ",
        )
      : characters.split("");
  }, [useOriginalCharsOnly, text, characters]);

  const shuffleText = useCallback(
    (originalText, currentRevealed) => {
      return originalText
        .split("")
        .map((character, index) => {
          if (character === " ") {
            return " ";
          }

          if (currentRevealed.has(index)) {
            return originalText[index];
          }

          return availableChars[
            Math.floor(Math.random() * availableChars.length)
          ];
        })
        .join("");
    },
    [availableChars],
  );

  const computeOrder = useCallback(
    (length) => {
      const order = [];

      if (length <= 0) {
        return order;
      }

      if (revealDirection === "start") {
        for (let index = 0; index < length; index += 1) {
          order.push(index);
        }

        return order;
      }

      if (revealDirection === "end") {
        for (let index = length - 1; index >= 0; index -= 1) {
          order.push(index);
        }

        return order;
      }

      const middle = Math.floor(length / 2);
      let offset = 0;

      while (order.length < length) {
        if (offset % 2 === 0) {
          const index = middle + offset / 2;

          if (index >= 0 && index < length) {
            order.push(index);
          }
        } else {
          const index = middle - Math.ceil(offset / 2);

          if (index >= 0 && index < length) {
            order.push(index);
          }
        }

        offset += 1;
      }

      return order.slice(0, length);
    },
    [revealDirection],
  );

  const fillAllIndices = useCallback(() => {
    const indices = new Set();

    for (let index = 0; index < text.length; index += 1) {
      indices.add(index);
    }

    return indices;
  }, [text]);

  const removeRandomIndices = useCallback((currentSet, count) => {
    const indices = Array.from(currentSet);

    for (
      let index = 0;
      index < count && indices.length > 0;
      index += 1
    ) {
      const randomIndex = Math.floor(
        Math.random() * indices.length,
      );

      indices.splice(randomIndex, 1);
    }

    return new Set(indices);
  }, []);

  const encryptInstantly = useCallback(() => {
    const emptySet = new Set();

    setRevealedIndices(emptySet);
    setDisplayText(shuffleText(text, emptySet));
    setIsDecrypted(false);
  }, [text, shuffleText]);

  const triggerDecrypt = useCallback(() => {
    if (sequential) {
      orderRef.current = computeOrder(text.length);
      pointerRef.current = 0;
    }

    setRevealedIndices(new Set());
    setDirection("forward");
    setIsAnimating(true);
  }, [sequential, computeOrder, text.length]);

  const triggerReverse = useCallback(() => {
    const allIndices = fillAllIndices();

    if (sequential) {
      orderRef.current = computeOrder(text.length)
        .slice()
        .reverse();

      pointerRef.current = 0;
    }

    setRevealedIndices(allIndices);
    setDisplayText(shuffleText(text, allIndices));
    setDirection("reverse");
    setIsAnimating(true);
  }, [
    sequential,
    computeOrder,
    text.length,
    fillAllIndices,
    shuffleText,
    text,
  ]);

  useEffect(() => {
    if (!isAnimating) {
      return undefined;
    }

    let currentIteration = 0;

    const getNextIndex = (revealedSet) => {
      const textLength = text.length;

      if (revealDirection === "start") {
        return revealedSet.size;
      }

      if (revealDirection === "end") {
        return textLength - 1 - revealedSet.size;
      }

      const middle = Math.floor(textLength / 2);
      const offset = Math.floor(revealedSet.size / 2);

      const nextIndex =
        revealedSet.size % 2 === 0
          ? middle + offset
          : middle - offset - 1;

      if (
        nextIndex >= 0 &&
        nextIndex < textLength &&
        !revealedSet.has(nextIndex)
      ) {
        return nextIndex;
      }

      for (let index = 0; index < textLength; index += 1) {
        if (!revealedSet.has(index)) {
          return index;
        }
      }

      return 0;
    };

    intervalRef.current = window.setInterval(() => {
      setRevealedIndices((previousRevealed) => {
        if (sequential) {
          if (direction === "forward") {
            if (previousRevealed.size < text.length) {
              const nextIndex = getNextIndex(previousRevealed);
              const nextRevealed = new Set(previousRevealed);

              nextRevealed.add(nextIndex);
              setDisplayText(shuffleText(text, nextRevealed));

              return nextRevealed;
            }

            window.clearInterval(intervalRef.current);
            setIsAnimating(false);
            setIsDecrypted(true);
            setDisplayText(text);

            return previousRevealed;
          }

          if (direction === "reverse") {
            if (pointerRef.current < orderRef.current.length) {
              const indexToRemove =
                orderRef.current[pointerRef.current];

              pointerRef.current += 1;

              const nextRevealed = new Set(previousRevealed);

              nextRevealed.delete(indexToRemove);
              setDisplayText(shuffleText(text, nextRevealed));

              if (nextRevealed.size === 0) {
                window.clearInterval(intervalRef.current);
                setIsAnimating(false);
                setIsDecrypted(false);
              }

              return nextRevealed;
            }

            window.clearInterval(intervalRef.current);
            setIsAnimating(false);
            setIsDecrypted(false);

            return previousRevealed;
          }
        }

        if (direction === "forward") {
          setDisplayText(shuffleText(text, previousRevealed));
          currentIteration += 1;

          if (currentIteration >= maxIterations) {
            window.clearInterval(intervalRef.current);
            setIsAnimating(false);
            setDisplayText(text);
            setIsDecrypted(true);
          }

          return previousRevealed;
        }

        let currentSet = previousRevealed;

        if (currentSet.size === 0) {
          currentSet = fillAllIndices();
        }

        const removeCount = Math.max(
          1,
          Math.ceil(text.length / Math.max(1, maxIterations)),
        );

        const nextSet = removeRandomIndices(
          currentSet,
          removeCount,
        );

        setDisplayText(shuffleText(text, nextSet));
        currentIteration += 1;

        if (
          nextSet.size === 0 ||
          currentIteration >= maxIterations
        ) {
          window.clearInterval(intervalRef.current);
          setIsAnimating(false);
          setIsDecrypted(false);
          setDisplayText(shuffleText(text, new Set()));

          return new Set();
        }

        return nextSet;
      });
    }, speed);

    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, [
    isAnimating,
    text,
    speed,
    maxIterations,
    sequential,
    revealDirection,
    shuffleText,
    direction,
    fillAllIndices,
    removeRandomIndices,
  ]);

  const handleClick = () => {
    if (animateOn !== "click") {
      return;
    }

    if (clickMode === "once") {
      if (!isDecrypted) {
        triggerDecrypt();
      }

      return;
    }

    if (clickMode === "toggle") {
      if (isDecrypted) {
        triggerReverse();
      } else {
        triggerDecrypt();
      }
    }
  };

  const triggerHoverDecrypt = useCallback(() => {
    if (isAnimating) {
      return;
    }

    setRevealedIndices(new Set());
    setIsDecrypted(false);
    setDisplayText(text);
    setDirection("forward");
    setIsAnimating(true);
  }, [isAnimating, text]);

  const resetToPlainText = useCallback(() => {
    window.clearInterval(intervalRef.current);

    setIsAnimating(false);
    setRevealedIndices(new Set());
    setDisplayText(text);
    setIsDecrypted(true);
    setDirection("forward");
  }, [text]);

  useEffect(() => {
    if (
      animateOn !== "view" &&
      animateOn !== "inViewHover"
    ) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            triggerDecrypt();
            setHasAnimated(true);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      },
    );

    const currentElement = containerRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [animateOn, hasAnimated, triggerDecrypt]);

  useEffect(() => {
    if (animateOn === "click") {
      encryptInstantly();
    } else {
      setDisplayText(text);
      setIsDecrypted(true);
    }

    setRevealedIndices(new Set());
    setDirection("forward");
  }, [animateOn, text, encryptInstantly]);

  let animationEvents = {};

  if (
    animateOn === "hover" ||
    animateOn === "inViewHover"
  ) {
    animationEvents = {
      onMouseEnter: triggerHoverDecrypt,
      onMouseLeave: resetToPlainText,
    };
  }

  if (animateOn === "click") {
    animationEvents = {
      onClick: handleClick,
    };
  }

  return (
    <motion.span
      ref={containerRef}
      className={`decrypted-wrapper ${parentClassName}`}
      {...animationEvents}
      {...props}
    >
      <span className="decrypted-screen-reader">
        {text}
      </span>

      <span aria-hidden="true">
        {displayText.split("").map((character, index) => {
          const isRevealed =
            revealedIndices.has(index) ||
            (!isAnimating && isDecrypted);

          return (
            <span
              key={`${character}-${index}`}
              className={
                isRevealed
                  ? className
                  : encryptedClassName
              }
            >
              {character}
            </span>
          );
        })}
      </span>
    </motion.span>
  );
}

export default Decrypted;