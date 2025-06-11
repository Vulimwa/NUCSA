import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

// Import some images for the carousel (use leadership images as placeholder)
import img1 from '@/images/Member 1.jpg';
import img2 from '@/images/Member 2.jpg';
import img3 from '@/images/Member 3.jpg';
import img4 from '@/images/Member 4.jpg';

const carouselImages = [img1, img2, img3, img4];

const WardRepresentative = () => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 3500);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {carouselImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Ward Rep Slide ${idx + 1}`}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ${current === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            style={{ minHeight: 360, maxHeight: 520 }}
            draggable={false}
          />
        ))}
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-20" />
        {/* Overlaid Text */}
        <div className="relative z-30 w-full max-w-2xl mx-auto text-center px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg animate-fade-in">
            Ward Representatives
          </h1>
          <p className="text-xl md:text-2xl mb-6 max-w-2xl mx-auto text-white drop-shadow animate-fade-in">
            Connecting you to your local student leaders across Nairobi County
          </p>
        </div>
      </section>

      {/* Brief Description Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-3rem] mb-12 relative z-40">
        <div className="bg-white/95 rounded-2xl shadow-lg p-8 text-center border-t-4 border-blue-600">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-4">What are Ward Representatives?</h2>
          <p className="text-gray-700 text-lg mb-2">
            Ward Representatives (Ward Reps) are your direct link to NUCSA leadership at the grassroots level. Each ward rep is dedicated to representing, supporting, and empowering students within their specific ward, ensuring every voice is heard and every concern addressed.
          </p>
          <p className="text-gray-600 text-base">
            Find your ward rep below and connect for support, events, and opportunities in your area.
          </p>
        </div>
      </section>
      {/* Cards will be added below this section */}
    </div>
  );
};

export default WardRepresentative;
