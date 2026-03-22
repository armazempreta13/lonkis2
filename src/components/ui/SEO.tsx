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
  const structuredData = {
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
      { "@type": "OpeningHoursSpecification", dayOfWeek: "MondayToFriday", opens: "08:00", closes: "19:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:00", closes: "14:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "00:00", closes: "00:00" }
    ],
    sameAs: siteConfig.seo.socialProfiles,
    priceRange: "R$",
    description,
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={siteConfig.seo.author} />
      <meta name="robots" content="index, follow" />
      <meta name="google-site-verification" content={siteConfig.seo.googleSiteVerification} />
      <meta name="theme-color" content={siteConfig.seo.themeColor} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

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
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};
