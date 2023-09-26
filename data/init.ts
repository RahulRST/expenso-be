import { Expense, Income } from "./data"
import prisma from "../src/helpers/prismaClient"

const Initializer = {
    init() {
        Expense.forEach(async (item) => {
            await prisma.expenseCategory.create({
                data: {
                    name: item
                }
            })
        })

        Income.forEach(async (item) => {
            await prisma.incomeSource.create({
                data: { 
                    name: item
                }
            })
        })
    }
}

Initializer.init();