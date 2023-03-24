import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from 'express'
import { prisma } from "../../../server";

class UserController {
  private prisma: PrismaClient = prisma;
  async store(req: Request, res: Response): Promise<Response>{
    const {  name, email, password } = req.body;
    const userExist = await prisma.user.findUnique({
      where: {email}, 
    })
    if(userExist){
      res.status(400).json({Message:"user already exists"})
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: password,
      }
    })
    return res.json(user)
  }
  async index(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {id: Number(id)},
    })
    if(!user){
      return res.status(404).json({message: "user not found"})
    }
    return res.json(user)
  }
  async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { id } = req.params;

    const userExist = await prisma.user.findUnique({
      where: { email },
    })
    if (!userExist) {
      res.status(404).json({ Message: "user not found" })
    }
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
      }
    })
    return res.json(user)
  }
  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const user = await prisma.user.delete({
      where: {id: Number(id)}
    })
    if(!user) {
      res.status(404).json({ Message: "user not found" })
    }
    console.log(user);

    return res.json({message: "user deleted"});
    
  }
}
export default new UserController();