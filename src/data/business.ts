export const business = {
  name: "Lakeshore Outdoor Services",
  phone: "+17732366224",
  phoneDisplay: "(773) 236-6224",
  email: "lakeshoreoutdoorteam@gmail.com",
  // We’ll operate as a service-area business on the site until we confirm a street address.
  address: {
    street: "",
    city: "Chicago",
    region: "IL",
    postal: "",
    country: "US",
  },
  site: "https://lakeshoreoutdoor.com",
  serviceAreas: ["Chicago", "Lake County", "North Shore", "Northwest Suburbs"],
} as const;

export type Business = typeof business;
