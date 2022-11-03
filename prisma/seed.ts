import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const main = async () => {
    // const user1 = await prisma.user.delete({
    //     where:{
    //         id: '54a34e5c-5d92-48db-ac37-d2761ddea7f8'
    //     }
    // });

    const user = await prisma.user.create({
        data:{
            name: 'Primeiro Usuário',
            email: 'primeiro@gmail.com',
            avatarUrl: 'https://github.com/marcelqds.git'
        }
    })

    const poll = await prisma.poll.create({
        data:{
            title: 'Primeiro Bolão',
            code: 'PRI123',
            ownerId: user.id,
            participants: {
                create:{
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data:{
            date: "2022-11-01T14:29:11.210Z",
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    })

    await prisma.game.create({
        data:{
            date: "2022-11-01T14:00:00.000Z",
            firstTeamCountryCode: 'CL',
            secondTeamCountryCode: 'CO',

            guesses:{
                create:{
                    firstTeamPoints: 2,
                    secondTeamPoints: 3,

                    participant:{
                        connect:{
                            userId_pollId:{
                                userId: user.id,
                                pollId: poll.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main();