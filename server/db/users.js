import { prisma } from ".";

export const createdUser = (userData) => {
    return prisma.user.create({
        data:userData
    })
}