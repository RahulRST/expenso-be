import { Request, Response } from "express";
import prisma from "../../helpers/prismaClient";

class TrackController
{
    public addExpense = async (req: Request, res: Response) =>
    {
        try
        {
            const { amount, description, category, date } = req.body;
            const user = res.locals.user;
            const expenseCat = await prisma.expenseCategory.findFirst({
                where: {
                    name: category
                }
            });
            if(!expenseCat)
            {
                return res.status(400).json({
                    success: false,
                    message: "Invalid category"
                });
            }
            else
            {
                const expense = await prisma.expense.create({
                    data: {
                        amount,
                        description,
                        date,
                        userId: user.id,
                        expenseCategoryId: expenseCat.id
                    }
                });
                if(expense)
                {
                    return res.status(201).json({
                        success: true,
                        message: "Expense added successfully",
                        expense
                    });
                }
                else
                {
                    return res.status(500).json({
                        success: false,
                        message: "Unable to add expense"
                    });
                }
            }
        }
        catch(err)
        {
            return res.status(500).json({
                success: false,
                message: "Unable to add expense",
                error: err
            });
        }
    }

    public addIncome = async (req: Request, res: Response) =>
    {
        try
        {
            const { amount, description, source, date } = req.body;
            const user = res.locals.user;
            const incomeSource = await prisma.incomeSource.findFirst({
                where: {
                    name: source
                }
            });
            if(!incomeSource)
            {
                return res.status(400).json({
                    success: false,
                    message: "Invalid source"
                });
            }
            else
            {
                const income = await prisma.income.create({
                    data: {
                        amount,
                        description,
                        date,
                        userId: user.id,
                        incomeSourceId: incomeSource.id
                    }
                });
                if(income)
                {
                    return res.status(201).json({
                        success: true,
                        message: "Income added successfully",
                        income
                    });
                }
                else
                {
                    return res.status(500).json({
                        success: false,
                        message: "Unable to add income"
                    });
                }
            }
        }
        catch(err)
        {
            return res.status(500).json({
                success: false,
                message: "Unable to add income",
                error: err
            });
        }
    }
}

export default TrackController;