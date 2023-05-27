import prisma from "../../helpers/prismaClient";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";

class AuthController
{
    public login = async (req: any, res: any) => {
        try
        {
            const { username, password } = req.body;
            const userAvailable = await prisma.user.findUnique({
                where: {
                    username
                }
            });
            if (!userAvailable) {
                return res.status(404).json({
                    success: false,
                    message: "Username not found"
                });
            }
            else
            {
                let passMatch = await compare(password, userAvailable.password)
                if(passMatch)
                {
                    let payload = {
                            id: userAvailable.id,
                            username: userAvailable.username
                    }
                    let token = sign({ payload }, process.env.JWT_SECRET, { expiresIn: "1h" });

                    return res.status(200).json({
                            success: true,
                            message: "Login success",
                            token
                        });
                }  
                else
                {
                    return res.status(400).json({
                        success: false,
                        message: "Wrong password"
                    });
                }
            }
        }
        catch (err)
        {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }

    public register = async (req: any, res: any) => {
        try
        {
            const { username, password, name, address, contact } = req.body;
            const userAvailable = await prisma.user.findUnique({
                where: {
                    username
                }
            });
            if (userAvailable) {
                return res.status(400).json({
                    success: false,
                    message: "Username already taken"
                });
            }
            else
            {
                let hashedPassword = await hash(password, 12);
                const newUser = await prisma.user.create({
                    data: {
                        username,
                        password: hashedPassword,
                        name,
                        address,
                        contact
                    }
                });
                if(newUser)
                {
                    return res.status(200).json({
                        success: true,
                        message: "User created",
                        data: newUser
                    });
                }
                else
                {
                    return res.status(400).json({
                        success: false,
                        message: "Failed to create user"
                    });
                }
            }
        }
        catch (err)
        {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    }
}

export default AuthController;