// prisma/prismaOperations.js
const { prisma, disconnectPrisma } = require('./prisma');

async function main() {
    // const usesr = await prisma.users.create({
    //     data: {
    //       username: "admin1",
    //       name: "admin1",
    //       password: "123123",
    //       profile: "admon1",
    //       description: "admon1",
    //       photo: "admon1"
    //     },
    //   });
    
    //   console.log('New users created:', usesr);
    
    //   const category_project = await prisma.users.findMany();
    //   console.log('All category project:', category_project);
}

module.exports = {
  main,
  disconnectPrisma,
};
