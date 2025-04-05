import axios from 'axios';

export const DIETARY_PREFERENCES = [
  { value: "gluten_free", label: "Gluten Free" },
  { value: "vegan", label: "Vegan" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "halal", label: "Halal" },
  { value: "kosher", label: "Kosher" },
  { value: "allergy_friendly", label: "Allergy Friendly" }
];

export const searchYelp = async (term, location) => {
  if (!term || !location) {
    throw new Error('Term and location are required');
  }

  // Since this is a frontend-only app, we'll use a mock implementation for now
  // In a real app, this would call your backend API
  console.log(`Searching for ${term} in ${location}`);

  // For now we'll return mock data
  // This would normally be replaced with an actual API call
  return mockYelpResponse(term, location);
};

// This is temporary and would be replaced with a real API call
const mockYelpResponse = async (term, location) => {
  // This simulates network latency
  await new Promise(r => setTimeout(r, 800));

  // Simple filtering based on search term
  const lowerTerm = term.toLowerCase();
  return MOCK_RESTAURANTS.filter(restaurant => {
    const matchesTerm = restaurant.name.toLowerCase().includes(lowerTerm) ||
      restaurant.categories.some(cat => cat.alias.toLowerCase().includes(lowerTerm) || 
                                       cat.title.toLowerCase().includes(lowerTerm));

    // Simple location matching
    const matchesLocation = restaurant.location.city.toLowerCase().includes(location.toLowerCase()) ||
                           restaurant.location.state.toLowerCase().includes(location.toLowerCase());

    return matchesTerm && matchesLocation;
  });
};

// Mock data for development
const MOCK_RESTAURANTS = [
  {
    id: "1",
    name: "Green Sprout Vegan Café",
    image_url: "https://images.unsplash.com/photo-1556742049-0a8d799e4a7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    url: "https://www.yelp.com/biz/green-sprout",
    review_count: 302,
    rating: 4.7,
    price: "$$",
    location: {
      address1: "123 Health St",
      city: "San Francisco",
      state: "CA",
      zip_code: "94110",
      display_address: ["123 Health St", "San Francisco, CA 94110"]
    },
    phone: "+14155551234",
    categories: [
      { alias: "vegan", title: "Vegan" },
      { alias: "vegetarian", title: "Vegetarian" },
      { alias: "gluten_free", title: "Gluten Free" }
    ],
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194
    },
    transactions: ["pickup", "delivery"]
  },
  {
    id: "2",
    name: "Pure Kitchen",
    image_url: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    url: "https://www.yelp.com/biz/pure-kitchen",
    review_count: 189,
    rating: 4.5,
    price: "$$",
    location: {
      address1: "456 Veggie Ave",
      city: "San Francisco",
      state: "CA",
      zip_code: "94114",
      display_address: ["456 Veggie Ave", "San Francisco, CA 94114"]
    },
    phone: "+14155555678",
    categories: [
      { alias: "vegetarian", title: "Vegetarian" },
      { alias: "gluten_free", title: "Gluten Free" }
    ],
    coordinates: {
      latitude: 37.7599,
      longitude: -122.4148
    },
    transactions: ["delivery"]
  },
  {
    id: "3",
    name: "Halal Grill House",
    image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
    url: "https://www.yelp.com/biz/halal-grill-house",
    review_count: 215,
    rating: 4.3,
    price: "$$",
    location: {
      address1: "789 Halal Blvd",
      city: "San Francisco",
      state: "CA",
      zip_code: "94103",
      display_address: ["789 Halal Blvd", "San Francisco, CA 94103"]
    },
    phone: "+14155559012",
    categories: [
      { alias: "halal", title: "Halal" },
      { alias: "middleeastern", title: "Middle Eastern" }
    ],
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194
    },
    transactions: ["pickup", "delivery"]
  },
  {
    id: "4",
    name: "Kosher Delights",
    image_url: "https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1148&q=80",
    url: "https://www.yelp.com/biz/kosher-delights",
    review_count: 178,
    rating: 4.4,
    price: "$$$",
    location: {
      address1: "101 Kosher Way",
      city: "San Francisco",
      state: "CA",
      zip_code: "94118",
      display_address: ["101 Kosher Way", "San Francisco, CA 94118"]
    },
    phone: "+14155553456",
    categories: [
      { alias: "kosher", title: "Kosher" },
      { alias: "delis", title: "Delis" }
    ],
    coordinates: {
      latitude: 37.7831,
      longitude: -122.4634
    },
    transactions: ["pickup"]
  },
  {
    id: "5",
    name: "Allergy Safe Bistro",
    image_url: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80",
    url: "https://www.yelp.com/biz/allergy-safe-bistro",
    review_count: 156,
    rating: 4.6,
    price: "$$",
    location: {
      address1: "222 Allergen Free St",
      city: "San Francisco",
      state: "CA",
      zip_code: "94123",
      display_address: ["222 Allergen Free St", "San Francisco, CA 94123"]
    },
    phone: "+14155557890",
    categories: [
      { alias: "allergy_friendly", title: "Allergy Friendly" },
      { alias: "gluten_free", title: "Gluten Free" }
    ],
    coordinates: {
      latitude: 37.8021,
      longitude: -122.4382
    },
    transactions: ["pickup", "delivery"]
  },
  {
    id: "6",
    name: "GF Pasta House",
    image_url: "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
    url: "https://www.yelp.com/biz/gf-pasta-house",
    review_count: 221,
    rating: 4.2,
    price: "$$",
    location: {
      address1: "333 Pasta Lane",
      city: "San Francisco",
      state: "CA",
      zip_code: "94133",
      display_address: ["333 Pasta Lane", "San Francisco, CA 94133"]
    },
    phone: "+14155552345",
    categories: [
      { alias: "gluten_free", title: "Gluten Free" },
      { alias: "italian", title: "Italian" }
    ],
    coordinates: {
      latitude: 37.7989,
      longitude: -122.4071
    },
    transactions: ["pickup", "delivery"]
  }
];
