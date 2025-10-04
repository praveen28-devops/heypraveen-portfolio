import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const Seo = ({
  title = "Praveen A - Cloud & DevOps Engineer | Portfolio",
  description = "B.Tech IT Graduate specializing in Cloud Computing and DevOps. Experienced in AWS, Docker, Kubernetes, CI/CD, and automation. Ready for immediate joining.",
  keywords = "DevOps Engineer, Cloud Computing, AWS, Docker, Kubernetes, CI/CD, Automation, B.Tech IT, Portfolio, Praveen A",
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tags
    const updateOrCreateMeta = (
      attr: string,
      value: string,
      content: string,
    ) => {
      let meta = document.querySelector(`meta[${attr}="${value}"]`);
      if (meta) {
        meta.setAttribute("content", content);
      } else {
        meta = document.createElement("meta");
        meta.setAttribute(attr, value);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    };

    // Meta tags
    updateOrCreateMeta("name", "description", description);
    updateOrCreateMeta("name", "keywords", keywords);
    updateOrCreateMeta("name", "author", "Praveen A");
    updateOrCreateMeta("name", "robots", "index, follow");
    updateOrCreateMeta("http-equiv", "Content-Language", "en");

    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      canonical.setAttribute("href", window.location.href);
      document.head.appendChild(canonical);
    } else {
      canonical.setAttribute("href", window.location.href);
    }

    // Open Graph & Twitter tags
    const updateOrCreateOG = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute("content", content);
      } else {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    };
    updateOrCreateOG("og:title", title);
    updateOrCreateOG("og:description", description);
    updateOrCreateOG("og:type", "website");
    updateOrCreateOG("og:image", "/profile-photo.png");
    updateOrCreateOG("og:url", window.location.href);
    updateOrCreateOG("og:site_name", "Praveen A Portfolio");
    updateOrCreateOG("twitter:card", "summary_large_image");
    updateOrCreateOG("twitter:title", title);
    updateOrCreateOG("twitter:description", description);
    updateOrCreateOG("twitter:image", "/profile-photo.png");

    // Structured Data (JSON-LD)
    const scriptId = "structured-data-jsonld";
    let script = document.getElementById(scriptId);
    if (script) script.remove();
    script = document.createElement("script");
    const scriptEl = script as HTMLScriptElement;
    scriptEl.type = "application/ld+json";
    scriptEl.id = scriptId;
    scriptEl.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Praveen A",
      url: window.location.href,
      image: "/profile-photo.png",
      jobTitle: "Cloud & DevOps Engineer",
      description,
      sameAs: [
        "https://www.linkedin.com/in/praveen28/",
        "https://github.com/praveen28-devops",
        "https://heypraveen.me/",
      ],
    });
    document.head.appendChild(scriptEl);
  }, [title, description, keywords]);

  return null;
};

export default Seo;
