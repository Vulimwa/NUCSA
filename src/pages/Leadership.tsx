import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Contact, Heart, Book, Calendar, Star, UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Use Vite's import.meta.glob to import all jpg images dynamically (not eager)
const imageImports = import.meta.glob<string>("@/images/*.jpg", { import: 'default' });
const imageKeys = Object.keys(imageImports);

// Helper to dynamically import an image by index
async function loadImage(index: number) {
  const key = imageKeys[index % imageKeys.length];
  // @ts-ignore
  return await imageImports[key]();
}

// Use Vite's import.meta.glob to import all jpg images eagerly for executive/committee images
const images = import.meta.glob<string>("@/images/*.jpg", { eager: true, import: 'default' });

const Leadership = () => {
  // Carousel state for hero
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

  const executiveTeam = [
    {
      id: 1,
      name: "Kelvin Ndavi",
      position: "Chairperson",
      institution: "Kenyatta University",
      email: "chair@nucsa.org",
      bio: "Dedicated to student leadership and unity across Nairobi County.",
      image: images["/src/images/Member 6.jpg"] || images["/src/images/member 6.jpg"],
      promise: "To uphold the values of NUCSA and ensure every student's voice is heard.",
      message: "Together, we will achieve greatness and foster a united student community."
    },
    {
      id: 2,
      name: "Gathoni Kaara",
      position: "Vice Chairperson",
      institution: "Strathmore University",
      email: "vice@nucsa.org",
      bio: "Passionate about empowering students and fostering growth.",
      image: images["/src/images/Member 5.jpg"] || images["/src/images/member 5.jpg"],
      promise: "To empower every student and ensure their ideas and concerns are addressed.",
      message: "I believe in a proactive approach to student leadership, where every voice matters."
    },
    {
      id: 3,
      name: "Clinton",
      position: "Secretary General",
      institution: "JKUAT",
      email: "secretary@nucsa.org",
      bio: "Focused on organizational excellence and transparency.",
      image: images["/src/images/12.jpg"] || images["/src/images/12.jpg"],
      promise: "To maintain transparency and uphold the highest standards of integrity.",
      message: "Organizational excellence is key to our success; together, we will achieve it."
    },
    {
      id: 4,
      name: "John Nyongesa",
      position: "Organizing Secretary",
      institution: "Daystar University",
      email: "organizing@nucsa.org",
      bio: "Committed to effective event planning and student engagement.",
      image: images["/src/images/Member 7.jpg"] || images["/src/images/member 7.jpg"],
      promise: "To organize impactful events that resonate with the student community.",
      message: "Every event is an opportunity to engage and empower students; let's make them count."
    },
    {
      id: 5,
      name: "Ronnie Ray Moses",
      position: "Chief of Staff",
      institution: "",
      email: "chiefstaff@nucsa.org",
      bio: "Ensures smooth coordination and support for the executive team.",
      image: images["/src/images/5.jpg"] || null,
      promise: "To ensure seamless coordination within the executive team and with the student body.",
      message: "A united team is a successful team; let's work together to achieve our goals."
    },
    {
      id: 6,
      name: "Mary Gisare",
      position: "Treasurer",
      institution: "",
      email: "treasurer@nucsa.org",
      bio: "Oversees financial planning and accountability for NUCSA.",
      image: null,
      promise: "To manage NUCSA's finances with utmost integrity and transparency.",
      message: "Financial responsibility is key to our sustainability; I am committed to upholding it."
    },
    {
      id: 7,
      name: "Amie Awino",
      position: "Legal Advisor",
      institution: "",
      email: "legal@nucsa.org",
      bio: "Provides legal guidance and ensures compliance with regulations.",
      image: null,
      promise: "To provide sound legal advice and ensure NUCSA's compliance with all regulations.",
      message: "Legal integrity is the foundation of our operations; I am here to uphold it."
    },
    {
      id: 8,
      name: "Philip Oketch",
      position: "Sec. Executive Comm",
      institution: "",
      email: "execsec@nucsa.org",
      bio: "Supports the executive committee in strategic initiatives.",
      image: null,
      promise: "To support the executive committee in executing strategic initiatives effectively.",
      message: "Strategic execution is key to our success; let's achieve it together."
    }
  ];

  const committees = [
    {
      name: "Academic Affairs",
      head: "Brenda Nyakerario",
      images: [images["/src/images/com 1 (6).jpg"]],
      focus: "Academic excellence and student support"
    },
    {
      name: "Communications",
      head: "Faith Gakuo",
      images: [images["/src/images/com 1 (7).jpg"]],
      focus: "PR, marketing, and digital presence"
    },
    {
      name: "Climate Action",
      head: "Caroline Mucomba & Meshack Mutisya",
      images: [images["/src/images/com 1 (1).jpg"], images["/src/images/com 1 (5).jpg"]],
      focus: "Environmental sustainability and climate advocacy"
    },
    {
      name: "Youth Leadership",
      head: "Justice Gift & Agnes Mucemi",
      images: [images["/src/images/com 1 (2).jpg"], images["/src/images/com 1 (3).jpg"]],
      focus: "Empowering youth leaders and leadership development"
    },
    {
      name: "Events & Programs",
      head: "John Nyongesa",
      images: [images["/src/images/Member 7.jpg"]],
      focus: "Event planning and student activities"
    },
    {
      name: "Mental Health",
      head: "Rowzil Paultine",
      images: [images["/src/images/com 1 (9).jpg"]],
      focus: "Mental health awareness and support"
    },
    {
      name: "Sports, Arts & Culture",
      head: "Judy Chepkoech Too & Clinton",
      images: [images["/src/images/com 1 (4).jpg"], images["/src/images/12.jpg"]],
      focus: "Sports, arts, and cultural engagement"
    },
    {
      name: "Economic Empowerment",
      head: "Mutai Valarie",
      images: [],
      focus: "Economic empowerment and entrepreneurship"
    }
  ];

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedLeader, setSelectedLeader] = useState<typeof executiveTeam[number] | null>(null);

  const handleOpenModal = (leader: typeof executiveTeam[number]) => {
    setSelectedLeader(leader);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedLeader(null);
  };

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
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg animate-fade-in">
            NUCSA <span className="text-yellow-300">Leadership</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white drop-shadow animate-fade-in">
            Meet the dedicated team and committees driving student success across Nairobi County
          </p>
        </div>
      </section>

      {/* Executive Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16 relative z-30">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Executive Committee</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {executiveTeam.map((leader) => (
            <Card key={leader.id} className="text-center hover:shadow-2xl transition-transform duration-300 hover:scale-105 border-t-4 border-blue-500 bg-white/90">
              <CardHeader>
                <div className="mx-auto w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-blue-200 shadow-lg flex items-center justify-center bg-gray-100">
                  {leader.image ? (
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-lg">N/A</span>
                  )}
                </div>
                <CardTitle className="text-xl flex flex-col items-center gap-2">
                  <span>{leader.name}</span>
                  <Badge className="mx-auto bg-gradient-to-r from-blue-400 to-green-400 text-white text-sm px-3 py-1 shadow-md">
                    {leader.position}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-2">{leader.institution}</CardDescription>
                <p className="text-gray-700 mb-4">{leader.bio}</p>
                <div className="flex items-center justify-center gap-2 text-blue-600">
                  <Contact className="h-5 w-5" />
                  {leader.email ? (
                    <a href={`mailto:${leader.email}`} className="hover:underline">{leader.email}</a>
                  ) : null}
                </div>
                <Button 
                  variant="outline" 
                  className="mt-4 w-full"
                  onClick={() => handleOpenModal(leader)}
                >
                  Read Message
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Committees Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Committee Structure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {committees.map((committee, index) => (
            <Card
              key={index}
              className="hover:shadow-2xl transition-transform duration-300 hover:scale-105 border-t-4 border-green-400 bg-white/90 cursor-pointer group"
              tabIndex={0}
              aria-label={`Committee: ${committee.name}`}
            >
              <CardHeader>
                <div className="flex justify-center gap-2 mb-4">
                  {committee.images && committee.images.length > 0 ? (
                    committee.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={committee.head.split('&')[i]?.trim() || committee.head}
                        className="w-16 h-16 rounded-full border-4 border-green-200 shadow object-cover group-hover:ring-4 group-hover:ring-green-400 transition-all"
                      />
                    ))
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">N/A</div>
                  )}
                </div>
                <CardTitle className="text-lg text-center">
                  {committee.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700 font-semibold mb-1 text-center">{committee.head}</p>
                <p className="text-gray-600 mb-2 text-center">{committee.focus}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Modal for Leader's Message */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="max-w-lg">
          <div className="flex flex-col sm:flex-row">
            <div className="sm:w-1/3 p-4 bg-gray-100 flex items-center justify-center rounded-lg">
              {selectedLeader?.image ? (
                <img 
                  src={selectedLeader.image} 
                  alt={selectedLeader?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <span className="text-gray-400 text-lg">No Image Available</span>
              )}
            </div>
            <div className="sm:w-2/3 p-6">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold mb-2">
                  Message from {selectedLeader?.name}
                </DialogTitle>
                <DialogDescription className="text-gray-700 mb-4">
                  {selectedLeader?.message}
                </DialogDescription>
              </DialogHeader>
              <p className="text-gray-900 font-semibold mb-2">My Promise:</p>
              <p className="text-gray-700 mb-4">{selectedLeader?.promise}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Leadership;
