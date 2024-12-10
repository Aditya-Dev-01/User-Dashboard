export const users = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  username: `user${index + 1}`,
  email: `user${index + 1}@example.com`,
  role: index === 0 ? "admin" : "user",
}));
