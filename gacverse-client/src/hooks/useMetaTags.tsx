import { CONSTANTS } from '@/utils/constants';
import { useEffect } from 'react';

interface MetaTags {
  title?: string;
  description?: string;
  keywords?: string;
}

export const useMetaTags = ({ title, description, keywords }: MetaTags) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} - ${CONSTANTS.app_name}`;
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);
    }

    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    return () => {
      document.title = CONSTANTS.app_name;
    };
  }, [title, description, keywords]);
};
