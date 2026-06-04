-- CreateTable
CREATE TABLE "Excursion" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "departureTime" TEXT NOT NULL,
    "returnTime" TEXT NOT NULL,
    "departurePoint" TEXT NOT NULL,
    "maxPassengers" INTEGER NOT NULL DEFAULT 12,
    "priceAdult" REAL NOT NULL,
    "priceChild" REAL NOT NULL,
    "pricePrivate" REAL,
    "included" TEXT NOT NULL,
    "notIncluded" TEXT NOT NULL,
    "highlights" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "youtubeId" TEXT,
    "badge" TEXT,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Excursion_slug_key" ON "Excursion"("slug");
