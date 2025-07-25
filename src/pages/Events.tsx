import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Use Vite's import.meta.glob to import all jpg images dynamically (not eager)
const imageImports = import.meta.glob<string>("@/images/*.jpg", { import: 'default' });
const imageKeys = Object.keys(imageImports);

// Helper to dynamically import an image by index
async function loadImage(index: number) {
  const key = imageKeys[index % imageKeys.length];
  // @ts-ignore
  return await imageImports[key]();
}

const Events = () => {
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

  const upcomingEvents = [
    {
      id: 1,
      title: "Leadership Summit 2025",
      date: "2025-07-15",
      time: "9:00 AM - 5:00 PM",
      location: "Kenyatta University",
      description: "A full-day summit focused on developing leadership skills among students",
      category: "Leadership",
      attendees: 250
    },
    {
      id: 2,
      title: "Career Fair",
      date: "2025-07-22",
      time: "10:00 AM - 4:00 PM",
      location: "University of Nairobi",
      description: "Connect with top employers and explore career opportunities",
      category: "Career",
      attendees: 500
    },
    {
      id: 3,
      title: "Community Clean-Up Drive",
      date: "2025-07-28",
      time: "7:00 AM - 12:00 PM",
      location: "Uhuru Park",
      description: "Join us in making Nairobi cleaner and greener",
      category: "Community Service",
      attendees: 150
    }
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Mental Health Awareness Week",
      date: "2025-06-10",
      description: "Week-long campaign promoting mental health awareness among students",
      category: "Health",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      id: 5,
      title: "Inter-University Sports Festival",
      date: "2025-05-20",
      description: "Annual sports competition bringing together students from all universities",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    }
  ];

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Leadership": "bg-blue-100 text-blue-800",
      "Career": "bg-green-100 text-green-800",
      "Community Service": "bg-purple-100 text-purple-800",
      "Health": "bg-red-100 text-red-800",
      "Sports": "bg-orange-100 text-orange-800"
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const [openProposal, setOpenProposal] = useState(false);
  const [proposal, setProposal] = useState({
    name: "",
    email: "",
    eventTitle: "",
    eventDate: "",
    description: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleProposalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProposal({ ...proposal, [e.target.name]: e.target.value });
  };
  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setProposal({ name: "", email: "", eventTitle: "", eventDate: "", description: "" });
      setTimeout(() => {
        setSubmitted(false);
        setOpenProposal(false);
      }, 1800);
    }, 1200);
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
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg animate-fade-in">
              Events & Activities
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white drop-shadow animate-fade-in">
              Join us for exciting events that promote learning, networking, and community impact
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events - starts below hero, no overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* Upcoming Events */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition-shadow border-t-4 border-blue-600">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getCategoryColor(event.category)}>
                      {event.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {event.attendees}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">
                    {event.description}
                  </CardDescription>
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><strong>Time:</strong> {event.time}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-2 rounded-lg transition-all">
                    Register Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Past Events */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event) => (
              <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow border-t-4 border-blue-600">
                <div className="aspect-video bg-gray-200">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge className={getCategoryColor(event.category)}>
                      {event.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    {event.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg p-8 text-center shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            Have an Event Idea?
          </h2>
          <p className="text-xl mb-6">
            We'd love to hear your suggestions for future events and activities
          </p>
          <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg transition-all" onClick={() => setOpenProposal(true)}>
            Submit Event Proposal
          </Button>
        </section>
      </div>

      {/* Event Proposal Dialog */}
      <Dialog open={openProposal} onOpenChange={setOpenProposal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Submit an Event Proposal</DialogTitle>
          </DialogHeader>
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-2xl text-green-600 font-bold mb-2">Thank you!</div>
              <div className="text-gray-700">Your event proposal has been received.</div>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleProposalSubmit}>
              <Input
                name="name"
                type="text"
                placeholder="Your Name"
                value={proposal.name}
                onChange={handleProposalChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={proposal.email}
                onChange={handleProposalChange}
                required
              />
              <Input
                name="eventTitle"
                type="text"
                placeholder="Event Title"
                value={proposal.eventTitle}
                onChange={handleProposalChange}
                required
              />
              <Input
                name="eventDate"
                type="date"
                placeholder="Event Date"
                value={proposal.eventDate}
                onChange={handleProposalChange}
              />
              <Textarea
                name="description"
                placeholder="Describe your event idea..."
                value={proposal.description}
                onChange={handleProposalChange}
                required
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setOpenProposal(false)} disabled={submitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit"}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Events;
