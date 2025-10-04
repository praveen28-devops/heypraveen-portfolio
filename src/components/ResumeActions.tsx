import React from "react";
import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeActionsProps {
  variant?: "default" | "compact" | "inline";
  showViewButton?: boolean;
  showDownloadButton?: boolean;
  className?: string;
}

const ResumeActions: React.FC<ResumeActionsProps> = ({
  variant = "default",
  showViewButton = true,
  showDownloadButton = true,
  className = "",
}) => {
  const resumePath = "/Praveen A-Resume.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumePath;
    link.download = "Praveen A-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    window.open(resumePath, "_blank");
  };

  // Compact variant for smaller spaces
  if (variant === "compact") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showDownloadButton && (
          <Button
            onClick={handleDownload}
            size="sm"
            className="bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            Resume
          </Button>
        )}
        {showViewButton && (
          <Button
            onClick={handleView}
            variant="outline"
            size="sm"
            className="border-slate-600 text-slate-300 hover:bg-slate-700 px-3 py-1.5 text-xs"
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
        )}
      </div>
    );
  }

  // Inline variant for text integration
  if (variant === "inline") {
    return (
      <span className={`inline-flex items-center gap-2 ${className}`}>
        {showDownloadButton && (
          <button
            onClick={handleDownload}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-200 underline decoration-dotted underline-offset-4"
          >
            <Download className="h-3 w-3 mr-1" />
            Download Resume
          </button>
        )}
        {showViewButton && showDownloadButton && (
          <span className="text-slate-500">|</span>
        )}
        {showViewButton && (
          <button
            onClick={handleView}
            className="inline-flex items-center text-teal-400 hover:text-teal-300 transition-colors duration-200 underline decoration-dotted underline-offset-4"
          >
            <Eye className="h-3 w-3 mr-1" />
            View Resume
          </button>
        )}
      </span>
    );
  }

  // Default variant
  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 ${className}`}
    >
      {showDownloadButton && (
        <Button
          onClick={handleDownload}
          className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 hover:from-slate-600 hover:to-slate-500 text-white font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group border border-slate-500/30 hover:border-slate-400/50"
        >
          <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:animate-bounce" />
          Download Resume
        </Button>
      )}

      {showViewButton && (
        <Button
          onClick={handleView}
          variant="outline"
          className="border-2 border-slate-600 bg-slate-800/50 text-slate-200 hover:bg-slate-700/70 hover:text-white hover:border-slate-500 font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base backdrop-blur-sm transition-all duration-300 transform hover:scale-105 group"
        >
          <Eye className="h-4 w-4 sm:h-5 sm:w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
          View Resume
        </Button>
      )}
    </div>
  );
};

export default ResumeActions;
