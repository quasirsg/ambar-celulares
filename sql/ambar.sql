CREATE SCHEMA IF NOT EXISTS `ambar` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `ambar`.`clients` (
  `dni` INT UNSIGNED NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `surname` VARCHAR(30) NOT NULL,
  `phone_number` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`dni`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `ambar`.`benefits` (
  `idbenefits` INT NOT NULL AUTO_INCREMENT,
  `dni` INT UNSIGNED NOT NULL,
  `device` VARCHAR(30) NOT NULL,
  `imei` VARCHAR(15) NOT NULL,
  `problem` VARCHAR(255) NOT NULL,
  `entry_date` VARCHAR(30) NOT NULL,
  `brand` VARCHAR(30) NOT NULL,
  `deposited` INT NULL,
  `amount` INT NULL,
  `fixed` BOOLEAN,
  `retired` BOOLEAN,
  `obvervations`VARCHAR(255) NOT NULL,
  `date_fixed` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`idbenefits`),
  INDEX `fk_client_benefits_idx` (`dni` ASC) VISIBLE,
  CONSTRAINT `fk_client_benefits`
    FOREIGN KEY (`dni`)
    REFERENCES `ambar`.`clients` (`dni`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `ambar`.`brands` (
  `idbrand` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL UNIQUE,
  PRIMARY KEY (`idbrand`)
) ENGINE = InnoDB;



INSERT INTO `ambar`.`clients` (`dni`, `name`, `surname`, `phone_number`) VALUES (42523334, 'Alexis', 'Romano', '3813302319');

SELECT dni FROM `ambar`.`clients`;

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `problem`, `entry_date`, `brand`, `deposited`, `amount`,`fixed`,`retired`, `observations`, `date_fixed`) 
VALUES (DEFAULT, 42525591, 'g532m', '111111111111111','Problema en la batería', '27/07/2022', 'Motorola', 3050, 6000,false,false, 'Cambio de modulo y ficha SIM', '29/11/2024');

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `problem`, `entry_date`, `brand`, `deposited`, `amount`,`fixed`,`retired`, `observations`, `date_fixed`) 
VALUES (DEFAULT, 42523334, 'j700m', '111111111111111','Problema en la batería', '27/06/2022', 'Samsung', 3050, 6000,false,false, 'Cambio de modulo y ficha SIM', '29/11/2024');

INSERT INTO `ambar`.`brands` (`name`) VALUES
('Samsung'),
('Motorola'),
('Apple'),
('Xiaomi'),
('Huawei'),
('LG'),
('Alcatel'),
('Nokia'),
('ZTE'),
('Sony'),
('TCL'),
('Oppo'),
('Realme'),
('Vivo'),
('Honor');


SELECT * FROM `ambar`.`clients` c INNER JOIN `ambar`.`benefits` b ON 
c.dni = b.dni WHERE c.dni = 42523334;

UPDATE `ambar`.`benefits` b
SET b.retired = false
WHERE b.idbenefits = 1;

SELECT * FROM `ambar`.`benefits`;

SELECT dni FROM `ambar`.`clients`