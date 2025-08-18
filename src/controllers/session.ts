import { Session } from "../generated/prisma";
import { currrentSession } from "../generated/prisma";
import prisma from "../db/connection";

export const getCurrentSession = async (): Promise<currrentSession | null> => {
    return await prisma.currrentSession.findFirst({
        include: {
            currentSession:{
                include:{
                    registrations: true
                }
            }

        }
    });
}