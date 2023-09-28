import { Request, Response } from "express";
import prisma from "../../helpers/prismaClient";

class UserController {
  public getUser = async (req: Request, res: Response) => {
    try {
      const { id } = res.locals.user;
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          username: true,
          name: true,
          address: true,
          contact: true,
        },
      });
      if (user) {
        return res.status(200).json({
          success: true,
          message: "User found",
          data: user,
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
  };
}

export default UserController;
