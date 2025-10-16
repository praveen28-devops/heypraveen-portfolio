// ...existing code...
import {
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
} from "lucide-react";
// ...existing code...

// GeometricShapes component

const Education = () => {
  // No animation hooks

  const education = [
    {
      degree: "Bachelor of Engineering",
      field: "Information Technology",
      institution: "K S Rangasamy College of Technology",
      location: "Namakkal, Tamil Nadu",
      period: "2023 - 2027",
      grade: "CGPA: 7.8/10",
      highlights: [
        "Specialized in Cloud Computing and DevOps",
        "Member of Zealous Information Technology Association",
      ],
    },
    {
      degree: "Higher Secondary Certificate",
      field: "Science",
      institution: "Sri Vidya Mandir Matriculation Higher Secondary School",
      location: "Namakkal, Tamil Nadu",
      period: "2022 - 2023",
      grade: "Percentage: 81%",
      highlights: [
        "Active participant in Science Exhibitions",
        "Led school technology club",
      ],
    },
  ];

  const certifications = [
    {
      title:
        "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
      issuer: "Oracle",
      credentialUrl:
        "https://catalog-education.oracle.com/apex/f?p=1010:2:106302833521560::::P2_AUTHCODE,P2_AUTH_KEY,P2_ARG_INVALID_CNT:MX238423qH73c,NtFPU238351Ytjh244ElkC,0",
      date: "2025",
      level: "Associate",
      color: "from-orange-500 to-red-500",
    },
    {
      title:
        "Oracle Cloud Infrastructure 2025 Certified DevOps Professional",
      issuer: "Oracle",
      credentialUrl:
        "https://catalog-education.oracle.com/ords/certview/sharebadge?id=D815F4701C1395B56EBA2991A6D1C6DB4D124E0E1D7C30F9CDF2B4328E3878EB",
      date: "2025",
      level: "Professional",
      color: "from-red-500 to-orange-600",
    },
    {
      title: "Terraform",
      issuer: "Udemy",
      date: "Aug 2025",
      credentialUrl:
        "https://www.udemy.com/certificate/UC-f452bc1b-656a-4536-94be-a7833351afee/",
      level: "Associate",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "AWS Bootcamp of devops",
      issuer: "Udemy",
      date: "JUN 2025",
      credentialUrl:
        "https://www.udemy.com/certificate/UC-1eea3c49-5f33-4209-b5b3-b8a9801528c2/",
      level: "Associate",
      color: "from-blue-500 to-purple-500",
    },

    {
      title: "Azure DevOps Engineer Expert",
      issuer: "Microsoft",
      date: "On Progress",
      credentialUrl:
        "https://www.credly.com/badges/azure-devops-engineer-expert",
      level: "Expert",
      color: "from-blue-600 to-cyan-500",
    },
    {
      title: "Google Cloud Professional Cloud Architect",
      issuer: "Google Cloud",
      date: "On Progress",
      credentialUrl:
        "https://www.credential.net/google-cloud-professional-architect",
      level: "Professional",
      color: "from-green-500 to-blue-500",
    },
  ];

  return (
    <section
      id="education"
      className="py-12 sm:py-16 md:py-20 relative overflow-hidden bg-black"
    >
      {/* Animated Background Effects */}
      {/* No animated backgrounds */}

      {/* Background Elements - Enhanced for animations */}
      {/* No background elements */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-[clamp(1.75rem,6vw,3rem)] sm:text-[clamp(2rem,6vw,3.5rem)] md:text-[clamp(3rem,6vw,4rem)] lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            Education & Certifications
          </h2>
          <div className="w-12 sm:w-16 md:w-20 lg:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto rounded-full"></div>
        </div>

        {/* Education Section */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-white">
            Academic Background
          </h3>
          <div className="space-y-6 sm:space-y-8">
            {education.map((edu) => (
              <div
                key={edu.degree + edu.institution}
                className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6 sm:lg:space-x-8">
                  <div className="flex-shrink-0 mb-3 sm:mb-4 lg:mb-0">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
                      <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3 sm:mb-4">
                      <div>
                        <h4 className="text-lg sm:text-xl font-bold text-white mb-1">
                          {edu.degree}
                        </h4>
                        <p className="text-base sm:text-lg text-cyan-400 font-semibold">
                          {edu.field}
                        </p>
                        <p className="text-sm sm:text-base text-slate-300">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="mt-2 lg:mt-0 lg:text-right">
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400 mb-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{edu.period}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400 mb-1">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{edu.location}</span>
                        </div>
                        <p className="text-cyan-400 font-semibold text-sm sm:text-base">
                          {edu.grade}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      {edu.highlights.map((highlight) => (
                        <div
                          key={highlight}
                          className="flex items-start space-x-2"
                        >
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyan-400 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <p className="text-xs sm:text-sm text-slate-400">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-white">
            Professional Certifications
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {certifications.map((cert) => (
              <a
                key={cert.title + cert.issuer}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group cursor-pointer"
              >
                <div
                  className={`bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-5 lg:p-6 h-full`}
                >
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br ${cert.color} rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 md:mb-4`}
                  >
                    <Award className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-white mb-1 sm:mb-2 line-clamp-2 leading-tight">
                    {cert.title}
                  </h4>
                  <p className="text-cyan-400 font-semibold mb-1 text-xs sm:text-sm">
                    {cert.issuer}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-400 mb-2 sm:mb-3">
                    {cert.date}
                  </p>
                  <div
                    className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r ${cert.color} text-white text-xs font-medium rounded-full`}
                  >
                    {cert.level}
                  </div>
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-cyan-400" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
