const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const sumvote = async (req, res) => {
  try {
    // ค้นหาผลโหวตทั้งหมด
    const votes = await prisma.voter.findMany({
      select: {
        classvote: true,
        choice: true,
        countvote: true,
      },
    });

    // สร้าง object เพื่อเก็บผลรวมของ countvote สำหรับแต่ละ classvote และ choice
    const results = {};

    votes.forEach((vote) => {
      const classvote = vote.classvote;
      const choice = vote.choice;

      if (!results[classvote]) {
        results[classvote] = {};
      }

      if (!results[classvote][choice]) {
        results[classvote][choice] = 0;
      }

      results[classvote][choice] += vote.countvote;
    });

    // แปลงผลลัพธ์เป็น array ของ object
    const formattedResults = [];

    for (const classvote in results) {
      for (const choice in results[classvote]) {
        formattedResults.push({
          classvote: classvote,
          choice: choice,
          countvote: results[classvote][choice],
        });
      }
    }

    return res.status(200).send(formattedResults);
  } catch (error) {
    console.error(error);
    return res.status(500).send("An error occurred");
  }
};

module.exports = {
  sumvote,
};
