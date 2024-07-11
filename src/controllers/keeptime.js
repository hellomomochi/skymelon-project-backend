const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const keeptime = async (req, res) => {
  try {
    const data = req.body; // Assume data is an array of objects from frontend

    // Validate each item in data
    const invalidItems = data.filter(item => !(item.initialSeconds && item.startTime && item.endTime && item.branchtime));
    if (invalidItems.length > 0) {
      return res.status(400).send({ message: "All fields must be provided for each item" });
    }

    // Create data in the database using Promise.all
    const createdKeeptimes = await Promise.all(
      data.map(item =>
        prisma.keeptime.create({
          data: {
            initialSeconds: item.initialSeconds,
            startTime: item.startTime,
            endTime: item.endTime,
            branchtime: item.branchtime
          }
        })
      )
    );

    return res.status(201).json(createdKeeptimes);
  } catch (error) {
    console.error('Error while creating keeptime:', error);
    return res.status(500).send({ message: "Error creating keeptime. Please try again later." });
  }
};

const deleteKeeptime = async (req, res) => {
    try {
        // Delete related data first
        await prisma.keeptime.deleteMany({});

        return res.status(200).json({ message: 'All data successfully deleted' });
    } catch (error) {
        console.error('Error deleting data:', error);
        return res.status(500).json({ error: 'An error occurred while deleting data' });
    }
}

const getAllKeeptime = async (req, res) => {
  try {
      const Keeptime = await prisma.keeptime.findMany({
          where: {
            id: req.Keeptime,
          },
      });

      return res.status(200).json({ Keeptime });
  } catch (error) {
      console.error('Error fetching data:', error);
      return res.status(500).json({ error: 'An error occurred while fetching data' });
  }
}

module.exports = {
  keeptime,
  deleteKeeptime,
  getAllKeeptime
};
