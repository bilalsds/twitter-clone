import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { generateToken } from "../token/jwt";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, email, password } = body;
  let exist_user_data;

  const userData = {
    username,
    email,
    password,
  };

  const prisma = new PrismaClient();

  const login = await prisma.user.findMany();

  // Match Password

  async function findUserMatch(login) {
    for (const user of login) {
      console.log("user.name", user.username);
      console.log("user_data.name", username);

      if (user.username == username) {
        const isPasswordMatch = await bcrypt.compare(
          userData.password,
          user.password
        );

        console.log("isPasswordMatchisPasswordMatch", isPasswordMatch);
        if (isPasswordMatch) {
          exist_user_data = user;
          return true; // Found a matching user
        }
      }
    }
    return false; // No matching user found
  }

  // Check User Authenticate or not

  if (login) {
    const user_exist = await findUserMatch(login);

    // Generate Token

    const secret = useRuntimeConfig().jwtsecret;

    const token = generateToken(exist_user_data, secret);

    if (user_exist) {
      return {
        user_login: exist_user_data,
        status: "Verified",
        statusCode: 200,
        token: token,
      };
    } else {
      return {
        message: "Invalid Username and password !!",
        statusCode: 404,
      };
    }
  }
});
