import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Target, Heart, Star, Calendar, Book, HeartHandshake, Quote } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Star as StarIcon } from "lucide-react";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";

// Use Vite's import.meta.glob to import all jpg images dynamically (not eager)
const imageImports = import.meta.glob<string>("@/images/*.jpg", { import: 'default' });
const imageKeys = Object.keys(imageImports);

// Helper to dynamically import an image by index
async function loadImage(index: number) {
  const key = imageKeys[index % imageKeys.length];
  // @ts-ignore
  return await imageImports[key]();
}

const About = () => {
  // Carousel state
  const [currentImage, setCurrentImage] = useState(0);
  const [prevImage, setPrevImage] = useState(0);
  const [nextImage, setNextImage] = useState(1);
  const [fade, setFade] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: string }>({});

  // Preload current, prev, and next images
  useEffect(() => {
    let isMounted = true;
    const preload = async () => {
      const indices = [currentImage, prevImage, nextImage];
      const newLoaded: { [key: number]: string } = {};
      await Promise.all(indices.map(async (idx) => {
        if (!(idx in loadedImages)) {
          newLoaded[idx] = await loadImage(idx);
        } else {
          newLoaded[idx] = loadedImages[idx];
        }
      }));
      if (isMounted) setLoadedImages((prev) => ({ ...prev, ...newLoaded }));
    };
    preload();
    return () => { isMounted = false; };
  }, [currentImage, prevImage, nextImage]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPrevImage(currentImage);
      setNextImage((currentImage + 2) % imageKeys.length);
      setFade(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % imageKeys.length);
        setFade(false);
      }, 300);
    }, 1800);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [currentImage]);

  // Animated counters for impact
  const [impact, setImpact] = useState({members: 0, events: 0, universities: 0, projects: 0});
  useEffect(() => {
    let frame: number;
    let start = {members: 0, events: 0, universities: 0, projects: 0};
    const end = {members: 1000, events: 10, universities: 25, projects: 10};
    const duration = 1200;
    const startTime = performance.now();
    function animate(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      setImpact({
        members: Math.floor(progress * end.members),
        events: Math.floor(progress * end.events),
        universities: Math.floor(progress * end.universities),
        projects: Math.floor(progress * end.projects),
      });
      if (progress < 1) frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel Background */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white py-32 sm:py-44 lg:py-56 overflow-hidden">
        {/* Carousel Backgrounds for smooth fade */}
        <div className="absolute inset-0 w-full h-full z-0">
          {[prevImage, currentImage, nextImage].map((idx, i) => {
            if (!(idx in loadedImages)) return null;
            let loading = "lazy";
            let fetchPriority = "low";
            if (idx === 0) fetchPriority = "high";
            if (idx === currentImage || idx === prevImage || idx === nextImage) loading = "eager";
            let className = "w-full h-full object-cover absolute inset-0 transition-opacity duration-700";
            if (idx === prevImage) className += fade ? " opacity-100" : " opacity-0";
            if (idx === currentImage) className += fade ? " opacity-0" : " opacity-100";
            if (idx === nextImage) className += " hidden";
            return (
              <img
                key={idx}
                src={loadedImages[idx]}
                alt={`carousel-${idx}`}
                className={className}
                style={{zIndex: idx === currentImage ? 2 : 1}}
                draggable={false}
                loading={loading as any}
                fetchPriority={fetchPriority as any}
              />
            );
          })}
        </div>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg animate-fade-in">
              About <span className="text-yellow-300">NUCSA</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white drop-shadow animate-fade-in">
              Learn about our history, mission, and the impact we're making in Nairobi County
            </p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values - Callout Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[-4rem] mb-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-30">
        <Card className="hover:shadow-lg transition-shadow border-t-4 border-blue-600 flex flex-col items-center text-center py-8">
          <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Target className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl mb-2">Our Mission</CardTitle>
          <CardDescription className="text-gray-700 text-base mb-2">
            <ul className="list-disc list-inside text-left mx-auto max-w-xs">
              <li>Represent and advocate for Nairobi students</li>
              <li>Foster unity and promote student welfare</li>
              <li>Nurture leadership and impactful engagement</li>
            </ul>
          </CardDescription>
        </Card>
        <Card className="hover:shadow-lg transition-shadow border-t-4 border-green-600 flex flex-col items-center text-center py-8">
          <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Heart className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl mb-2">Our Vision</CardTitle>
          <CardDescription className="text-gray-700 text-base mb-2">
            <ul className="list-disc list-inside text-left mx-auto max-w-xs">
              <li>Be the leading, united, and vibrant voice for students</li>
              <li>Empower students to achieve academic, personal, and societal excellence</li>
            </ul>
          </CardDescription>
        </Card>
        <Card className="hover:shadow-lg transition-shadow border-t-4 border-yellow-400 flex flex-col items-center text-center py-8">
          <div className="w-14 h-14 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
          <CardTitle className="text-2xl mb-2">Our Values</CardTitle>
          <CardDescription className="text-gray-700 text-base mb-2">
            <ul className="list-disc list-inside text-left mx-auto max-w-xs">
              <li>Integrity & Accountability</li>
              <li>Inclusivity & Diversity</li>
              <li>Service & Leadership</li>
            </ul>
          </CardDescription>
        </Card>
      </section>

      {/* Our Impact - Animated Counters */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="absolute inset-0 w-full h-full bg-gray-100 opacity-80 rounded-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Our Impact</h2>
          <p className="text-lg text-gray-700 font-semibold mb-8 text-center max-w-2xl mx-auto">Together, we are shaping the future of Nairobi's student community one leader, one event, one project at a time.</p>
          <div className="flex justify-center mb-8">
            <div className="w-24 h-1 bg-gray-300 rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center" role="list" aria-label="NUCSA Impact Statistics">
            <Card className="hover:shadow-lg transition-transform duration-300 hover:scale-105 border-t-2 border-gray-200 bg-white/95 group" role="listitem" aria-label="Active Members">
              <div className="flex flex-col items-center py-8">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-blue-400 transition-transform duration-300 group-hover:scale-125 group-hover:text-blue-600" aria-hidden="true" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-1">{impact.members}+</div>
                <div className="text-gray-600">Active Members</div>
              </div>
            </Card>
            {/* Decorative divider for desktop */}
            <div className="hidden md:flex items-center justify-center" aria-hidden="true">
              <div className="w-1 h-16 bg-gradient-to-b from-blue-200 via-gray-200 to-green-200 rounded-full mx-auto" />
            </div>
            <Card className="hover:shadow-lg transition-transform duration-300 hover:scale-105 border-t-2 border-gray-200 bg-white/95 group" role="listitem" aria-label="Events Organized">
              <div className="flex flex-col items-center py-8">
                <div className="flex justify-center mb-2">
                  <Calendar className="h-8 w-8 text-green-400 transition-transform duration-300 group-hover:scale-125 group-hover:text-green-600" aria-hidden="true" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-1">{impact.events}+</div>
                <div className="text-gray-600">Events Organized</div>
              </div>
            </Card>
            <div className="hidden md:flex items-center justify-center" aria-hidden="true">
              <div className="w-1 h-16 bg-gradient-to-b from-green-200 via-gray-200 to-yellow-200 rounded-full mx-auto" />
            </div>
            <Card className="hover:shadow-lg transition-transform duration-300 hover:scale-105 border-t-2 border-gray-200 bg-white/95 group" role="listitem" aria-label="Universities and Colleges">
              <div className="flex flex-col items-center py-8">
                <div className="flex justify-center mb-2">
                  <Book className="h-8 w-8 text-yellow-400 transition-transform duration-300 group-hover:scale-125 group-hover:text-yellow-600" aria-hidden="true" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-1">{impact.universities}</div>
                <div className="text-gray-600">Universities/Colleges</div>
              </div>
            </Card>
            <div className="hidden md:flex items-center justify-center" aria-hidden="true">
              <div className="w-1 h-16 bg-gradient-to-b from-yellow-200 via-gray-200 to-purple-200 rounded-full mx-auto" />
            </div>
            <Card className="hover:shadow-lg transition-transform duration-300 hover:scale-105 border-t-2 border-gray-200 bg-white/95 group" role="listitem" aria-label="Community Projects">
              <div className="flex flex-col items-center py-8">
                <div className="flex justify-center mb-2">
                  <HeartHandshake className="h-8 w-8 text-purple-400 transition-transform duration-300 group-hover:scale-125 group-hover:text-purple-600" aria-hidden="true" />
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-1">{impact.projects}+</div>
                <div className="text-gray-600">Community Projects</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* History Timeline - Accordion */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>NUCSA is Founded (2025)</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">A group of passionate students from Nairobi universities came together in 2025 to form NUCSA, aiming to unite and empower students across the county.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Official CBO Registration (2025)</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">NUCSA became a legally registered Community-Based Organization in 2025, ensuring transparency, accountability, and legitimate representation of student interests.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Major Milestones</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc list-inside space-y-1">
                <li>Leadership Transformational Training</li>
                <li>Registering Members on Board</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Testimonials/Quotes - Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What Our Members Say</h2>
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <Carousel>
              <CarouselContent>
                {/* Use shared TestimonialsCarousel component here */}
                <TestimonialsCarousel />
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-2xl shadow-xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join NUCSA?</h2>
          <p className="text-lg mb-6">Become part of a vibrant student community making a difference in Nairobi County. Step up, connect, and grow with us!</p>
          <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-100 font-semibold px-8 py-4 rounded-lg shadow-md transition-all">
            Join NUCSA Today
          </Button>
        </div>
      </section>

      {/* Constitution Download Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl shadow-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-2xl font-bold mb-2">NUCSA Constitution</h3>
            <p className="text-base mb-4 sm:mb-0">Learn more about our mission, values, and governance. Download the official NUCSA Constitution for full details.</p>
          </div>
          <a
            href="/nucsa-constitution.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white text-blue-700 font-semibold shadow-lg hover:bg-blue-100 hover:text-blue-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            aria-label="Download NUCSA Constitution PDF"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l-5.25-5.25M12 19.5l5.25-5.25" />
            </svg>
            Download PDF
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
