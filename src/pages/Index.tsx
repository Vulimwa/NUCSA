import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Book, Contact } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Use Vite's import.meta.glob to import all jpg images eagerly
const images = import.meta.glob("@/images/*.jpg", { eager: true, import: 'default' });
const carouselImages = Object.values(images);

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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Change image every 4 seconds
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel Background */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Carousel Background */}
        <div
          className="absolute inset-0 w-full h-full z-0 transition-all duration-700"
          style={{
            backgroundImage: `url(${carouselImages[currentImage]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.85,
            transition: "background-image 0.7s ease-in-out"
          }}
        />
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
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/membership">Join NUCSA Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
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
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link to="/membership">Become a Member</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link to="/events">View Upcoming Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
