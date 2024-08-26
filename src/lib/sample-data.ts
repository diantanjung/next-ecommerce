import hashPassword from "./hashPassword"

const password = 'password'
const sampleData = {
  users: [
    {
      name: 'admin',
      email: 'admin@user.com',
      password: hashPassword(password),
      role: 'admin',
    },
    {
      name: 'jane',
      email: 'jane@user.com',
      password: hashPassword(password),
      role: 'user',
    },
  ],
  products: [
    {
      name: 'Sepatu Sekolah',
      description: 'Sepatu Sekolah sangat canggih',
      category: 'Sepatu',
      brand: 'New ATT',
      slug: 'sepatu-sekolah',
      banner: 'asset/images/hero-01.webp',
      isFeatured: true,
      images: [
        '/assets/images/sneaker-01-a.webp',
        '/assets/images/sneaker-01-b.webp',
      ],
      price: '2000000',
      stock: 100,
      rating: '4.5'
    },
    {
      name: 'Sepatu Jalan Jalan',
      description: 'Sepatu Jalan Jalan sangat keren',
      category: 'Sepatu',
      brand: 'New Era',
      slug: 'sepatu-jalan-jalan',
      banner: 'asset/images/hero-02.webp',
      isFeatured: true,
      images: [
        '/assets/images/sneaker-02-a.webp',
        '/assets/images/sneaker-02-b.webp',
      ],
      price: '3000000',
      stock: 99,
      rating: '5'
    },
    {
      name: 'Sandal Kondangan',
      description: 'Sepatu Kondangan bapack-bapack',
      category: 'Sandal',
      brand: 'Lily',
      slug: 'sandal-kondangan',
      banner: 'asset/images/hero-03.webp',
      isFeatured: true,
      images: [
        '/assets/images/sneaker-03-a.webp',
        '/assets/images/sneaker-03-b.webp',
      ],
      price: '1500000',
      stock: 12,
      rating: '3.5'
    },
    {
      name: 'Kaos Oblong',
      description: 'Kaos Oblong anti gerah-gerah club',
      category: 'Sandal',
      brand: 'Lily',
      slug: 'kaos-oblong',
      banner: 'asset/images/hero-04.webp',
      isFeatured: true,
      images: [
        '/assets/images/sneaker-04-a.webp',
        '/assets/images/sneaker-04-b.webp',
      ],
      price: '1500000',
      stock: 12,
      rating: '4.5'
    },
  ],
}

export default sampleData
