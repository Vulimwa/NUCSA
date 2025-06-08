import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Use Vite's import.meta.glob to import all jpg images eagerly
const images = import.meta.glob<string>("@/images/*.jpg", { eager: true, import: 'default' });
const carouselImages = Object.values(images) as string[];

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Empowering Student Voices: NUCSA's Impact on University Policies",
      excerpt: "How NUCSA has successfully advocated for student rights and influenced positive changes in university policies across Nairobi County.",
      author: "Sarah Kimani",
      date: "January 15, 2025",
      readTime: "5 min read",
      category: "Advocacy",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Building Tomorrow's Leaders: NUCSA Leadership Development Program",
      excerpt: "Discover how our comprehensive leadership program is shaping the next generation of student leaders in Nairobi's universities.",
      author: "David Ochieng",
      date: "January 10, 2025",
      readTime: "4 min read",
      category: "Leadership",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Community Impact: Students Making a Difference",
      excerpt: "Stories of NUCSA members who are creating positive change in their communities through various outreach programs.",
      author: "Grace Wanjiku",
      date: "January 5, 2025",
      readTime: "6 min read",
      category: "Community",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Academic Excellence Initiative: Supporting Student Success",
      excerpt: "Learn about NUCSA's new academic support programs designed to help students achieve their educational goals.",
      author: "Michael Mwangi",
      date: "December 28, 2025",
      readTime: "3 min read",
      category: "Education",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Mental Health Matters: Breaking the Stigma on Campus",
      excerpt: "NUCSA's mental health awareness campaign and resources available to support student wellbeing.",
      author: "Esther Akinyi",
      date: "December 20, 2025",
      readTime: "7 min read",
      category: "Wellness",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Innovation Hub: Student Entrepreneurs Leading Change",
      excerpt: "Meet the student entrepreneurs who are turning their innovative ideas into successful businesses with NUCSA's support.",
      author: "Brian Kiprotich",
      date: "December 15, 2025",
      readTime: "5 min read",
      category: "Innovation",
      image: "/placeholder.svg"
    }
  ];

  const categories = ["All", "Advocacy", "Leadership", "Community", "Education", "Wellness", "Innovation"];

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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg animate-fade-in">
              NUCSA <span className="text-yellow-300">Blog</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto text-white drop-shadow animate-fade-in">
              Stories, insights, and updates from the vibrant student community across Nairobi County
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-6 sm:py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="text-xs sm:text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="aspect-video bg-gray-200 relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl line-clamp-2 hover:text-blue-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-8 sm:py-12 lg:py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
            Stay Updated with NUCSA
          </h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8">
            Subscribe to our newsletter for the latest stories and updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
