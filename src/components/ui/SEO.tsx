import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { siteConfig } from '../../siteConfig';

type PageType = 'website' | 'article' | 'product' | 'faq' | 'local';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;

  // Page-type awareness
  type?: PageType;
  noIndex?: boolean;

  // Article-specific (used when type === 'article')
  publishedAt?: string;   // ISO 8601 — e.g. "2024-03-15T10:00:00-03:00"
  updatedAt?: string;     // ISO 8601
  articleSection?: string;
  authorName?: string;

  // Product-specific (used when type === 'product')
  productPrice?: number;
  productCurrency?: string;
  productAvailability?: 'InStock' | 'OutOfStock' | 'PreOrder';
}

export const SEO = ({
  title = siteConfig.seo.title,
  description = siteConfig.seo.description,
  keywords = siteConfig.seo.keywords,
  ogImage = siteConfig.seo.ogImage,
  url = siteConfig.seo.url,
  type = 'website',
  noIndex = false,
  publishedAt,
  updatedAt,
  articleSection,
  authorName,
  productPrice,
  productCurrency = 'BRL',
  productAvailability = 'InStock',
}: SEOProps) => {
  const location = useLocation();
  const baseUrl = (url || siteConfig.seo.url).replace(/\/$/, '');
  const canonicalUrl = `${baseUrl}${location.pathname}`;
  const isHomePage = location.pathname === '/';

  const finalTitle = title.includes(siteConfig.brand.name)
    ? title
    : `${title} | ${siteConfig.brand.name}`;

  const finalDescription = description || siteConfig.seo.description;
  const finalImage = ogImage || siteConfig.seo.ogImage;
  const imageAlt = siteConfig.seo.ogImageAlt || `${siteConfig.brand.name} social share image`;
  const finalAuthor = authorName || siteConfig.seo.author;

  const robotsContent = noIndex
    ? 'noindex, nofollow'
    : (siteConfig.seo.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // ─── Shared address block ────────────────────────────────────────────────
  const addressSchema = {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.seo.company?.address,
    addressLocality: 'Brasília',
    addressRegion: 'DF',
    postalCode: '72322-516',
    addressCountry: 'BR',
  };

  // ─── LocalBusiness ───────────────────────────────────────────────────────
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.brand.name,
    legalName: siteConfig.seo.company?.legalName,
    image: {
      '@type': 'ImageObject',
      url: finalImage,
      width: 1200,
      height: 630,
    },
    logo: {
      '@type': 'ImageObject',
      url: siteConfig.seo.logo,
    },
    url: baseUrl,
    telephone: siteConfig.seo.company?.phone,
    email: siteConfig.seo.company?.email,
    address: addressSchema,
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday',    opens: '08:30', closes: '19:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday',   opens: '08:00', closes: '19:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '08:00', closes: '19:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday',  opens: '08:00', closes: '19:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday',    opens: '08:00', closes: '19:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday',  opens: '08:00', closes: '19:30' },
    ],
    sameAs: siteConfig.seo.socialProfiles,
    priceRange: 'R$',
    description: finalDescription,
    ...(siteConfig.seo.organization?.ratingValue && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: siteConfig.seo.organization.ratingValue,
        reviewCount: siteConfig.seo.organization.reviewCount,
        bestRating: '5',
        worstRating: '1',
      },
    }),
  };

  // ─── Organization ────────────────────────────────────────────────────────
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.brand.name,
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: siteConfig.seo.logo,
    },
    description: finalDescription,
    sameAs: siteConfig.seo.socialProfiles,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: siteConfig.seo.company?.phone,
      email: siteConfig.seo.company?.email,
      areaServed: 'BR',
      availableLanguage: 'pt-BR',
    },
    address: addressSchema,
  };

  // ─── WebSite (only on home page — avoids duplicate schema confusion) ─────
  const websiteSchema = isHomePage
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.brand.name,
        url: siteConfig.seo.url,
        description: siteConfig.seo.description,
        inLanguage: 'pt-BR',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteConfig.seo.url}/?s={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }
    : null;

  // ─── WebPage (for inner pages) ───────────────────────────────────────────
  const webPageSchema =
    !isHomePage && type === 'website'
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: finalTitle,
          description: finalDescription,
          url: canonicalUrl,
          isPartOf: { '@id': siteConfig.seo.url },
          inLanguage: 'pt-BR',
          breadcrumb: { '@id': `${canonicalUrl}#breadcrumb` },
        }
      : null;

  // ─── Article ─────────────────────────────────────────────────────────────
  const articleSchema =
    type === 'article'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: finalTitle,
          description: finalDescription,
          url: canonicalUrl,
          image: {
            '@type': 'ImageObject',
            url: finalImage,
            width: 1200,
            height: 630,
          },
          author: {
            '@type': 'Person',
            name: finalAuthor,
          },
          publisher: {
            '@type': 'Organization',
            name: siteConfig.brand.name,
            logo: { '@type': 'ImageObject', url: siteConfig.seo.logo },
          },
          ...(publishedAt && { datePublished: publishedAt }),
          ...(updatedAt && { dateModified: updatedAt }),
          ...(articleSection && { articleSection }),
          inLanguage: 'pt-BR',
          isPartOf: { '@id': siteConfig.seo.url },
        }
      : null;

  // ─── Product ─────────────────────────────────────────────────────────────
  const productSchema =
    type === 'product' && productPrice != null
      ? {
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: finalTitle,
          description: finalDescription,
          image: finalImage,
          url: canonicalUrl,
          brand: {
            '@type': 'Brand',
            name: siteConfig.brand.name,
          },
          offers: {
            '@type': 'Offer',
            price: productPrice,
            priceCurrency: productCurrency,
            availability: `https://schema.org/${productAvailability}`,
            url: canonicalUrl,
            seller: { '@type': 'Organization', name: siteConfig.brand.name },
          },
          ...(siteConfig.seo.organization?.ratingValue && {
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: siteConfig.seo.organization.ratingValue,
              reviewCount: siteConfig.seo.organization.reviewCount,
            },
          }),
        }
      : null;

  // ─── BreadcrumbList ──────────────────────────────────────────────────────
  const breadcrumbItems = [
    ...(siteConfig.seo.breadcrumbs || []).map((crumb: any, i: number) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
    {
      '@type': 'ListItem',
      position: (siteConfig.seo.breadcrumbs?.length || 0) + 1,
      name: title,
      item: canonicalUrl, // ← fixed: was using `url` prop, now uses canonical
    },
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumb`,
    itemListElement: breadcrumbItems,
  };

  // ─── FAQ ─────────────────────────────────────────────────────────────────
  const hasFaq = type === 'faq' && Array.isArray(siteConfig.seo.faq) && siteConfig.seo.faq.length > 0;
  const faqSchema = hasFaq
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: siteConfig.seo.faq.map((item: any) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }
    : null;

  return (
    <Helmet>
      {/* ── Standard ─────────────────────────────────────────────────── */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={finalAuthor} />
      <meta name="robots" content={robotsContent} />
      <meta name="google-site-verification" content={siteConfig.seo.googleSiteVerification} />
      <meta name="application-name" content={siteConfig.brand.name} />
      <meta name="theme-color" content={siteConfig.seo.themeColor} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="language" content="Portuguese" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="generator" content="React" />

      {/* ── Open Graph ───────────────────────────────────────────────── */}
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:secure_url" content={finalImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:site_name" content={siteConfig.seo.siteName} />
      <meta property="og:locale" content={siteConfig.seo.locale || 'pt_BR'} />
      {siteConfig.seo.facebookAppId && (
        <meta property="fb:app_id" content={siteConfig.seo.facebookAppId} />
      )}

      {/* Article-specific Open Graph */}
      {type === 'article' && publishedAt && (
        <meta property="article:published_time" content={publishedAt} />
      )}
      {type === 'article' && updatedAt && (
        <meta property="article:modified_time" content={updatedAt} />
      )}
      {type === 'article' && articleSection && (
        <meta property="article:section" content={articleSection} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={finalAuthor} />
      )}

      {/* ── Twitter / X ──────────────────────────────────────────────── */}
      <meta name="twitter:card" content={siteConfig.seo.twitterCard || 'summary_large_image'} />
      <meta name="twitter:site" content={siteConfig.seo.twitterHandle} />
      <meta name="twitter:creator" content={siteConfig.seo.twitterHandle} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* ── Canonical & Alternates ────────────────────────────────────── */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="pt-BR" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      {/* ── Resource Hints ────────────────────────────────────────────── */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />

      {/* ── JSON-LD Structured Data ───────────────────────────────────── */}
      <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>

      {websiteSchema && (
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      )}
      {webPageSchema && (
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      )}
      {articleSchema && (
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      )}
      {productSchema && (
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
      )}
      {faqSchema && (
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      )}
    </Helmet>
  );
};