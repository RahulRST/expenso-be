import prisma from "../../helpers/prismaClient";

class AuthController
{
    public login = async (req: any, res: any, next: any) => {
        const { username, password } = req.body;
        const userAvailable = await prisma.user.findUnique({
            where: {
                username
            }
        });
        if (!userAvailable) {
            return res.status(404).json({
                message: "Username not found"
            });
        }
        else
        {
            if(userAvailable.password === password)
            {
                return res.status(200).json({
                    message: "Login success"
                });
            }
            else
            {
                return res.status(400).json({
                    message: "Wrong password"
                });
            }
        }
    }
}

export default AuthController;