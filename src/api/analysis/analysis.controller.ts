import { Request, Response } from "express";
import prisma from "../../helpers/prismaClient";

class AnalysisController
{
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

export default AnalysisController;