import pandaAPIInstance from "./pandaApiInstance";

export async function fetchProducts(
  page = 1,
  limit = 10,
  keyword = "",
  orderBy = "recent"
) {
  const params = { page, limit, keyword, orderBy };
  const response = await pandaAPIInstance.get("/products", { params });
  return response.data;
}

export async function fetchBestProducts() {
  const response = await pandaAPIInstance.get("/products", {
    params: { page: 1, limit: 4, keyword: "", orderBy: "favorite" },
  });
  return response.data;
}
