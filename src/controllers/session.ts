import { CurrentServer, Session, CurrentSession, Registration } from "../generated/prisma";
import prisma from "../db/connection";

export const getCurrentSession = async (): Promise<CurrentSession | null> => {
    return await prisma.currentSession.findFirst({
        include: {
            session:{
                include:{
                    registrations: true
                }
            }

        }
    });
}

export const endCurrentSesssion = async() => {
    return await prisma.currentSession.delete({
        where:{
            id: 1
        },
    })
}

export const formatSessionOutput = (cSession: CurrentSession) => {
    const data = JSON.parse(JSON.stringify(cSession, null, 2));
    const registrations:Registration[] = data.session.registrations;
    const activeRegistrations = registrations.filter((reg: { sessionStatus: string; }) => reg.sessionStatus === 'ACTIVE');
    const outputString = activeRegistrations.sort((reg1,reg2)=>reg1.sessionPosition-reg2.sessionPosition ).map((reg:Registration) => {
        return `${reg.sessionPosition}: ${reg.type} - ${reg.userName}`;
    }).join('\n')
    return outputString;
}
