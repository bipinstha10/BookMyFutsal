export const cookieOptions = () => {
  // const isProd = process.env.NODE_ENV === "production";
  // const isProd = false;

  return {
    httpOnly: true,
    secure: false,
    sameSite: "lax" as const,
    path: "/",
  };
};
