import { prisma } from '../config/db.js';

export async function suggestNextTopic(userId) {
    // 1. Get user's most recent activity
    const recent = await prisma.recentActivity.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: { topic: true },
    });

    // 2. If no activity, return the first "Easy" topic
    if (!recent) {
        return await prisma.topic.findFirst({
            where: { difficulty: 'Easy' },
        });
    }

    const { categoryId, difficulty } = recent.topic;

    // 3. Try to find next topic in same category and difficulty
    let nextTopic = await prisma.topic.findFirst({
        where: {
            categoryId,
            difficulty,
            NOT: {
                progresses: {
                    some: {
                        userId,
                        status: 'COMPLETED'
                    }
                }
            }
        }
    });

    // 4. If no topic found, try to find any uncompleted topic in same category
    if (!nextTopic) {
        nextTopic = await prisma.topic.findFirst({
            where: {
                categoryId,
                NOT: {
                    progresses: {
                        some: {
                            userId,
                            status: 'COMPLETED'
                        }
                    }
                }
            }
        });
    }

    // 5. If still no topic, try any uncompleted topic
    if (!nextTopic) {
        nextTopic = await prisma.topic.findFirst({
            where: {
                NOT: {
                    progresses: {
                        some: {
                            userId,
                            status: 'COMPLETED'
                        }
                    }
                }
            }
        });
    }

    return nextTopic;
}
