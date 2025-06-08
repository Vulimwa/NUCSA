
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Contact } from "lucide-react";

const Leadership = () => {
  const executiveTeam = [
    {
      id: 1,
      name: "Sarah Wanjiku",
      position: "Chairperson",
      institution: "University of Nairobi",
      email: "chair@nucsa.org",
      bio: "Fourth-year Law student passionate about student rights and advocacy",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    },
    {
      id: 2,
      name: "David Kiprotich",
      position: "Vice Chairperson",
      institution: "Kenyatta University",
      email: "vice@nucsa.org",
      bio: "Engineering student with a focus on innovation and technology in education",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    },
    {
      id: 3,
      name: "Grace Muthoni",
      position: "Secretary General",
      institution: "USIU Africa",
      email: "secretary@nucsa.org",
      bio: "Business student dedicated to organizational excellence and transparency",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    },
    {
      id: 4,
      name: "James Ochieng",
      position: "Treasurer",
      institution: "Strathmore University",
      email: "treasurer@nucsa.org",
      bio: "Finance student ensuring responsible financial management",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    }
  ];

  const committees = [
    {
      name: "Academic Affairs",
      head: "Dr. Patricia Njeru",
      members: 8,
      focus: "Academic excellence and student support"
    },
    {
      name: "Community Outreach",
      head: "Michael Waweru",
      members: 12,
      focus: "Community service and social impact"
    },
    {
      name: "Events & Programs",
      head: "Linda Akinyi",
      members: 10,
      focus: "Event planning and student activities"
    },
    {
      name: "Communications",
      head: "Peter Mutua",
      members: 6,
      focus: "PR, marketing, and digital presence"
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Leadership Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated students leading NUCSA and representing the voice of 
            students across Nairobi County
          </p>
        </div>

        {/* Executive Team */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Executive Committee
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {executiveTeam.map((leader) => (
              <Card key={leader.id} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-24 h-24 rounded-full overflow-hidden mb-4">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{leader.name}</CardTitle>
                  <Badge className="mx-auto bg-blue-100 text-blue-800">
                    {leader.position}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{leader.institution}</p>
                  <p className="text-sm text-gray-700 mb-4">{leader.bio}</p>
                  <div className="flex items-center justify-center text-sm text-blue-600">
                    <Contact className="h-4 w-4 mr-1" />
                    <a href={`mailto:${leader.email}`} className="hover:underline">
                      {leader.email}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Committees */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Committee Structure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {committees.map((committee, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{committee.name}</CardTitle>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{committee.members} Members</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">
                    <strong>Committee Head:</strong> {committee.head}
                  </p>
                  <p className="text-gray-600">{committee.focus}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Governance */}
        <section className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Our Governance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Democratic Process</h3>
              <p className="text-gray-600">
                All leaders are elected by the student body through a transparent 
                democratic process
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Term Limits</h3>
              <p className="text-gray-600">
                Executive positions serve one-year terms to ensure fresh perspectives 
                and continuous leadership development
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Contact className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accountability</h3>
              <p className="text-gray-600">
                Regular reporting and feedback sessions ensure leaders remain 
                accountable to the student community
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Leadership;
