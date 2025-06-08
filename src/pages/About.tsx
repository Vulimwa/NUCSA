import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Target, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Use Vite's import.meta.glob to import all jpg images eagerly
const images = import.meta.glob<string>("@/images/*.jpg", { eager: true, import: 'default' });
const carouselImages = Object.values(images) as string[];

const About = () => {
  // Carousel state
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
      }, 300); // fade duration
    }, 1800); // carousel interval
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [currentImage]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel Background */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        {/* Carousel Backgrounds for smooth fade */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src={carouselImages[prevImage]}
            alt="carousel-prev"
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}
            style={{zIndex: 1}}
            draggable={false}
          />
          <img
            src={carouselImages[currentImage]}
            alt="carousel-current"
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ${fade ? 'opacity-0' : 'opacity-100'}`}
            style={{zIndex: 2}}
            draggable={false}
          />
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

      {/* CBO Status */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-blue-100">
          <div className="flex items-center justify-center mb-6">
            <FileText className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
            Legally Registered Community-Based Organization
          </h2>
          <p className="text-center text-gray-700 mb-6">
            NUCSA is officially registered as a Community-Based Organization (CBO) under Kenyan law, ensuring transparency, accountability, and legitimate representation of student interests across Nairobi County.
          </p>
          <div className="text-center">
            <Button className="bg-blue-600 hover:bg-blue-700 shadow-md px-6 py-3 rounded-lg text-lg font-semibold">
              Download NUCSA Constitution
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="hover:shadow-lg transition-shadow border-t-4 border-blue-600">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-base">
                To represent, advocate for and serve the collective interests of Nairobi universities and colleges students by fostering unity, promoting student welfare, nurturing leadership and facilitating impactful engagement in academic, social, economic and civic spheres.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-t-4 border-green-600">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-base">
                To be the leading, united and vibrant voice for university and college students in Nairobi, empowering them to achieve academic, personal and societal excellence.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gray-50 rounded-2xl p-8 shadow-md border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-700 mx-auto">
            <p className="mb-4">
              NUCSA was founded with a simple yet powerful vision: to bring together students from all universities and colleges within Nairobi County under one unified voice. Recognizing the strength that comes from unity, we established our organization as a platform for collaboration, advocacy, and positive change.
            </p>
            <p className="mb-4">
              As a registered Community-Based Organization, we operate with full transparency and accountability to our members and the broader community. Our governance structure ensures that every student voice is heard and that our initiatives align with the needs and aspirations of our diverse membership.
            </p>
            <p>
              Today, NUCSA continues to grow and evolve, adapting to the changing needs of students while maintaining our core commitment to excellence, unity, and community service.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Impact Areas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="hover:shadow-lg transition-shadow border-t-4 border-blue-400">
            <CardHeader>
              <CardTitle className="text-xl">Academic Excellence</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Study groups and peer mentorship</li>
                <li>• Scholarship opportunities</li>
                <li>• Academic resource sharing</li>
                <li>• Career development workshops</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-t-4 border-green-400">
            <CardHeader>
              <CardTitle className="text-xl">Leadership Development</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Leadership training programs</li>
                <li>• Student government support</li>
                <li>• Public speaking workshops</li>
                <li>• Project management skills</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-t-4 border-purple-400">
            <CardHeader>
              <CardTitle className="text-xl">Community Service</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-gray-700">
                <li>• Environmental conservation</li>
                <li>• Youth mentorship programs</li>
                <li>• Health awareness campaigns</li>
                <li>• Educational outreach</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
