const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const voter = async (req, res) => {

    try {
        const { userId, classvote, choice, countvote } = req.body;

        //error บังคับให้ใส่ choicevote
        if (!(userId)) {
            return res.status(400).send({ message: "userId is requied" });
        }

        //error บังคับให้ใส่ choicevote
        if (!(classvote)) {
            return res.status(400).send({ message: "classvote is requied" });
        }

        //error บังคับให้ใส่ choicevote
        if (!(choice)) {
            return res.status(400).send({ message: "choice is requied" });
        }

        //error บังคับให้ใส่ choicevote
        if (!(countvote)) {
            return res.status(400).send({ message: "countvote is requied" });
        }

        //error บังคับให้ใส่ choicevote
        if (!(userId && classvote && choice && countvote)) {
            return res.status(400).send({ message: "All fields is requied" });
        }

        // ตรวจสอบว่ามีการโหวตของ userId ในวันนี้แล้วหรือยัง
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const existingVote = await prisma.voter.findFirst({
            where: {
                userId: userId,
                classvote: classvote,
                createdAt: {
                    gte: startOfDay,
                    lt: endOfDay
                }
            }
        });

        if (existingVote) {
            return res.status(400).send({ message: "You've already voted today." });
        }

        const vote = await prisma.voter.create({
            data: {
                userId: userId,
                classvote: classvote,
                choice: choice,
                countvote: countvote,
                createdAt: new Date() // บันทึกเวลาปัจจุบัน
            },
        });
        return res.status(201).send(vote);

    } catch (error) {
        return res.status(500).send(error);

    }
}


const getVoter = async (req, res) => {
    try {
        const voters = await prisma.voter.findMany({
            include: {
                userid: {
                    select: {
                        username: true,
                        email: true,
                    }
                }
            }
        });

        return res.status(200).json({ voters });
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
};


module.exports = {
    voter,getVoter
}