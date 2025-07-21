import bcrypt from 'bcryptjs'
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../../config/prisma.conf';
import { jwtSecretKey } from '../../config/jwt.conf';

async function register(req:Request, res:Response){
    try {
        const {firstName,lastName,username,email,password}= req.body;
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err){
                console.log(err);
                res.status(500).json({
                    success: false, 
                    message: "something went wrong",
                    data: err
                })
                return
            }
            const user = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    username,
                    email,
                    password: hash as string
                }
            })
            const payload = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
                userID: user.id
            }
            const token = jwt.sign(payload, jwtSecretKey, {expiresIn: "2h"})
            res.status(201).json({
                success: true,
                message: "User created successfully",
                data: token
            })
        })
    } catch (error) {
        console.log(error)
    }
}

export {register}