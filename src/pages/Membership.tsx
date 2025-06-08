
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const Membership = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    institution: "",
    yearOfStudy: "",
    studentId: "",
    course: "",
    areaOfInterest: "",
    agreeToTerms: false
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions",
        variant: "destructive"
      });
      return;
    }

    console.log("Membership form submitted:", formData);
    
    toast({
      title: "Registration Successful!",
      description: "Welcome to NUCSA! You'll receive a confirmation email shortly.",
    });

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      institution: "",
      yearOfStudy: "",
      studentId: "",
      course: "",
      areaOfInterest: "",
      agreeToTerms: false
    });
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Join NUCSA
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Become part of a community that empowers students across Nairobi County
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Networking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect with students from universities and colleges across Nairobi County
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Development</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Access leadership training, workshops, and skill development programs
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Participate in community service projects and make a difference
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Registration Form */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-2xl">Student Registration</CardTitle>
            <CardDescription>
              Fill out the form below to become a NUCSA member
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="institution">Institution *</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleInputChange("institution", e.target.value)}
                    placeholder="e.g., University of Nairobi"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearOfStudy">Year of Study *</Label>
                  <Select onValueChange={(value) => handleInputChange("yearOfStudy", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">First Year</SelectItem>
                      <SelectItem value="2">Second Year</SelectItem>
                      <SelectItem value="3">Third Year</SelectItem>
                      <SelectItem value="4">Fourth Year</SelectItem>
                      <SelectItem value="5">Fifth Year</SelectItem>
                      <SelectItem value="postgrad">Postgraduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID *</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange("studentId", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="course">Course/Program *</Label>
                <Input
                  id="course"
                  value={formData.course}
                  onChange={(e) => handleInputChange("course", e.target.value)}
                  placeholder="e.g., Computer Science, Business Administration"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="areaOfInterest">Areas of Interest</Label>
                <Textarea
                  id="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={(e) => handleInputChange("areaOfInterest", e.target.value)}
                  placeholder="What areas would you like to be involved in? (e.g., Leadership, Community Service, Academic Excellence, etc.)"
                  rows={4}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the NUCSA terms and conditions and constitution *
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                size="lg"
              >
                Submit Registration
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Membership;
