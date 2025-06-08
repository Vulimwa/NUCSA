
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Target, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About NUCSA
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn about our history, mission, and the impact we're making in Nairobi County
          </p>
        </div>

        {/* CBO Status */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <div className="flex items-center justify-center mb-6">
            <FileText className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
            Legally Registered Community-Based Organization
          </h2>
          <p className="text-center text-gray-700 mb-6">
            NUCSA is officially registered as a Community-Based Organization (CBO) under
            Kenyan law, ensuring transparency, accountability, and legitimate representation
            of student interests across Nairobi County.
          </p>
          <div className="text-center">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Download NUCSA Constitution
            </Button>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-base">
                To represent, advocate for and serve the collective interests of Nairobi universities  and colleges students by fostering unity, promoting student welfare, nurturing leadership and facilitating impactful engagement in academic, social, economic and civic spheres.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-700 text-base">
                To be the leading, united and vibrant voice for university and college students in Nairobi, empowering the to achieve academic, personal and societal excellence.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Our Story */}
        <div className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              NUCSA was founded with a simple yet powerful vision: to bring together students
              from all universities and colleges within Nairobi County under one unified voice.
              Recognizing the strength that comes from unity, we established our organization
              as a platform for collaboration, advocacy, and positive change.
            </p>
            <p className="mb-4">
              As a registered Community-Based Organization, we operate with full transparency
              and accountability to our members and the broader community. Our governance
              structure ensures that every student voice is heard and that our initiatives
              align with the needs and aspirations of our diverse membership.
            </p>
            <p>
              Today, NUCSA continues to grow and evolve, adapting to the changing needs of
              students while maintaining our core commitment to excellence, unity, and
              community service.
            </p>
          </div>
        </div>

        {/* Impact Areas */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Impact Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
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

            <Card>
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

            <Card>
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
        </div>
      </div>
    </div>
  );
};

export default About;
