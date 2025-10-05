export const business = {
  name: "Lakeshore Outdoor Services",
  phone: "+1-847-555-1234",
  email: "hello@lakeshoreoutdoor.com",
  address: {
    street: "1250 N Green Bay Rd",
    city: "Lake Forest",
    region: "IL",
    postal: "60045",
    country: "US",
  },
  site: "https://lakeshoreoutdoor.com",
} as const;

export type Business = typeof business;
