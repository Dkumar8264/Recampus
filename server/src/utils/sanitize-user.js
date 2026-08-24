export const sanitizeUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  branch: user.branch,
  year: user.year,
  profilePicture: user.profilePicture,
  role: user.role,
  emailVerified: user.emailVerified,
  createdAt: user.createdAt
});
