-- CreateTable
CREATE TABLE "PasswordReset" (
    "token" CHAR(21) NOT NULL,
    "userId" TEXT NOT NULL,
    "validUntil" TIMESTAMP(6) NOT NULL DEFAULT (timezone('utc'::text, now()) + '2 days'::interval),

    CONSTRAINT "PasswordReset_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset_userId_key" ON "PasswordReset"("userId");
