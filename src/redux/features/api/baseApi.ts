import { authKey } from "@/contants/common";
import { deleteCookies } from "@/services/deleteCookies";
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { logOutUser } from "../auth/authSlice";

interface ExtraOptions {
  headers?: Record<string, string>;
}

interface ErrorData {
  message: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = getFromLocalStorage(authKey.accessToken);

    if (token) {
      headers.set("authorization", `Barer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<FetchArgs, BaseQueryApi, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions: ExtraOptions
): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if ((result?.error?.data as ErrorData)?.message === "jwt expired") {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();

    if (data?.data?.accessToken) {
      setToLocalStorage({ key: authKey.accessToken, token: data.data.accessToken });

      // Update the headers within extraOptions
      extraOptions.headers = {
        ...extraOptions.headers,
        authorization: `Barer ${data.data.accessToken}`,
      };

      // Re-running the base query with updated headers
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOutUser());
      removeFromLocalStorage(authKey.accessToken);
      deleteCookies([authKey.refreshToken]);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: ["Products", "Orders", "Brands", "Auth"],
});

export default baseApi;
