import { publicAxiosInstance } from "./axiosService";

export async function handleFetchUserImagesList(params) {
  try {
    const res = await publicAxiosInstance.get("photos/random", { params });
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}
