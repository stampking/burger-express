/*
  Warnings:

  - You are about to drop the column `receipt` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `burgerId` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to drop the column `subTotal` on the `OrderItems` table. All the data in the column will be lost.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Burger` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `OrderItems` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Order` DROP COLUMN `receipt`,
    DROP COLUMN `status`,
    ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `orderStatus` ENUM('COOKING', 'COMPLETE') NOT NULL DEFAULT 'COOKING',
    ADD COLUMN `paymentStatus` ENUM('PROCESSING', 'PAID') NOT NULL DEFAULT 'PROCESSING',
    ADD COLUMN `slipURL` VARCHAR(191) NULL,
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `OrderItems` DROP COLUMN `burgerId`,
    DROP COLUMN `quantity`,
    DROP COLUMN `subTotal`,
    ADD COLUMN `amount` INTEGER NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `productId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `isAdmin`,
    ADD COLUMN `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    ADD COLUMN `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `email` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Burger`;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `productStatus` ENUM('AVAILABLE', 'NOTAVAILABLE') NOT NULL DEFAULT 'AVAILABLE',
    `image` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItems` ADD CONSTRAINT `OrderItems_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItems` ADD CONSTRAINT `OrderItems_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
