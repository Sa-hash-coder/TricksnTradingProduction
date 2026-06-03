export type Country = {
  country_id: string;
  country_name: string;
  country_slug: string;
  country_code: string;
  region: string;
  is_active: string;
  is_featured?: string;
  map_x?: string | number;
  map_y?: string | number;
};

export type ApiResponse = {
  success: boolean;
  data?: Country[];
  message?: string;
  error?: string;
};

const FALLBACK_COUNTRIES: Country[] = [
  {
    country_id: "fallback-uae",
    country_name: "UAE",
    country_slug: "uae",
    country_code: "AE",
    region: "GCC",
    is_active: "YES",
    is_featured: "YES",
  },
  {
    country_id: "fallback-russia",
    country_name: "Russia",
    country_slug: "russia",
    country_code: "RU",
    region: "Europe",
    is_active: "YES",
    is_featured: "YES",
  },
  {
    country_id: "fallback-oman",
    country_name: "Oman",
    country_slug: "oman",
    country_code: "OM",
    region: "GCC",
    is_active: "YES",
    is_featured: "YES",
  },
  {
    country_id: "fallback-saudi-arabia",
    country_name: "Saudi Arabia",
    country_slug: "saudi-arabia",
    country_code: "SA",
    region: "GCC",
    is_active: "YES",
    is_featured: "YES",
  },
];

export async function fetchCountries(): Promise<Country[]> {
  const apiUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_API_URL?.trim();

  if (!apiUrl) {
    console.warn("Missing NEXT_PUBLIC_APPS_SCRIPT_API_URL in .env.local");
    return FALLBACK_COUNTRIES;
  }

  try {
    const url = new URL(apiUrl);
    url.searchParams.set("action", "countries");

    const response = await fetch(url.toString(), {
      method: "GET",
      cache: "no-store",
      redirect: "follow",
    });

    if (!response.ok) {
      console.warn(`Countries API failed with status ${response.status}`);
      return FALLBACK_COUNTRIES;
    }

    const result: ApiResponse = await response.json();

    if (!result.success) {
      console.warn("Countries API returned success:false", result);
      return FALLBACK_COUNTRIES;
    }

    return Array.isArray(result.data) && result.data.length > 0
      ? result.data
      : FALLBACK_COUNTRIES;
  } catch (error) {
    console.warn("Failed to fetch countries:", error);
    return FALLBACK_COUNTRIES;
  }
}