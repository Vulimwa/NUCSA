import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Contact as ContactIcon, Users, Calendar, Book, MapPin, Mail, Phone, Facebook, Instagram, Linkedin, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Use Vite's import.meta.glob to import all jpg images dynamically (not eager)
const imageImports = import.meta.glob<string>("@/images/*.jpg", { import: 'default' });
const imageKeys = Object.keys(imageImports);

// Helper to dynamically import an image by index
async function loadImage(index: number) {
  const key = imageKeys[index % imageKeys.length];
  // @ts-ignore
  return await imageImports[key]();
}

const Contact = () => {
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting NUCSA. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["nairobistudentsassociation@gmail.com"]
    },
    {
      icon: Phone,
      title: "Phone",
      details: ["+254 112428539"]
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["University Way, Nairobi"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel Background */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-green-600 text-white py-24 sm:py-32 lg:py-40 overflow-hidden">
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
              Contact <span className="text-yellow-300">NUCSA</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white drop-shadow animate-fade-in">
              Have questions or want to get involved? We'd love to hear from you!
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Content - no overlay, starts below hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Contact Form + Follow Us */}
          <div className="flex flex-col gap-8 h-full">
            <Card className="shadow-xl border-t-4 border-blue-600 h-full flex flex-col justify-center py-8">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                      className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      rows={6}
                      required
                      className="bg-white border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg px-4 py-2 transition-all"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white text-lg font-semibold py-3 rounded-lg shadow-md transition-all"
                    size="lg"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
            {/* Follow Us Section with modern icons */}
            <Card className="border-t-4 border-blue-600">
              <CardHeader>
                <CardTitle className="text-xl">Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 items-center mb-2">
                  <a href="https://facebook.com/NUCSAKenya" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <Facebook className="h-8 w-8 text-blue-600 hover:text-blue-800 transition" />
                  </a>
                  <a href="https://x.com/nucsa_kenya" target="_blank" rel="noopener noreferrer" aria-label="X">
                    <X className="h-8 w-8 text-black hover:text-gray-700 transition" />
                  </a>
                  <a href="https://instagram.com/nucsa_official" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="h-8 w-8 text-pink-500 hover:text-pink-700 transition" />
                  </a>
                  <a href="https://linkedin.com/company/nucsa-kenya" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <Linkedin className="h-8 w-8 text-blue-700 hover:text-blue-900 transition" />
                  </a>
                </div>
                <p className="text-gray-700">Stay connected with NUCSA for updates and opportunities.</p>
              </CardContent>
            </Card>
          </div>

          {/* Get in Touch + Map */}
          <div className="flex flex-col gap-8 h-full">
            <Card className="border-t-4 border-blue-600 h-full flex flex-col justify-center py-8">
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Interactive contact info */}
                  <div className="flex items-center gap-4">
                    <Mail className="h-6 w-6 text-blue-600" />
                    <a href="mailto:info@nucsa.org" className="text-blue-700 hover:underline break-all">info@nucsa.org</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="h-6 w-6 text-green-600" />
                    <a href="tel:+254700000000" className="text-green-700 hover:underline">+254 700 000 000</a>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="h-6 w-6 text-purple-600" />
                    <a href="https://maps.google.com/?q=University+Way,+Nairobi" target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline">University Way, Nairobi</a>
                  </div>
                </div>
                {/* Map */}
                <div className="mt-8">
                  <iframe
                    title="NUCSA Office Map"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=36.8167%2C-1.2833%2C36.8267%2C-1.2733&layer=mapnik"
                    className="w-full h-64 rounded-lg border mt-2"
                    loading="lazy"
                  ></iframe>
                  <p className="text-xs text-gray-500 mt-1">View on <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer" className="underline text-blue-600">OpenStreetMap</a></p>
                </div>
                {/* Office Hours */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    <strong>Office Hours:</strong><br />
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
