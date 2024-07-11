
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// GET /getCandidatekm31
const getkeeptime = async (req, res) => {
    try {
        // ค้นหาผู้สมัครล่าสุดจากฐานข้อมูล
        const latestkeeptime = await prisma.keeptime.findFirst({
            orderBy: { id: 'desc' }, // เรียงลำดับตาม ID ให้เรียงจากมากไปน้อย (desc)
        });

        // ตรวจสอบว่ามีผู้สมัครหรือไม่
        if (!latestkeeptime) {
            return res.status(404).send({ message: "No latestkeeptime found" });
        }

        // ส่งค่า ID ล่าสุดของผู้สมัครกลับไป
        res.status(200).send({ 
            latestkeeptimeId: latestkeeptime.initialSeconds,
            latestkeeptimeStart: latestkeeptime.startTime,
            latestkeeptimeEnd: latestkeeptime.endTime,
         });
    } catch (error) {
        console.error("Error getting latestkeeptime:", error);
        res.status(500).send({ error: "Failed to get latest keeptime" });
    }
};

module.exports = {
    getkeeptime,
}
