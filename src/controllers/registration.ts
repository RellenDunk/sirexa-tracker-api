import prisma from "../db/connection";
import { Registration } from "../generated/prisma";

export const getAllRegistrations = async (): Promise<Registration[]> => {
    return await prisma.registration.findMany();
}