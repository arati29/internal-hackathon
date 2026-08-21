export interface City {
  id: string;
  name: string;
  state: string;
  image: string;
  tagline: string;
  description: string;
  bestSeason: string;
  heritageSites: HeritageSite[];
}

export interface HeritageSite {
  id: string;
  name: string;
  city: string;
  image: string;
  rating: number;
  visits: string;
  era: string;
  description: string;
  entryFee: number;
  openTime: string;
  closeTime: string;
  tags: string[];
  lat: number;
  lng: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  artisan: string;
  region: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  inStock: number;
  badge?: string;
}

export const cities: City[] = [
  {
    id: 'agra',
    name: 'Agra',
    state: 'Uttar Pradesh',
    image: 'https://images.pexels.com/photos/11948442/pexels-photo-11948442.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tagline: 'The City of the Taj',
    description: 'Home to the iconic Taj Mahal, Agra is a Mughal-era city brimming with architectural marvels and rich history along the banks of the Yamuna.',
    bestSeason: 'October to March',
    heritageSites: [
      {
        id: 'taj-mahal',
        name: 'Taj Mahal',
        city: 'Agra',
        image: 'https://images.pexels.com/photos/17440745/pexels-photo-17440745.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.9,
        visits: '6M+',
        era: 'Mughal (1632)',
        description: 'An ivory-white marble mausoleum commissioned by Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal.',
        entryFee: 1100,
        openTime: '06:00',
        closeTime: '18:30',
        tags: ['UNESCO', 'Wonder of the World', 'Mughal Architecture'],
        lat: 27.1751,
        lng: 78.0421,
      },
      {
        id: 'agra-fort',
        name: 'Agra Fort',
        city: 'Agra',
        image: 'https://images.pexels.com/photos/19195969/pexels-photo-19195969.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.7,
        visits: '2M+',
        era: 'Mughal (1565)',
        description: 'A historical fort in the city of Agra, the capital of the Mughal Empire until 1638. Features stunning marble inlay work and red sandstone architecture.',
        entryFee: 550,
        openTime: '06:00',
        closeTime: '18:00',
        tags: ['UNESCO', 'Mughal Architecture', 'Fort'],
        lat: 27.1751,
        lng: 78.0421,
      },
    ],
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    image: 'https://images.pexels.com/photos/12323903/pexels-photo-12323903.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tagline: 'The Pink City',
    description: 'The capital of Rajasthan, known for its pink-hued buildings, majestic forts, palaces, and vibrant bazaars filled with handicrafts and jewelry.',
    bestSeason: 'November to February',
    heritageSites: [
      {
        id: 'hawa-mahal',
        name: 'Hawa Mahal',
        city: 'Jaipur',
        image: 'https://images.pexels.com/photos/12323903/pexels-photo-12323903.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.6,
        visits: '3M+',
        era: 'Rajput (1799)',
        description: 'A palace with a stunning honeycomb facade of 953 small windows, allowing royal ladies to observe street festivals while remaining unseen.',
        entryFee: 200,
        openTime: '09:00',
        closeTime: '17:00',
        tags: ['UNESCO', 'Rajput Architecture', 'Palace'],
        lat: 26.9239,
        lng: 75.8267,
      },
      {
        id: 'city-palace-jaipur',
        name: 'City Palace',
        city: 'Jaipur',
        image: 'https://images.pexels.com/photos/32261804/pexels-photo-32261804.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.7,
        visits: '2.5M+',
        era: 'Rajput (1732)',
        description: 'A complex of courtyards, gardens, and buildings blending Rajput and Mughal architecture, still serving as the royal residence.',
        entryFee: 300,
        openTime: '09:30',
        closeTime: '17:00',
        tags: ['UNESCO', 'Rajput Architecture', 'Palace', 'Museum'],
        lat: 26.9258,
        lng: 75.8267,
      },
    ],
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    image: 'https://images.pexels.com/photos/38857186/pexels-photo-38857186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tagline: 'The Spiritual Capital',
    description: 'One of the oldest continuously inhabited cities in the world, sacred ghats along the Ganges, mesmerizing aarti ceremonies, and ancient temples.',
    bestSeason: 'October to March',
    heritageSites: [
      {
        id: 'dashashwamedh-ghat',
        name: 'Dashashwamedh Ghat',
        city: 'Varanasi',
        image: 'https://images.pexels.com/photos/38857186/pexels-photo-38857186.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.8,
        visits: '4M+',
        era: 'Ancient',
        description: 'The most spectacular ghat of Varanasi, where the daily Ganga Aarti draws thousands of pilgrims and visitors each evening at sunset.',
        entryFee: 0,
        openTime: '05:00',
        closeTime: '21:00',
        tags: ['Spiritual', 'Ghats', 'Ganga Aarti'],
        lat: 25.3055,
        lng: 83.0106,
      },
    ],
  },
  {
    id: 'kerala',
    name: 'Kerala',
    state: 'Kerala',
    image: 'https://images.pexels.com/photos/17928231/pexels-photo-17928231.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tagline: "God's Own Country",
    description: 'Lush backwaters, serene houseboats, ancient temples, and colonial heritage blend seamlessly with nature in this tropical paradise.',
    bestSeason: 'September to March',
    heritageSites: [
      {
        id: 'backwaters',
        name: 'Kerala Backwaters',
        city: 'Alleppey',
        image: 'https://images.pexels.com/photos/17928231/pexels-photo-17928231.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.8,
        visits: '1.5M+',
        era: 'Natural',
        description: 'A network of tranquil canals, rivers, and lakes best explored on traditional houseboats called kettuvallams.',
        entryFee: 0,
        openTime: 'All day',
        closeTime: 'All day',
        tags: ['Natural Heritage', 'Houseboat', 'Backwaters'],
        lat: 9.4986,
        lng: 76.3393,
      },
    ],
  },
  {
    id: 'mysore',
    name: 'Mysore',
    state: 'Karnataka',
    image: 'https://images.pexels.com/photos/38192480/pexels-photo-38192480.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tagline: 'The City of Palaces',
    description: 'Famous for the dazzling Mysore Palace, silk sarees, and sandalwood, this royal city showcases the grandeur of the Wodeyar dynasty.',
    bestSeason: 'October to March',
    heritageSites: [
      {
        id: 'mysore-palace',
        name: 'Mysore Palace',
        city: 'Mysore',
        image: 'https://images.pexels.com/photos/38192480/pexels-photo-38192480.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.8,
        visits: '3.5M+',
        era: 'Indo-Saracenic (1912)',
        description: 'A breathtaking palace with Indo-Saracenic architecture, illuminated by 97,000 lights on Sundays and during festivals.',
        entryFee: 100,
        openTime: '10:00',
        closeTime: '17:30',
        tags: ['Royal Heritage', 'Palace', 'Illumination'],
        lat: 12.3055,
        lng: 76.6552,
      },
    ],
  },
  {
    id: 'hampi',
    name: 'Hampi',
    state: 'Karnataka',
    image: 'https://images.pexels.com/photos/38605003/pexels-photo-38605003.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tagline: 'The Lost Kingdom',
    description: 'The ruins of the Vijayanagara Empire, a UNESCO World Heritage Site with stunning stone temples, boulders, and ancient market streets.',
    bestSeason: 'October to February',
    heritageSites: [
      {
        id: 'virupaksha-temple',
        name: 'Virupaksha Temple',
        city: 'Hampi',
        image: 'https://images.pexels.com/photos/38605003/pexels-photo-38605003.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.7,
        visits: '1M+',
        era: 'Vijayanagara (7th century)',
        description: 'A living temple dedicated to Lord Shiva, part of the Group of Monuments at Hampi, with stunning carvings and a 50-meter gopuram.',
        entryFee: 40,
        openTime: '06:00',
        closeTime: '18:00',
        tags: ['UNESCO', 'Temple', 'Vijayanagara Architecture'],
        lat: 15.3350,
        lng: 76.4600,
      },
    ],
  },
  {
    id: 'khajuraho',
    name: 'Khajuraho',
    state: 'Madhya Pradesh',
    image: 'https://images.pexels.com/photos/38836507/pexels-photo-38836507.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tagline: 'Temples of Art',
    description: 'Famous for its stunning Nagara-style temple architecture and intricate sculptures, a UNESCO World Heritage Site.',
    bestSeason: 'October to March',
    heritageSites: [
      {
        id: 'khajuraho-temples',
        name: 'Khajuraho Group of Monuments',
        city: 'Khajuraho',
        image: 'https://images.pexels.com/photos/38836507/pexels-photo-38836507.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.7,
        visits: '800K+',
        era: 'Chandela (950-1050)',
        description: 'A group of Hindu and Jain temples renowned for their exquisite nagara-style architectural symbolism and erotic sculptures.',
        entryFee: 600,
        openTime: '06:00',
        closeTime: '18:00',
        tags: ['UNESCO', 'Temple', 'Nagara Architecture'],
        lat: 24.8318,
        lng: 79.9199,
      },
    ],
  },
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'Delhi',
    image: 'https://images.pexels.com/photos/4727066/pexels-photo-4727066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    tagline: 'The Capital Heritage',
    description: 'A blend of ancient and modern, featuring Mughal monuments, colonial architecture, and the stunning Lotus Temple.',
    bestSeason: 'October to March',
    heritageSites: [
      {
        id: 'lotus-temple',
        name: 'Lotus Temple',
        city: 'Delhi',
        image: 'https://images.pexels.com/photos/4727066/pexels-photo-4727066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
        rating: 4.6,
        visits: '4M+',
        era: 'Modern (1986)',
        description: 'A Bahai House of Worship shaped like a lotus flower, one of the most visited buildings in the world.',
        entryFee: 0,
        openTime: '09:00',
        closeTime: '17:30',
        tags: ['Modern Heritage', 'Bahai', 'Architecture'],
        lat: 28.5535,
        lng: 77.2588,
      },
    ],
  },
];

export const allHeritageSites: HeritageSite[] = cities.flatMap((c) => c.heritageSites);

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Hand-painted Blue Pottery Vase',
    category: 'Pottery',
    artisan: 'Mohammed Yusuf',
    region: 'Jaipur, Rajasthan',
    price: 2499,
    image: 'https://images.pexels.com/photos/18977427/pexels-photo-18977427.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.8,
    reviews: 142,
    description: 'Traditional Jaipur blue pottery vase with intricate hand-painted floral patterns. Made using natural quartz powder.',
    inStock: 12,
    badge: 'Bestseller',
  },
  {
    id: 'p2',
    name: 'Kanchipuram Silk Saree',
    category: 'Textiles',
    artisan: 'Lakshmi Weavers',
    region: 'Kanchipuram, Tamil Nadu',
    price: 12999,
    image: 'https://images.pexels.com/photos/10317127/pexels-photo-10317127.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.9,
    reviews: 89,
    description: 'Pure mulberry silk saree with traditional zari border and temple motif pallu, handwoven by master weavers.',
    inStock: 5,
    badge: 'Premium',
  },
  {
    id: 'p3',
    name: 'Madhubani Folk Painting',
    category: 'Art',
    artisan: 'Sunita Devi',
    region: 'Mithila, Bihar',
    price: 3499,
    image: 'https://images.pexels.com/photos/29625840/pexels-photo-29625840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.7,
    reviews: 56,
    description: 'Authentic Madhubani painting depicting traditional folklore using natural pigments on handmade paper.',
    inStock: 8,
  },
  {
    id: 'p4',
    name: 'Marble Inlay Coaster Set',
    category: 'Stone Craft',
    artisan: 'Imran Khan',
    region: 'Agra, Uttar Pradesh',
    price: 1799,
    image: 'https://images.pexels.com/photos/19195969/pexels-photo-19195969.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.8,
    reviews: 203,
    description: 'Set of 4 marble coasters with semi-precious stone inlay in the Pietra Dura tradition of the Taj Mahal.',
    inStock: 20,
    badge: 'Bestseller',
  },
  {
    id: 'p5',
    name: 'Traditional Brass Jewelry',
    category: 'Jewelry',
    artisan: 'Ramesh Soni',
    region: 'Mysore, Karnataka',
    price: 4999,
    image: 'https://images.pexels.com/photos/7509916/pexels-photo-7509916.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.6,
    reviews: 78,
    description: 'Handcrafted brass necklace set with traditional South Indian temple jewelry design and gold-tone finish.',
    inStock: 7,
  },
  {
    id: 'p6',
    name: 'Rajasthani Bandhani Dupatta',
    category: 'Textiles',
    artisan: 'Geeta Sharma',
    region: 'Jodhpur, Rajasthan',
    price: 1299,
    image: 'https://images.pexels.com/photos/4566670/pexels-photo-4566670.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.5,
    reviews: 167,
    description: 'Vibrant tie-and-dye Bandhani dupatta in traditional Rajasthani colors with mirror work embellishments.',
    inStock: 25,
  },
  {
    id: 'p7',
    name: 'Handcrafted Terracotta Diyas',
    category: 'Pottery',
    artisan: 'Dhyey Sharma',
    region: 'Khurja, Uttar Pradesh',
    price: 599,
    image: 'https://images.pexels.com/photos/37808898/pexels-photo-37808898.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.7,
    reviews: 312,
    description: 'Set of 6 handcrafted terracotta diyas with hand-painted designs, perfect for festive decorations.',
    inStock: 50,
  },
  {
    id: 'p8',
    name: 'Organic Spice Box (Masala Dabba)',
    category: 'Spices',
    artisan: 'Kerala Spice Co.',
    region: 'Kochi, Kerala',
    price: 899,
    image: 'https://images.pexels.com/photos/36870366/pexels-photo-36870366.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    rating: 4.9,
    reviews: 421,
    description: 'Traditional wooden spice box with 7 organic Kerala spices including cardamom, cinnamon, and cloves.',
    inStock: 35,
    badge: 'Bestseller',
  },
];

export const productCategories = ['All', 'Pottery', 'Textiles', 'Art', 'Stone Craft', 'Jewelry', 'Spices'];
