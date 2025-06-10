import { Card } from "@/components/ui/card";
import { Star as StarIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

// Use Vite's import.meta.glob to import all member images dynamically (not eager)
const memberImageImports = import.meta.glob("@/images/Member *.jpg", { import: 'default' });
const imageKeys = Object.keys(memberImageImports);

// Helper to dynamically import an image by index
async function loadImage(index: number) {
  const key = imageKeys[index % imageKeys.length];
  // @ts-ignore
  return await memberImageImports[key]();
}

const testimonials = [
  {
    image: 0,
    name: "Hannan Kassim",
    university: "UoN",
    rating: 5,
    text: "NUCSA gave me the platform to grow as a leader and make lifelong friends. The events and mentorship are top-notch!"
  },
  {
    image: 1,
    name: "Caroline Mucomba",
    university: "KU",
    rating: 5,
    text: "The community projects and support from NUCSA have made a real difference in my academic and personal life."
  },
  {
    image: 2,
    name: "Kyalo",
    university: "JKUAT",
    rating: 5,
    text: "I love the diversity and opportunities for growth. NUCSA is truly a family!"
  },
  {
    image: 3,
    name: "Dishon",
    university: "USIU",
    rating: 4,
    text: "NUCSA's leadership programs helped me build confidence and skills for my future."
  },
  {
    image: 4,
    name: "Gathoni Kaara",
    university: "Strathmore",
    rating: 5,
    text: "The events are always fun and impactful. I’ve made so many connections!"
  },
  {
    image: 5,
    name: "Kelvin Ndavi",
    university: "Kenyatta",
    rating: 4,
    text: "NUCSA is a great place to meet new people and give back to the community."
  },
  {
    image: 6,
    name: "John Nyongesa",
    university: "Daystar",
    rating: 5,
    text: "I appreciate the mentorship and support from the NUCSA team."
  },
  {
    image: 7,
    name: "Nicole",
    university: "CUEA",
    rating: 5,
    text: "The impact NUCSA has on students is amazing. Proud to be a member!"
  },
  {
    image: 8,
    name: "Rowzil",
    university: "TUK",
    rating: 5,
    text: "NUCSA’s events and projects have inspired me to do more for others."
  }
];

const TestimonialsCarousel: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: string }>({});

  // Always show 4 cards on desktop (>=1024px)
  let cardsToShow = 1;
  if (windowWidth >= 1024) cardsToShow = 4;
  else if (windowWidth >= 768) cardsToShow = 3;
  else if (windowWidth >= 640) cardsToShow = 2;
  else cardsToShow = 1;

  // Card width in px (should match min-w in className)
  const CARD_WIDTH = 250; // min-w-[250px]
  const GAP = 24; // gap-6 = 1.5rem = 24px
  const totalCardWidth = CARD_WIDTH + GAP;

  // Duplicate testimonials for seamless loop
  const looped = [...testimonials, ...testimonials];
  const visibleWidth = cardsToShow * totalCardWidth;

  // Preload only visible and next/prev images
  useEffect(() => {
    let isMounted = true;
    const indices = [];
    for (let i = 0; i < cardsToShow + 2; i++) {
      indices.push((Math.floor(offset / totalCardWidth) + i) % imageKeys.length);
    }
    const preload = async () => {
      const newLoaded: { [key: number]: string } = {};
      await Promise.all(indices.map(async (idx) => {
        if (!(idx in loadedImages)) {
          newLoaded[idx] = await loadImage(idx) as string;
        } else {
          newLoaded[idx] = loadedImages[idx];
        }
      }));
      if (isMounted) setLoadedImages((prev) => ({ ...prev, ...newLoaded }));
    };
    preload();
    return () => { isMounted = false; };
  }, [offset, cardsToShow]);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();
    const animate = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      setOffset((prev) => {
        let next = prev + (delta * 0.08); // speed px/ms
        const maxOffset = totalCardWidth * testimonials.length;
        if (next >= maxOffset) return next - maxOffset;
        return next;
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [totalCardWidth]);

  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex gap-6"
        style={{
          minHeight: 320,
          width: looped.length * totalCardWidth,
          transform: `translateX(-${offset}px)`,
          transition: 'none',
        }}
      >
        {looped.map((t, idx) => {
          // Only load visible and adjacent images eagerly
          const cardIdx = idx % imageKeys.length;
          let loading = "lazy";
          let fetchPriority = "low";
          if (cardIdx === 0) fetchPriority = "high";
          if (Math.abs(idx - Math.floor(offset / totalCardWidth)) <= cardsToShow) loading = "eager";
          return (
            <Card key={idx} className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-xl min-w-[250px] max-w-xs mx-auto">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-200 mb-4">
                <img src={String(loadedImages[t.image] ?? '')} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={`h-5 w-5 ${i < t.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                ))}
              </div>
              <div className="font-semibold text-lg text-blue-700 mb-1">{t.name}</div>
              <div className="text-sm text-gray-500 mb-2">{t.university}</div>
              <p className="text-gray-700 text-base mb-2">“{t.text}”</p>
            </Card>
          );
        })}
      </div>
      <style>{`
        @media (min-width: 1024px) {
          .testimonials-carousel-viewport {
            width: ${visibleWidth}px !important;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialsCarousel;
