export const phone_display = "(872) 272-2155";
export const phone_e164 = "+18722722155";

export const BUSINESS = {
  name: "Lakeshore Outdoor Services",
  phone: phone_e164,
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
