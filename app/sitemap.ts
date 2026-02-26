import { MetadataRoute } from 'next';
import { initialProducts } from '@/data/products';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://frozenfood-mvp.example.com';

    const productsUrls = initialProducts.map((product) => ({
        url: `${baseUrl}/produk/${product.slug}`,
        lastModified: new Date(product.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/produk`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...productsUrls,
    ];
}
