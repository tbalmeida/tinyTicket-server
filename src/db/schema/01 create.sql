--  base tables
CREATE TABLE IF NOT EXISTS `provinces` (
  `id` SMALLINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `abbreviation` CHAR(2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name` (`name` ASC) VISIBLE,
  UNIQUE INDEX `abbreviation` (`abbreviation` ASC) VISIBLE
);
CREATE TABLE IF NOT EXISTS `cities` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `province` SMALLINT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE,
  INDEX `province` (`province` ASC) VISIBLE,
  CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`province`) REFERENCES `provinces` (`id`)
);
CREATE TABLE IF NOT EXISTS `venues` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `description` VARCHAR(500) NULL DEFAULT NULL,
  `max_capacity` SMALLINT NOT NULL,
  `url_info` VARCHAR(100) NULL DEFAULT NULL,
  `address` VARCHAR(300) NOT NULL,
  `city` INT NOT NULL,
  `latitude` DOUBLE NULL,
  `longitude` DOUBLE NULL,
  `active` BOOLEAN DEFAULT true,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE,
  UNIQUE INDEX `name` (`name` ASC) VISIBLE,
  INDEX `city` (`city` ASC) VISIBLE,
  CONSTRAINT `venues_ibfk_1` FOREIGN KEY (`city`) REFERENCES `cities` (`id`)
);
CREATE TABLE IF NOT EXISTS `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) DEFAULT NULL,
  `date_time` datetime NOT NULL,
  `venue` int NOT NULL,
  `description` varchar(500) NOT NULL,
  `qt_tickets` smallint NOT NULL,
  `max_per_user` tinyint DEFAULT '2',
  `ticket_price` decimal(5, 2) NOT NULL DEFAULT '0.00',
  `handle` char(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `handle_UNIQUE` (`handle`),
  KEY `venue` (`venue`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`venue`) REFERENCES `venues` (`id`)
);
CREATE TABLE IF NOT EXISTS `event_charges` (
  `event` INT NOT NULL,
  `id` INT NOT NULL,
  `value` DECIMAL(7, 2) NOT NULL,
  `payment_date` DATETIME NULL DEFAULT now(),
  `receipt` BLOB NULL DEFAULT NULL,
  PRIMARY KEY (`event`, `id`),
  CONSTRAINT `event_charges_ibfk_1` FOREIGN KEY (`event`) REFERENCES `events` (`id`)
);
-- Ticket purchases
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
  UNIQUE INDEX `handle` (`handle` ASC) VISIBLE
);
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT NOT NULL,
  `created` TIMESTAMP NULL DEFAULT now(),
  `user` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user` (`user` ASC) VISIBLE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
);
CREATE TABLE IF NOT EXISTS `order_items` (
  `order` INT NOT NULL,
  `id` INT NOT NULL,
  `event` INT NOT NULL,
  `value` DECIMAL(6, 2) NULL DEFAULT NULL,
  `qty` TINYINT NOT NULL,
  PRIMARY KEY (`order`, `id`),
  INDEX `event` (`event` ASC) VISIBLE,
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`event`) REFERENCES `events` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`order`) REFERENCES `orders` (`id`)
);