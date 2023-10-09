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
                },
                select: {
                    id: true,
                    message: true,
                    date: true
                }
            });
            if(notifications)
            {
                return res.status(200).json({
                    success: true,
                    message: "Notifications fetched successfully",
                    data: notifications
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

    public getAnalytics = async (req: Request, res: Response) => {

        const user = res.locals.user;

        const expenses = await prisma.expense.findMany({
            where: {
                userId: user.id
            }
        });

        const incomes = await prisma.income.findMany({
            where: {
                userId: user.id
            }
        });

        if(expenses.length === 0 && incomes.length === 0)
        {
            return res.status(401).json({
                success: false,
                message: "No data found"
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                expenses,
                incomes
            })
        }
    }
}

export default FetchController;