import pandaAPIInstance from "./pandaApiInstance";

export async function fetchProductComments(
  productId,
  { cursor, limit = 10 } = {}
) {
  if (!productId) {
    throw new Error("productId is required");
  }
  const response = await pandaAPIInstance.get(
    `/products/${productId}/comments`,
    {
      params: {
        limit,
        ...(cursor ? { cursor } : {}),
      },
    }
  );

  return response.data;
}

export async function updateComment(commentId, content) {
  const response = await pandaAPIInstance.patch(`/comments/${commentId}`, {
    content,
  });
  return response.data;
}

export async function deleteComment(commentId) {
  await pandaAPIInstance.delete(`/comments/${commentId}`);
}
