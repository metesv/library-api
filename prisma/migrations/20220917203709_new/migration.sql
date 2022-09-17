-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_readerId_fkey";

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "rentedDay" TIMESTAMP(3),
ADD COLUMN     "returnedDay" TIMESTAMP(3),
ALTER COLUMN "readerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_readerId_fkey" FOREIGN KEY ("readerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
