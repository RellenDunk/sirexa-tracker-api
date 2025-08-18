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
export const formatSessionOutput = (currentSession: { currentSessionId: number; sessionId: string; }) => {
    const data = JSON.parse(JSON.stringify(currentSession, null, 2));
    const registrations = data.currentSession.registrations;
    const activeRegistrations = registrations.filter((reg: { sessionStatus: string; }) => reg.sessionStatus === 'ACTIVE');
    const outputString = activeRegistrations.map((reg: { id: string; userName: string; startedAt: string; endedAt: string; type: string; origin: string; sessionPosition: number; sessionStatus: string, userId: string; sessionId: string; }) => {
        return `${reg.sessionPosition}: ${reg.type} - ${reg.userName}`;
    }).join('\n');
    return outputString;
}
