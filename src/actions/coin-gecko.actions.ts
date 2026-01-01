"use server";

import qs from "query-string";

import { ApiError } from "@/errors/api-error";

const BASE_URL = process.env.COINGECKO_BASE_URL;
const API_KEY = process.env.COINGECKO_API_KEY;

if (!BASE_URL) throw new Error("Could not get base url");
if (!API_KEY) throw new Error("Could not get api key");

export async function fetcher<T>(
  endpoint: string,
  params?: QueryParams,
  revalidate = 60
): Promise<T> {
  const url = qs.stringifyUrl(
    {
      url: `${BASE_URL}/${endpoint}`,
      query: params,
    },
    { skipEmptyString: true, skipNull: true }
  );

  let response: Response;

  try {
    response = await fetch(url, {
      headers: {
        "x-cg-demo-api-key": API_KEY,
        "Content-Type": "application/json",
      } as Record<string, string>,
      next: { revalidate },
    });
  } catch (cause) {
    // Network / DNS / timeout / fetch-level failure
    throw new ApiError({
      message: "Network error while calling CoinGecko",
      status: -1,
      endpoint,
      url,
      cause,
    });
  }

  if (!response.ok) {
    let errorBody: unknown;

    try {
      errorBody = await response.json();
    } catch {
      errorBody = await response.text().catch(() => undefined);
    }

    throw new ApiError({
      message: "CoinGecko API responded with an error",
      status: response.status,
      endpoint,
      url,
      body: errorBody,
    });
  }

  try {
    return (await response.json()) as T;
  } catch (cause) {
    throw new ApiError({
      message: "Failed to parse JSON response",
      status: response.status,
      endpoint,
      url,
      cause,
    });
  }
}

export async function getPools(
  id: string,
  network?: string | null,
  contractAddress?: string | null
): Promise<PoolData> {
  const fallback: PoolData = {
    id: "",
    address: "",
    name: "",
    network: "",
  };

  if (network && contractAddress) {
    try {
      const poolData = await fetcher<{ data: PoolData[] }>(
        `/onchain/networks/${network}/tokens/${contractAddress}/pools`
      );

      return poolData.data?.[0] ?? fallback;
    } catch (error) {
      console.log(error);
      return fallback;
    }
  }

  try {
    const poolData = await fetcher<{ data: PoolData[] }>(
      "/onchain/search/pools",
      { query: id }
    );

    return poolData.data?.[0] ?? fallback;
  } catch {
    return fallback;
  }
}
