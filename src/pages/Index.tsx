import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Book, Contact } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Use Vite's import.meta.glob to import all jpg images eagerly
const images = import.meta.glob<string>("@/images/*.jpg", { eager: true, import: 'default' });
const carouselImages = Object.values(images) as string[];

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "Student Unity",
      description: "Bringing together students from all universities and colleges in Nairobi County"
    },
    {
      icon: Calendar,
      title: "Events & Activities",
      description: "Regular events, workshops, and activities for student development"
    },
    {
      icon: Book,
      title: "Academic Support",
      description: "Resources and support for academic excellence and career development"
    },
    {
      icon: Contact,
      title: "Community Impact",
      description: "Making a positive difference in our communities through student initiatives"
    }
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [prevImage, setPrevImage] = useState(0);
  const [fade, setFade] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPrevImage(currentImage);
      setFade(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % carouselImages.length);
        setFade(false);
      }, 300); // fade duration reduced
    }, 1800); // carousel interval reduced
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [currentImage]);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel Background */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Carousel Backgrounds for smooth fade */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={carouselImages[prevImage]}
            alt="carousel-prev"
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}
            style={{zIndex: 1}}
            draggable={false}
            loading="lazy"
            fetchPriority="low"
          />
          <img
            src={carouselImages[currentImage]}
            alt="carousel-current"
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ${fade ? 'opacity-0' : 'opacity-100'}`}
            style={{zIndex: 2}}
            draggable={false}
            loading="lazy"
            fetchPriority="low"
          />
        </div>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-10" />
        <div className="relative z-20 w-full max-w-2xl mx-auto text-center px-4 py-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg animate-fade-in">
            Welcome to <span className="text-yellow-300">NUCSA</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white drop-shadow animate-fade-in">
            Nairobi Universities Colleges and Students Association - Together We Rise-
            Uniting students across Nairobi County for excellence and community impact
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-600 hover:text-white transition-all duration-300 shadow-lg transform hover:scale-105">
              <Link to="/membership">Join NUCSA Today</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:text-white transition-all duration-300 shadow-lg transform hover:scale-105">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To represent, advocate for and serve the collective interests of Nairobi universities  and colleges students by fostering unity, promoting student welfare, nurturing leadership and facilitating impactful engagement in academic, social, economic and civic spheres.
            </p>
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mx-auto w-full max-w-5xl" role="list" aria-label="NUCSA Home Features">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                // Assign unique color for each card
                const iconColors = [
                  "text-blue-600 group-hover:text-blue-800 bg-blue-100",
                  "text-green-600 group-hover:text-green-800 bg-green-100",
                  "text-yellow-500 group-hover:text-yellow-700 bg-yellow-100",
                  "text-purple-600 group-hover:text-purple-800 bg-purple-100"
                ];
                const colorClass = iconColors[index % iconColors.length];
                // Concise, action-oriented text
                const actionLabels = [
                  "Unite Students",
                  "Join Events",
                  "Get Academic Support",
                  "Impact Community"
                ];
                return (
                  <>
                    <Card
                      key={index}
                      className="text-center hover:shadow-2xl transition-transform duration-300 hover:scale-105 group focus-within:shadow-2xl focus-within:scale-105 border-t-4 border-blue-200 bg-white/95 outline-none"
                      tabIndex={0}
                      role="listitem"
                      aria-label={feature.title}
                    >
                      <CardHeader>
                        <div className={`mx-auto w-14 h-14 rounded-lg flex items-center justify-center mb-4 transition-transform duration-300 ${colorClass} group-hover:scale-110 group-focus:scale-110`}>
                          <Icon className={`h-8 w-8 transition-colors duration-300 ${colorClass.split(' ')[0]} group-hover:${colorClass.split(' ')[1]}`} aria-hidden="true" />
                        </div>
                        <CardTitle className="text-xl font-semibold mb-1">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-600 mb-2">{feature.description}</CardDescription>
                        <span className="inline-block text-sm font-medium text-blue-600 group-hover:underline group-focus:underline">{actionLabels[index]}</span>
                      </CardContent>
                    </Card>
                    {/* Decorative divider for desktop, except after last card */}
                    {index < features.length - 1 && (
                      <div className="hidden lg:flex items-center justify-center" aria-hidden="true">
                        <div className="w-1 h-16 bg-gradient-to-b from-blue-200 via-gray-200 to-green-200 rounded-full mx-auto" />
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students across Nairobi County who are part of the NUCSA community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-green-600 hover:text-white transition-all duration-300 shadow-lg transform hover:scale-105">
              <Link to="/membership">Become a Member</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gradient-to-r hover:from-green-600 hover:to-blue-600 hover:text-white transition-all duration-300 shadow-lg transform hover:scale-105">
              <Link to="/events">View Upcoming Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
