import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Book, Contact } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import com1_4 from '@/images/com 1 (4).jpg';
import com1_9 from '@/images/com 1 (9).jpg';
import member2 from '@/images/Member 2.jpg';
import com1_2 from '@/images/com 1 (2).jpg';
import img5 from '@/images/5.jpg';
import com1_6 from '@/images/com 1 (6).jpg';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

const imageImports = import.meta.glob<string>("@/images/*.jpg", { import: 'default' });
const imageKeys = Object.keys(imageImports);

async function loadImage(index: number) {
  const key = imageKeys[index % imageKeys.length];
  // @ts-ignore
  return await imageImports[key]();
}

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
  const [nextImage, setNextImage] = useState(1);
  const [fade, setFade] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [loadedImages, setLoadedImages] = useState<{ [key: number]: string }>({});

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

  const champions = [
    {
      name: "Judy Chepkoech",
      area: "Sports, Arts, Culture & Entertainment",
      image: com1_4,
      message: "I aim to inspire creativity and unity through sports, arts, and culture, making NUCSA a vibrant community for all talents.",
      wish: "To see every student discover and showcase their unique gifts."
    },
    {
      name: "Rowzil Paultine",
      area: "Mental Health Awareness",
      image: com1_9,
      message: "My mission is to break the stigma around mental health and ensure every student feels supported and heard.",
      wish: "A campus culture where mental wellness is a priority."
    },
    {
      name: "Caroline Mucomba",
      area: "Climate Action",
      image: member2,
      message: "I am passionate about environmental sustainability and empowering students to take climate action.",
      wish: "A greener, more sustainable future for all."
    },
    {
      name: "Justice Gift Illa",
      area: "Youth Leadership",
      image: com1_2,
      message: "I believe in nurturing the next generation of leaders through mentorship and opportunity.",
      wish: "To see youth voices lead positive change."
    },
    {
      name: "Ray Moses Ronnie",
      area: "Economic Empowerment",
      image: img5,
      message: "My goal is to equip students with skills and opportunities for economic independence.",
      wish: "A future where every student is empowered to succeed."
    },
    {
      name: "Brenda Nyakerario",
      area: "Economic & Skills Development",
      image: com1_6,
      message: "I am dedicated to fostering skills development and economic growth among students.",
      wish: "To see every student equipped for the modern workforce."
    }
  ];

  // Remove flip state
  const [openChampion, setOpenChampion] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Carousel Background */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Carousel Backgrounds for smooth fade */}
        <div className="absolute inset-0 w-full h-full z-0">
          {/* Only render prev, current, and next images */}
          {[prevImage, currentImage, nextImage].map((idx, i) => {
            if (!(idx in loadedImages)) return null;
            // Determine loading and fetchPriority
            let loading = "lazy";
            let fetchPriority = "low";
            if (idx === 0) fetchPriority = "high"; // Preload first image
            if (idx === currentImage || idx === prevImage || idx === nextImage) loading = "eager";
            // Fade logic for prev/current
            let className = "w-full h-full object-cover absolute inset-0 transition-opacity duration-700";
            if (idx === prevImage) className += fade ? " opacity-100" : " opacity-0";
            if (idx === currentImage) className += fade ? " opacity-0" : " opacity-100";
            if (idx === nextImage) className += " hidden"; // nextImage is preloaded but not shown
            return (
              <img
                key={idx}
                src={loadedImages[idx]}
                alt={`carousel-${idx}`}
                className={className}
                style={{zIndex: idx === currentImage ? 2 : 1}}
                draggable={false}
                loading={loading as any}
                // @ts-ignore: fetchpriority is a valid HTML attribute but not in React types yet
                fetchpriority={fetchPriority}
              />
            );
          })}
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

      {/* Meet Our Thematic Area Champions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-10">Meet Our Thematic Area Champions</h2>
          <div className="relative">
            {/* Carousel */}
            <div className="overflow-x-auto whitespace-nowrap scrollbar-hide pb-4">
              <div className="flex gap-8 animate-champions-scroll" style={{animation: 'champions-scroll 30s linear infinite'}}>
                {champions.concat(champions).map((champion, idx) => (
                  <div
                    key={`${champion.name}-${idx}`}
                    className="inline-block min-w-[280px] max-w-xs snap-center group perspective"
                    tabIndex={0}
                    aria-label={`Champion: ${champion.name}`}
                  >
                    <div className="relative w-full h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-green-100 shadow-lg flex flex-col items-center justify-center p-6">
                      <img src={champion.image} alt={champion.name} className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 mb-4 shadow-md" />
                      <div className="text-lg font-bold text-blue-800 mb-1">{champion.name}</div>
                      <div className="text-base text-gray-700 font-medium mb-2 text-center">{champion.area}</div>
                      <span className="inline-block px-3 py-1 bg-blue-200 text-blue-700 rounded-full text-xs font-semibold mb-3">Champion</span>
                      <Button size="sm" className="mt-2 bg-blue-700 hover:bg-blue-800 text-white" onClick={() => setOpenChampion(idx)}>
                        Read Message
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Dialog Popup for Champion Message */}
            {openChampion !== null && (
              <Dialog open={true} onOpenChange={() => setOpenChampion(null)}>
                <DialogContent className="max-w-md">
                  <div className="flex flex-col items-center text-center">
                    <img src={champions[openChampion % champions.length].image} alt={champions[openChampion % champions.length].name} className="w-24 h-24 rounded-full object-cover border-4 border-blue-300 mb-4 shadow-md" />
                    <DialogTitle className="text-2xl font-bold mb-2">{champions[openChampion % champions.length].name}</DialogTitle>
                    <div className="text-base text-gray-700 font-medium mb-2">{champions[openChampion % champions.length].area}</div>
                    <DialogDescription className="mb-4 text-gray-800">{champions[openChampion % champions.length].message}</DialogDescription>
                    <div className="text-blue-700 italic text-sm">{champions[openChampion % champions.length].wish}</div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
            <style>{`
              @keyframes champions-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-champions-scroll { will-change: transform; }
              .perspective { perspective: 1200px; }
              .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}</style>
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
