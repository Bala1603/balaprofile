import {
  useRef,
  useEffect,
  useCallback,
} from "react";

import "./ClickSpark.css";

function ClickSpark({
  sparkColor = "#ef4444",
  sparkSize = 13,
  sparkRadius = 50,
  sparkCount = 17,
  duration = 1400,
  easing = "ease-out",
  extraScale = 1,
  children,
}) {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const parent = canvas.parentElement;

    if (!parent) {
      return undefined;
    }

    let resizeTimeout;

    const resizeCanvas = () => {
      const { width, height } =
        parent.getBoundingClientRect();

      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const context = canvas.getContext("2d");

      if (context) {
        context.setTransform(
          pixelRatio,
          0,
          0,
          pixelRatio,
          0,
          0,
        );
      }
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimeout);

      resizeTimeout = window.setTimeout(
        resizeCanvas,
        100,
      );
    };

    const resizeObserver = new ResizeObserver(handleResize);

    resizeObserver.observe(parent);
    resizeCanvas();

    return () => {
      resizeObserver.disconnect();
      window.clearTimeout(resizeTimeout);
    };
  }, []);

  const easeFunction = useCallback(
    (progress) => {
      switch (easing) {
        case "linear":
          return progress;

        case "ease-in":
          return progress * progress;

        case "ease-in-out":
          return progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        case "ease-out":
        default:
          return progress * (2 - progress);
      }
    },
    [easing],
  );

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    let animationFrameId;

    const draw = (timestamp) => {
      const canvasRect = canvas.getBoundingClientRect();

      context.clearRect(
        0,
        0,
        canvasRect.width,
        canvasRect.height,
      );

      sparksRef.current = sparksRef.current.filter(
        (spark) => {
          const elapsed = timestamp - spark.startTime;

          if (elapsed >= duration) {
            return false;
          }

          const progress = elapsed / duration;
          const easedProgress = easeFunction(progress);

          const distance =
            easedProgress * sparkRadius * extraScale;

          const lineLength =
            sparkSize * (1 - easedProgress);

          const startX =
            spark.x +
            distance * Math.cos(spark.angle);

          const startY =
            spark.y +
            distance * Math.sin(spark.angle);

          const endX =
            spark.x +
            (distance + lineLength) *
              Math.cos(spark.angle);

          const endY =
            spark.y +
            (distance + lineLength) *
              Math.sin(spark.angle);

          context.strokeStyle = sparkColor;
          context.lineWidth = 2;
          context.lineCap = "round";

          context.beginPath();
          context.moveTo(startX, startY);
          context.lineTo(endX, endY);
          context.stroke();

          return true;
        },
      );

      animationFrameId =
        window.requestAnimationFrame(draw);
    };

    animationFrameId =
      window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [
    sparkColor,
    sparkSize,
    sparkRadius,
    duration,
    easeFunction,
    extraScale,
  ]);

  const handleClick = (event) => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const canvasRect = canvas.getBoundingClientRect();

    const clickX = event.clientX - canvasRect.left;
    const clickY = event.clientY - canvasRect.top;
    const startTime = performance.now();

    const newSparks = Array.from(
      { length: sparkCount },
      (_, index) => ({
        x: clickX,
        y: clickY,
        angle:
          (2 * Math.PI * index) / sparkCount,
        startTime,
      }),
    );

    sparksRef.current.push(...newSparks);
  };

  return (
    <div
      className="click-spark-wrapper"
      onClick={handleClick}
    >
      <canvas
        ref={canvasRef}
        className="click-spark-canvas"
        aria-hidden="true"
      />

      <div className="click-spark-content">
        {children}
      </div>
    </div>
  );
}

export default ClickSpark;