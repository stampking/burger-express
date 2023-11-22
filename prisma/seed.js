// const { PrismaClient } = require('@prisma/client');
// const bcrypt = require('bcryptjs');
// const prisma = new PrismaClient()

// const hashPassword = bcrypt.hashSync('123456', 10)

// const userData = [
//     {
//         email: 'RM@gmail.com',
//         password: hashPassword,
//         phoneNumber: '0944022052',
//         isVerify: false,
//         isBanned: false,
//     },
//     {
//         email: 'JJ@gmail.com',
//         password: hashPassword,
//         phoneNumber: '0944022011',
//         isVerify: false,
//         isBanned: false,
//     },
//     {
//         email: 'LiLi@gmail.com',
//         password: hashPassword,
//         phoneNumber: '0944022054',
//         isVerify: false,
//         isBanned: false,
//     },
//     {
//         email: 'JK@gmail.com',
//         password: hashPassword,
//         phoneNumber: '0944022012',
//         isVerify: false,
//         isBanned: false,
//     },
//     {
//         email: 'Luca@gmail.com',
//         password: hashPassword,
//         phoneNumber: '0944022013',
//         isVerify: false,
//         isBanned: false,
//     },
// ]



// const userProfileData = [
//     {
//         firstName: "Jung",
//         lastName: "kook",
//         profileImage: 'profileImage',
//         identifyId: 'Id',
//         identifyImage: 'identifyImage',
//         birthDate: new Date(),
//         address: 'Bangkook',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         personalDescription: 'Am Cool !?',
//         wallet: 50000.00,
//         userId: 18,

//     }
// ]

// const showCaseData = [
//     {
//         imagePictue: 'imagePic',
//         description: 'Hello',
//         userProfileId: 18,
//     }
// ]

// const workCategoriesData = [
//     { category: 'Computer & Techology' },
//     { category: 'Graphic & Design' },
//     { category: 'Translate' },
//     { category: 'Tutoring & Education' },
//     { category: 'Event Servicce' },
//     { category: 'Home Service' },
//     { category: 'Transport' },
//     { category: 'Health Service' },
//     { category: 'Food & Cooking' },
//     { category: 'Pet' },
//     { category: 'Other' }
// ]

// const workData = [
//     {
//         title: 'Pet',
//         description: 'Take dog to swimming lessons',
//         price: 500.00,
//         addressLat: '',
//         addressLong: '',
//         createdAt: new Date(),
//         startDate: new Date(),
//         endDate: new Date(),
//         ownerId: 1,
//         workerId: 11,
//         categoryId: 10,

//     }
// ]

// const reviewData = [
//     {
//         rating: 2,

//         createdAt: new Date(),
//         workId: 1,
//         reviewerId: 1,
//         reviewById: 1,
//     }
// ]


// const challengerData = [
//     {
//         userProfileId: 1,
//         workId: 11,
//     }
// ]


// const chatroomData = [
//     {
//         createdAt: new Date(),
//         workId: 2,
//         senderId: 5,
//         recieverId: 5,

//     }
// ]

// const reportData = [
//     {
//         detail: '',
//         createdAt: new Date(),
//         workId: 2,
//         reportById: 2,
//         reportedId: 2,
//     }
// ]
// const transactionData = [
//     {
//         type: "transfer",
//         amount: 500.00,
//         slipImage: 'Image',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         status: 'approve',
//         workTitle: 'Pet',
//         userProfileId: 2,
//         workId: 11,
//     }
// ]

// const run = async () => {
//     // await prisma.user.createMany({
//     //     data: userData
//     // })

//     const users = await prisma.user.findMany()

//     const userProfileData = users.map(el => ({
//         firstName: "Jung",
//         lastName: "kook",
//         profileImage: 'profileImage',
//         identifyId: 'Id',
//         identifyImage: 'identifyImage',
//         birthDate: new Date(),
//         address: 'Bangkook',
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         personalDescription: 'Am Cool !?',
//         wallet: 50000.00,
//         userId: el.id,

//     }))


//     // await prisma.userProfile.createMany({
//     //     data: userProfileData
//     // })

//     const userProfiles = await prisma.userProfile.findMany()

//     const showCaseData = userProfiles.map(el => ({
//         imagePictue: 'imagePic',
//         description: 'Hello',
//         userProfileId: el.id,
//     }))

//     // await prisma.showCase.createMany({
//     //     data: showCaseData
//     // })
//     const showCase = await prisma.showCase.findMany()

//     const workCategoriesData = showCase.map(el => ({

//         category: 'Computer & Techology',
//         category: 'Graphic & Design',
//         category: 'Translate',
//         category: 'Tutoring & Education',
//         category: 'Event Servicce',
//         category: 'Home Service',
//         category: 'Transport',
//         category: 'Health Service',
//         category: 'Food & Cooking',
//         category: 'Pet',
//         category: 'Other'

//     }));

//     await prisma.workCategoriesData.createMany({
//         data: workCategoriesData
//     })
//     const workCategories = await prisma.workCategories.findMany();

//     await prisma.workData.createMany({
//         data: workData
//     })
//     const work = await prisma.work.findMany()

//     await prisma.reviewData.createMany({
//         data: reviewData
//     })
//     const review = await prisma.review.findMany()

//     await prisma.challengerData.createMany({
//         data: challengerData
//     })
//     const challenger = await prisma.challenger.findMany()

//     await prisma.chatroomData.createMany({
//         data: chatroomData
//     })
//     const chatroom = await prisma.chatRoom.findMany()

//     await prisma.reportData.createMany({
//         data: reportData
//     })
//     const report = await prisma.report.findMany()

//     await prisma.transactionData.createMany({
//         data: transactionData
//     })
//     const transaction = await prisma.transaction.findMany()
// }

// run()