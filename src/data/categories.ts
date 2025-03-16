const categories = [
  {
    name: "Electronics",
    subcategories: [
      {
        name: "Computers & Accessories",
        subcategories: [
          { name: "Laptops", href: "electronics-computers-laptops" },
          { name: "Desktops", href: "electronics-computers-desktops" },
          {
            name: "Computer Components",
            href: "electronics-computers-components",
          },
          { name: "Monitors", href: "electronics-computers-monitors" },
          {
            name: "Printers & Scanners",
            href: "electronics-computers-printers",
          },
        ],
      },
      {
        name: "Mobile & Accessories",
        subcategories: [
          { name: "Smartphones", href: "electronics-mobile-smartphones" },
          { name: "Tablets", href: "electronics-mobile-tablets" },
          { name: "Cases & Covers", href: "electronics-mobile-cases" },
          { name: "Chargers & Cables", href: "electronics-mobile-chargers" },
        ],
      },
      {
        name: "Audio & Video",
        subcategories: [
          { name: "Headphones", href: "electronics-audio-headphones" },
          { name: "Speakers", href: "electronics-audio-speakers" },
          { name: "Televisions", href: "electronics-video-tvs" },
          { name: "Cameras", href: "electronics-video-cameras" },
        ],
      },
    ],
  },
  {
    name: "Fashion",
    subcategories: [
      {
        name: "Men's Fashion",
        subcategories: [
          { name: "Clothing", href: "fashion-men-clothing" },
          { name: "Footwear", href: "fashion-men-footwear" },
          { name: "Accessories", href: "fashion-men-accessories" },
          { name: "Watches", href: "fashion-men-watches" },
        ],
      },
      {
        name: "Women's Fashion",
        subcategories: [
          { name: "Clothing", href: "fashion-women-clothing" },
          { name: "Footwear", href: "fashion-women-footwear" },
          { name: "Jewelry", href: "fashion-women-jewelry" },
          { name: "Bags & Purses", href: "fashion-women-bags" },
        ],
      },
      {
        name: "Kids & Babies",
        subcategories: [
          { name: "Boys Fashion", href: "fashion-kids-boys" },
          { name: "Girls Fashion", href: "fashion-kids-girls" },
          { name: "Baby Care", href: "fashion-kids-baby-care" },
        ],
      },
    ],
  },
  {
    name: "Home & Kitchen",
    subcategories: [
      {
        name: "Furniture",
        subcategories: [
          { name: "Living Room", href: "home-furniture-living-room" },
          { name: "Bedroom", href: "home-furniture-bedroom" },
          { name: "Kitchen & Dining", href: "home-furniture-kitchen" },
        ],
      },
      {
        name: "Appliances",
        subcategories: [
          { name: "Large Appliances", href: "home-appliances-large" },
          { name: "Small Appliances", href: "home-appliances-small" },
          { name: "Smart Home", href: "home-appliances-smart-home" },
        ],
      },
      {
        name: "Home Decor",
        subcategories: [
          { name: "Lighting", href: "home-decor-lighting" },
          { name: "Wall Art", href: "home-decor-wall-art" },
          { name: "Seasonal Decor", href: "home-decor-seasonal" },
        ],
      },
    ],
  },
  {
    name: "Health & Beauty",
    subcategories: [
      {
        name: "Skincare",
        subcategories: [
          { name: "Face Care", href: "beauty-skincare-face" },
          { name: "Body Care", href: "beauty-skincare-body" },
          { name: "Sun Protection", href: "beauty-skincare-sun-care" },
        ],
      },
      {
        name: "Haircare",
        subcategories: [
          { name: "Shampoos", href: "beauty-haircare-shampoo" },
          { name: "Styling Products", href: "beauty-haircare-styling" },
          { name: "Hair Accessories", href: "beauty-haircare-accessories" },
        ],
      },
      {
        name: "Makeup",
        subcategories: [
          { name: "Face Makeup", href: "beauty-makeup-face" },
          { name: "Eye Makeup", href: "beauty-makeup-eyes" },
          { name: "Lips", href: "beauty-makeup-lips" },
        ],
      },
    ],
  },
  {
    name: "Sports & Outdoors",
    subcategories: [
      {
        name: "Fitness",
        subcategories: [
          { name: "Exercise Equipment", href: "sports-fitness-equipment" },
          { name: "Yoga", href: "sports-fitness-yoga" },
          { name: "Supplements", href: "sports-fitness-supplements" },
        ],
      },
      {
        name: "Outdoor Recreation",
        subcategories: [
          { name: "Camping Gear", href: "sports-outdoor-camping" },
          { name: "Fishing", href: "sports-outdoor-fishing" },
          { name: "Cycling", href: "sports-outdoor-cycling" },
        ],
      },
      {
        name: "Team Sports",
        subcategories: [
          { name: "Football", href: "sports-team-football" },
          { name: "Basketball", href: "sports-team-basketball" },
          { name: "Cricket", href: "sports-team-cricket" },
        ],
      },
    ],
  },
  {
    name: "Automotive",
    subcategories: [
      {
        name: "Car Parts",
        subcategories: [
          { name: "Engine Components", href: "automotive-parts-engine" },
          { name: "Braking System", href: "automotive-parts-brakes" },
          { name: "Suspension", href: "automotive-parts-suspension" },
        ],
      },
      {
        name: "Car Care",
        subcategories: [
          { name: "Cleaning Products", href: "automotive-care-cleaning" },
          { name: "Maintenance Tools", href: "automotive-care-tools" },
          { name: "Car Covers", href: "automotive-care-covers" },
        ],
      },
      {
        name: "Car Electronics",
        subcategories: [
          { name: "GPS Navigation", href: "automotive-electronics-gps" },
          { name: "Car Audio", href: "automotive-electronics-audio" },
          { name: "Dash Cams", href: "automotive-electronics-dashcams" },
        ],
      },
    ],
  },
  {
    name: "Industrial & Scientific",
    subcategories: [
      {
        name: "Industrial Tools",
        subcategories: [
          { name: "Power Tools", href: "industrial-tools-power" },
          { name: "Hand Tools", href: "industrial-tools-hand" },
          { name: "Safety Equipment", href: "industrial-tools-safety" },
        ],
      },
      {
        name: "Scientific Instruments",
        subcategories: [
          { name: "Lab Equipment", href: "industrial-scientific-lab" },
          {
            name: "Measurement Tools",
            href: "industrial-scientific-measurement",
          },
          {
            name: "Optical Instruments",
            href: "industrial-scientific-optical",
          },
        ],
      },
    ],
  },
  {
    name: "Digital Services",
    subcategories: [
      {
        name: "Software",
        subcategories: [
          {
            name: "Productivity Tools",
            href: "digital-software-productivity",
          },
          { name: "Design Software", href: "digital-software-design" },
          { name: "Security Software", href: "digital-software-security" },
        ],
      },
      {
        name: "Digital Products",
        subcategories: [
          { name: "eBooks", href: "digital-products-ebooks" },
          { name: "Courses", href: "digital-products-courses" },
          { name: "Templates", href: "digital-products-templates" },
        ],
      },
      {
        name: "Professional Services",
        subcategories: [
          { name: "Web Development", href: "digital-services-web" },
          { name: "Graphic Design", href: "digital-services-design" },
          { name: "Digital Marketing", href: "digital-services-marketing" },
        ],
      },
    ],
  },
  {
    name: "More Categories",
    subcategories: [
      {
        name: "Books & Stationery",
        subcategories: [
          { name: "Fiction", href: "more-books-fiction" },
          { name: "Educational", href: "more-books-educational" },
          { name: "Office Supplies", href: "more-stationery-office" },
        ],
      },
      {
        name: "Pet Supplies",
        subcategories: [
          { name: "Dog Supplies", href: "more-pets-dogs" },
          { name: "Cat Supplies", href: "more-pets-cats" },
          { name: "Aquarium", href: "more-pets-aquarium" },
        ],
      },
      {
        name: "Specialty Stores",
        subcategories: [
          { name: "Handmade Crafts", href: "more-specialty-handmade" },
          { name: "Vintage Items", href: "more-specialty-vintage" },
          { name: "Local Products", href: "more-specialty-local" },
        ],
      },
    ],
  },
];

export default categories;
