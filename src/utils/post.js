export const isLiked = (likes, userId) => likes.some(id => id === userId);
export const isDel = (postId) => postId.some(id => id === postId);