export const BUSINESS = {
  name: "Lakeshore Outdoor Services",
  phone: "+1-773-236-6224",
  email: "lakeshoreoutdoorteam@gmail.com",
  site: "https://lakeshoreoutdoor.com",
  // service-area business => no street address
  address: {
    city: "Chicago",
    region: "IL",
    country: "US",
  },
  areasServed: [
    "Hyde Park",
    "South Shore",
    "Bronzeville",
    "Roseland",
    "Pullman",
    "Altgeld Gardens",
    "Lakeview",
    "Lincoln Park",
    "Evanston",
    "Wilmette",
    "Winnetka",
  ],
} as const;

export type Business = typeof BUSINESS;
