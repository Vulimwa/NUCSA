import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Events", "Leadership", "Community Service", "Academic", "Sports"];

  const galleryItems = [
    {
      id: 1,
      title: "Annual Student Leadership Summit 2024",
      category: "Leadership",
      image: "/placeholder.svg",
      description: "Student leaders from across Nairobi County gather for the annual summit"
    },
    {
      id: 2,
      title: "Community Clean-Up Drive",
      category: "Community Service",
      image: "/placeholder.svg",
      description: "NUCSA members participate in environmental conservation activities"
    },
    {
      id: 3,
      title: "Inter-University Sports Competition",
      category: "Sports",
      image: "/placeholder.svg",
      description: "Athletes competing in the annual inter-university games"
    },
    {
      id: 4,
      title: "Academic Excellence Awards Ceremony",
      category: "Academic",
      image: "/placeholder.svg",
      description: "Recognizing outstanding academic achievements"
    },
    {
      id: 5,
      title: "NUCSA Cultural Festival",
      category: "Events",
      image: "/placeholder.svg",
      description: "Celebrating the diverse cultures of Nairobi's student community"
    },
    {
      id: 6,
      title: "Mental Health Awareness Campaign",
      category: "Community Service",
      image: "/placeholder.svg",
      description: "Promoting mental wellness among university students"
    },
    {
      id: 7,
      title: "Student Innovation Showcase",
      category: "Events",
      image: "/placeholder.svg",
      description: "Students presenting their innovative projects and solutions"
    },
    {
      id: 8,
      title: "NUCSA Executive Committee",
      category: "Leadership",
      image: "/placeholder.svg",
      description: "The dedicated leadership team of NUCSA 2025-2026"
    },
    {
      id: 9,
      title: "Career Development Workshop",
      category: "Academic",
      image: "/placeholder.svg",
      description: "Preparing students for the professional world"
    },
    {
      id: 10,
      title: "Blood Drive Initiative",
      category: "Community Service",
      image: "/placeholder.svg",
      description: "NUCSA members supporting the community through blood donation"
    },
    {
      id: 11,
      title: "University Football Championship",
      category: "Sports",
      image: "/placeholder.svg",
      description: "The final match of the inter-university football tournament"
    },
    {
      id: 12,
      title: "Graduation Celebration",
      category: "Events",
      image: "/placeholder.svg",
      description: "Celebrating the achievements of graduating NUCSA members"
    }
  ];

  const filteredItems = selectedCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              NUCSA <span className="text-yellow-300">Gallery</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto">
              Capturing moments of growth, unity, and achievement across Nairobi's student community
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-6 sm:py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="text-xs sm:text-sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                    <div className="p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-semibold text-sm sm:text-base mb-1">{item.title}</h3>
                      <p className="text-xs sm:text-sm opacity-90">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Journey in Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These moments represent the collective impact of our vibrant student community
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">150+</div>
              <div className="text-sm sm:text-base text-gray-600">Events Organized</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">25+</div>
              <div className="text-sm sm:text-base text-gray-600">Universities Reached</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-sm sm:text-base text-gray-600">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">100+</div>
              <div className="text-sm sm:text-base text-gray-600">Community Projects</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
