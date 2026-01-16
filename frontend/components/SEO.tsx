"use client";

import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  jsonLd?: object;
}

const SEO = ({
  title,
  description,
}: SEOProps) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

export default SEO;
