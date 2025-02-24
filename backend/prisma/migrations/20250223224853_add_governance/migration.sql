-- CreateTable
CREATE TABLE `governances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `kansai` INTEGER NOT NULL DEFAULT 0,
    `chubu` INTEGER NOT NULL DEFAULT 0,
    `shikoku` INTEGER NOT NULL DEFAULT 0,
    `kyushu` INTEGER NOT NULL DEFAULT 0,
    `chugoku` INTEGER NOT NULL DEFAULT 0,
    `kanto` INTEGER NOT NULL DEFAULT 0,
    `tohoku` INTEGER NOT NULL DEFAULT 0,
    `total` INTEGER NOT NULL DEFAULT 0,
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `governances_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `governances` ADD CONSTRAINT `governances_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
