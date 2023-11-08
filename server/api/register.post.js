import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, email, password, name, profileImage } = body;

  if (!username || !email || !password || !name) {
    return {
      message: "Invalid Payload !!",
    };
  }

  const userData = {
    username,
    email,
    password,
    name,
    profileImage,
  };
  const prisma = new PrismaClient();
  const register_user = await prisma.user
    .create({
      data: {
        ...userData,
        password: bcrypt.hashSync(userData.password, 10),
      },
    })
    .then((user) => {
      return user;
    })
    .catch((error) => {
      return error;
    });

  if (register_user) {
    return {
      register_user: register_user,
    };
  }
});
