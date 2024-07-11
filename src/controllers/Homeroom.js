const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const homeroom = async (req, res) => {
    try {
        const data = req.body;

        // Check if the input data is an array
        if (!Array.isArray(data)) {
            return res.status(400).json({ message: "Input data should be an array." });
        }

        // Create data in the database
        const createData = await Promise.all(
            data.map((item) => {
                return prisma.homeroom.create({
                    data: {
                        code: item.code,
                        branch: item.branch, // Ensure the field name matches your model
                        image: item.image,
                        Candidateroom: {
                            create: item.candidates.map((candidate) => ({
                                candidateName: candidate.candidateName,
                                imageCandidates: candidate.imageCandidate,
                            })),
                        },
                    },
                });
            })
        );

        return res.status(201).json({ message: 'Data successfully saved', createData });

    } catch (error) {
        console.error('Error saving data:', error);
        return res.status(500).json({ error: 'An error occurred while saving data' });
    }
}

const deleteAllData = async (req, res) => {
    try {
        // Delete related data first
        await prisma.candidateroom.deleteMany({});
        await prisma.homeroom.deleteMany({});

        return res.status(200).json({ message: 'All data successfully deleted' });
    } catch (error) {
        console.error('Error deleting data:', error);
        return res.status(500).json({ error: 'An error occurred while deleting data' });
    }
}

const getAllData = async (req, res) => {
    try {
        const homeroomData = await prisma.homeroom.findMany({
            include: {
                Candidateroom: true,
            },
        });

        return res.status(200).json({ homeroomData });
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ error: 'An error occurred while fetching data' });
    }
}

module.exports = {
    homeroom, deleteAllData, getAllData
};
