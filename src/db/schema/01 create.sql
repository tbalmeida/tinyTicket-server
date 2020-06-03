-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
SHOW WARNINGS;
-- -----------------------------------------------------
-- Schema tmp
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema tmp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `tmp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
SHOW WARNINGS;
USE `tmp` ;

-- -----------------------------------------------------
-- Table `provinces`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `provinces` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `provinces` (
  `id` SMALLINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `abbreviation` CHAR(2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name` (`name` ASC) VISIBLE,
  UNIQUE INDEX `abbreviation` (`abbreviation` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `cities`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cities` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `cities` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `province` SMALLINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE,
  INDEX `province` (`province` ASC) VISIBLE,
  CONSTRAINT `cities_ibfk_1`
    FOREIGN KEY (`province`)
    REFERENCES `provinces` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `venues`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `venues` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `venues` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `description` VARCHAR(500) NULL DEFAULT NULL,
  `max_capacity` SMALLINT NOT NULL,
  `url_info` VARCHAR(100) NULL DEFAULT NULL,
  `address` VARCHAR(300) NOT NULL,
  `city` INT NOT NULL,
  `lat` DOUBLE NOT NULL,
  `long` DOUBLE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name` (`name` ASC) VISIBLE,
  INDEX `city` (`city` ASC) VISIBLE,
  CONSTRAINT `venues_ibfk_1`
    FOREIGN KEY (`city`)
    REFERENCES `cities` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `events`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `events` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `events` (
  `id` INT NOT NULL,
  `venue` INT NOT NULL,
  `name` VARCHAR(150) NULL DEFAULT NULL,
  `description` VARCHAR(500) NOT NULL,
  `qt_tickets` SMALLINT NOT NULL,
  `max_per_user` TINYINT NULL DEFAULT '2',
  PRIMARY KEY (`id`),
  INDEX `venue` (`venue` ASC) VISIBLE,
  CONSTRAINT `events_ibfk_1`
    FOREIGN KEY (`venue`)
    REFERENCES `venues` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `event_charges`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event_charges` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `event_charges` (
  `event` INT NOT NULL,
  `id` INT NOT NULL,
  `value` DECIMAL(7,2) NOT NULL,
  `payment_date` DATETIME NULL DEFAULT now(),
  `receipt` BLOB NULL DEFAULT NULL,
  PRIMARY KEY (`event`, `id`),
  CONSTRAINT `event_charges_ibfk_1`
    FOREIGN KEY (`event`)
    REFERENCES `events` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL,
  `first_name` VARCHAR(30) NOT NULL,
  `last_name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `phone` VARCHAR(15) NULL DEFAULT NULL,
  `dt_registered` TIMESTAMP NULL DEFAULT now(),
  `dt_last_login` TIMESTAMP NULL DEFAULT NULL,
  `handle` CHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `handle` (`handle` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `orders` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT NOT NULL,
  `created` TIMESTAMP NULL DEFAULT now(),
  `user` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user` (`user` ASC) VISIBLE,
  CONSTRAINT `orders_ibfk_1`
    FOREIGN KEY (`user`)
    REFERENCES `users` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;

-- -----------------------------------------------------
-- Table `order_items`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `order_items` ;

SHOW WARNINGS;
CREATE TABLE IF NOT EXISTS `order_items` (
  `order` INT NOT NULL,
  `id` INT NOT NULL,
  `event` INT NOT NULL,
  `value` DECIMAL(6,2) NULL DEFAULT NULL,
  `qty` TINYINT NOT NULL,
  PRIMARY KEY (`order`, `id`),
  INDEX `event` (`event` ASC) VISIBLE,
  CONSTRAINT `order_items_ibfk_1`
    FOREIGN KEY (`event`)
    REFERENCES `events` (`id`),
  CONSTRAINT `order_items_ibfk_2`
    FOREIGN KEY (`order`)
    REFERENCES `orders` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

SHOW WARNINGS;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
