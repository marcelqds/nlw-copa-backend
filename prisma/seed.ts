import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const main = async () => {
    const user = await prisma.user.create({
        data:{
            name: 'Primeiro Usuário',
            email: 'primeiro@gmail.com',
            avatarUrl: 'https://github.com/marcelqds.git'
        }
    })

    const pool = await prisma.pool.create({
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
                            userId_poolId:{
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    })
}

main();