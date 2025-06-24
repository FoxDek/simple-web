// import { verifyRefreshToken } from '@/utils/token.utils';
// import { NextApiRequest, NextApiResponse } from 'next';


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const refreshToken = req.cookies.refreshToken;

//   if (!refreshToken) return res.status(401).json({ message: "Нет refresh токена" });

//   try {
//     const payload = verifyRefreshToken(refreshToken); // например, jwt.verify
//     const newAccessToken = createAccessToken({ userId: payload.userId });

//     res.setHeader("Set-Cookie", [
//       `accessToken=${newAccessToken}; Path=/; HttpOnly; Secure; SameSite=Strict`,
//     ]);

//     return res.status(200).json({ accessToken: newAccessToken });
//   } catch (err) {
//     console.log(err);
//     return res.status(401).json({ message: "Refresh токен недействителен" });
//   }
// }
