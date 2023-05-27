import { Request, Response } from "express";
import prisma from "../../helpers/prismaClient";

class FetchController
{
    public getNotifications = async (req: Request, res: Response) =>
    {
        try{
            const user = res.locals.user;
            const notifications = await prisma.notification.findMany({
                where: {
                    userId: user.id
                }
            });
            if(notifications)
            {
                return res.status(200).json({
                    success: true,
                    message: "Notifications fetched successfully",
                    notifications
                });
            }
            else
            {
                return res.status(500).json({
                    success: false,
                    message: "Unable to fetch notifications"
                });
            }
        }
        catch(err)
        {
            return res.status(500).json({
                success: false,
                message: "Unable to fetch notifications",
                error: err
            });
        }
    }
}

export default FetchController;