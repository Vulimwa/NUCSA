import { Card } from "@/components/ui/card";
import { Star as StarIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

// Use Vite's import.meta.glob to import all member images
const memberImages = import.meta.glob("@/images/Member *.jpg", { eager: true, import: 'default' });
const imageMap: Record<string, string> = {};
Object.entries(memberImages).forEach(([path, url]) => {
  // Extract 'Member X.jpg' from the path
  const match = path.match(/Member \d+\.jpg$/);
  if (match) imageMap[match[0]] = url as string;
});

const testimonials = [
  {
    image: imageMap["Member 1.jpg"],
    name: "Sarah",
    university: "UoN",
    rating: 5,
    text: "NUCSA gave me the platform to grow as a leader and make lifelong friends. The events and mentorship are top-notch!"
  },
  {
    image: imageMap["Member 2.jpg"],
    name: "Brian",
    university: "KU",
    rating: 5,
    text: "The community projects and support from NUCSA have made a real difference in my academic and personal life."
  },
  {
    image: imageMap["Member 3.jpg"],
    name: "Grace",
    university: "JKUAT",
    rating: 5,
    text: "I love the diversity and opportunities for growth. NUCSA is truly a family!"
  },
  {
    image: imageMap["Member 4.jpg"],
    name: "Kevin",
    university: "USIU",
    rating: 4,
    text: "NUCSA's leadership programs helped me build confidence and skills for my future."
  },
  {
    image: imageMap["Member 5.jpg"],
    name: "Esther",
    university: "Strathmore",
    rating: 5,
    text: "The events are always fun and impactful. I’ve made so many connections!"
  },
  {
    image: imageMap["Member 6.jpg"],
    name: "James",
    university: "Kenyatta",
    rating: 4,
    text: "NUCSA is a great place to meet new people and give back to the community."
  },
  {
    image: imageMap["Member 7.jpg"],
    name: "Linda",
    university: "Daystar",
    rating: 5,
    text: "I appreciate the mentorship and support from the NUCSA team."
  },
  {
    image: imageMap["Member 8.jpg"],
    name: "Peter",
    university: "CUEA",
    rating: 5,
    text: "The impact NUCSA has on students is amazing. Proud to be a member!"
  },
  {
    image: imageMap["Member 9.jpg"],
    name: "Janet",
    university: "TUK",
    rating: 5,
    text: "NUCSA’s events and projects have inspired me to do more for others."
  }
];

const TestimonialsCarousel: React.FC = () => {
  const [offset, setOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  let cardsToShow = 1;
  if (windowWidth >= 1024) cardsToShow = 4;
  else if (windowWidth >= 768) cardsToShow = 3;
  else if (windowWidth >= 640) cardsToShow = 2;
  else cardsToShow = 1;

  // Card width in px (should match min-w in className)
  const CARD_WIDTH = 270; // min-w-[250px] + gap
  const GAP = 24; // gap-6 = 1.5rem = 24px
  const totalCardWidth = CARD_WIDTH + GAP;

  // Duplicate testimonials for seamless loop
  const looped = [...testimonials, ...testimonials];

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
          transform: `translateX(-${offset}px)`,
          transition: 'none',
          width: totalCardWidth * looped.length,
        }}
      >
        {looped.map((t, idx) => (
          <Card key={idx} className="flex flex-col items-center text-center p-6 bg-white shadow-lg rounded-xl min-w-[250px] max-w-xs mx-auto">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-200 mb-4">
              <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
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
        ))}
      </div>
    </div>
  );
};

export default TestimonialsCarousel;
