import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../../siteConfig';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
}

export const SEO = ({ 
  title = siteConfig.seo.title, 
  description = siteConfig.seo.description, 
  keywords = siteConfig.seo.keywords,
  ogImage = siteConfig.seo.ogImage,
  url = siteConfig.seo.url
}: SEOProps) => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.brand.name,
    legalName: siteConfig.seo.company?.legalName,
    image: siteConfig.seo.logo,
    url: url,
    telephone: siteConfig.seo.company?.phone,
    email: siteConfig.seo.company?.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.seo.company?.address,
      addressLocality: "Brasília",
      addressRegion: "DF",
      postalCode: "72322-516",
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "08:30", closes: "19:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "08:00", closes: "19:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "08:00", closes: "19:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "08:00", closes: "19:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:00", closes: "19:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "19:30" }
    ],
    sameAs: siteConfig.seo.socialProfiles,
    priceRange: "R$",
    description,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: siteConfig.seo.organization?.ratingValue,
      reviewCount: siteConfig.seo.organization?.reviewCount,
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brand.name,
    url: url,
    logo: siteConfig.seo.logo,
    description: description,
    sameAs: siteConfig.seo.socialProfiles,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: siteConfig.seo.company?.phone,
      email: siteConfig.seo.company?.email,
      areaServed: "BR",
      availableLanguage: "pt-BR"
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.seo.company?.address,
      addressLocality: "Brasília",
      addressRegion: "DF",
      postalCode: "72322-516",
      addressCountry: "BR",
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: siteConfig.seo.faq?.map((item: any) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      ...((siteConfig.seo.breadcrumbs || []).map((crumb: any, i: number) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: crumb.url
      }))),
      { "@type": "ListItem", position: (siteConfig.seo.breadcrumbs?.length || 0) + 1, name: title, item: url }
    ]
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={siteConfig.seo.author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="google-site-verification" content={siteConfig.seo.googleSiteVerification} />
      <meta name="theme-color" content={siteConfig.seo.themeColor} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="language" content="Portuguese" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteConfig.seo.siteName} />
      <meta property="og:locale" content={siteConfig.seo.locale} />
      <meta property="fb:app_id" content={siteConfig.seo.facebookAppId} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteConfig.seo.twitterHandle} />
      <meta name="twitter:creator" content={siteConfig.seo.twitterHandle} />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={siteConfig.seo.canonical ?? url} />
      
      {/* Resource Hints for Performance */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* Alternate Links for Internationalization */}
      <link rel="alternate" hrefLang="pt-BR" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      {siteConfig.seo.faq && siteConfig.seo.faq.length > 0 && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
    </Helmet>
  );
};
