-- CreateEnum
CREATE TYPE "Role" AS ENUM ('User', 'Admin', 'Moderator', 'VPA', 'FRIGORIFICO', 'PROPIEDAD', 'PRODUCTOR', 'SENACSA', 'SITRAP', 'ASSOCIACION', 'PUESTOCONTROL', 'GERENTE', 'UNDEFINED', 'ADMIN', 'MANAGER', 'CLIENT', 'USER', 'ROOT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" "Role";

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN     "roles" "Role"[],
ADD COLUMN     "username" TEXT DEFAULT '';
