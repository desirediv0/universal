export const fetchProducts = async (isAllProducts = false) => {
    try {
        if (isAllProducts) {
            // Call the API to fetch all products
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/all`);
            const data = await response.json();
            return data.data || []; // Return the data array directly
        } else {
            // Use the local JSON for homepage products
            const response = await fetch('/product.json');
            const data = await response.json();
            return data;
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const fetchsingleProduct = async (slug) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/product/${slug}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        try {
            return JSON.parse(text);
        } catch (e) {
            console.error('JSON Parse Error:', text);
            throw new Error('Invalid response format from server');
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
};


export const submitContactForm = async (formData) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        throw error;
    }
};


export const fetchCategoryProducts = async ({ categoryName = '', subcategoryName = '' }) => {
    try {
        let url;
        const timestamp = Date.now();

        if (subcategoryName && subcategoryName !== 'all') {
            url = `${process.env.NEXT_PUBLIC_API_URL}/subcategory/products?subcategory=${subcategoryName.toLowerCase().replace(/\s+/g, '-')
                }&_t=${timestamp}`;

            const response = await fetch(url, {
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });
            const rawData = await response.json();

            // If subcategory has no products, return empty array
            if (!rawData.success || !rawData.data?.products?.length) {
                return {
                    success: false,
                    data: { products: [] },
                    message: "No products found in this subcategory"
                };
            }

            return normalizeProductData(rawData);
        }

        // If no subcategory or subcategory is 'all', fetch category products
        if (categoryName && categoryName !== 'all') {
            url = `${process.env.NEXT_PUBLIC_API_URL}/category/products?category=${categoryName.toLowerCase().replace(/\s+/g, '-')
                }&_t=${timestamp}`;
        } else {
            url = `${process.env.NEXT_PUBLIC_API_URL}/product/all?_t=${timestamp}`;
        }

        const response = await fetch(url, {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            }
        });
        const rawData = await response.json();
        return normalizeProductData(rawData);

    } catch (error) {
        console.error('Error fetching products:', error);
        return {
            success: false,
            data: { products: [] },
            message: error.message
        };
    }
};

// Helper function to normalize product data
const normalizeProductData = (rawData) => {
    const products = rawData.data?.products || rawData.data || [];

    return {
        success: rawData.success || rawData.statusCode === 200,
        data: {
            products: products.map(product => ({
                id: product.id,
                title: product.title,
                description: product.description,
                shortDesc: product.shortDesc || product.description,
                price: product.price,
                saleprice: product.salePrice >= 0 ? product.salePrice : null,
                image: product.image,
                slug: product.slug,
                images: Array.isArray(product.images)
                    ? product.images.map(img => typeof img === 'string' ? img : img.url)
                    : [],
                categories: Array.isArray(product.categories)
                    ? product.categories.map(c => c.category?.name)
                    : product.categories?.split(',').map(c => c.trim()) || [],
                subCategories: Array.isArray(product.subCategories)
                    ? product.subCategories.map(s => s.subCategory?.name)
                    : []
            }))
        },
        message: rawData.message
    };
};


export const searchProducts = async (query) => {
    try {
        if (!query?.trim()) return [];

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/user-search?q=${encodeURIComponent(query.trim())}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            }
        });

        if (!response.ok) {
            throw new Error('Search failed');
        }

        const data = await response.json();
        // Return the message array which contains products
        return data.success && Array.isArray(data.message) ? data.message : [];
    } catch (error) {
        console.error('Search failed:', error);
        return [];
    }
};