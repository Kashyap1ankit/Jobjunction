"use client";

import { cn } from "@/lib/utils";
import { fraunces } from "@/utils/fonts/font";
import React, { useEffect, useState } from "react";
import {
  FaAirbnb,
  FaAtlassian,
  FaBehance,
  FaBlackberry,
  FaCloudflare,
  FaGoogle,
  FaMedium,
  FaMicrosoft,
  FaYCombinator,
} from "react-icons/fa";

const arrayToUse = [
  {
    name: "FaAirbnb",
    element: <FaAirbnb className="size-6" />,
  },
  {
    name: "FaAtlassian",
    element: <FaAtlassian className="size-6" />,
  },
  {
    name: "FaBehance",
    element: <FaBehance className="size-6" />,
  },

  {
    name: "FaBlackberry",
    element: <FaBlackberry className="size-6" />,
  },

  {
    name: "FaCloudflare",
    element: <FaCloudflare className="size-6" />,
  },

  {
    name: "FaGoogle",
    element: <FaGoogle className="size-6" />,
  },

  {
    name: "FaMedium",
    element: <FaMedium className="size-6" />,
  },

  {
    name: "FaMicrosoft",
    element: <FaMicrosoft className="size-6" />,
  },

  {
    name: "FaYCombinator",
    element: <FaYCombinator className="size-6" />,
  },
];

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: string[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-12 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item) => {
          const Icon = arrayToUse.filter((e) => {
            if (e.name.includes(item)) {
              return e.element;
            }
          });
          const finalIcon = Icon[0].element;
          return (
            <li className="flex items-center gap-2" key={item}>
              <div className="flex items-center gap-2 text-gray-400">
                {finalIcon}
                <p className={`${fraunces.className} text-2xl`}>{item}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
