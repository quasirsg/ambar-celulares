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
  `description` VARCHAR(255) NOT NULL,
  `replacements` VARCHAR(255) NULL,
  `entry_date` INT NOT NULL,
  `mount` INT NULL,
  `fixed` BOOLEAN,
  `paid_out` BOOLEAN,
  `retired` BOOLEAN,
  PRIMARY KEY (`idbenefits`),
  INDEX `fk_client_benefits_idx` (`dni` ASC) VISIBLE,
  CONSTRAINT `fk_client_benefits`
    FOREIGN KEY (`dni`)
    REFERENCES `ambar`.`clients` (`dni`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


INSERT INTO `ambar`.`clients` (`dni`, `name`, `surname`, `phone_number`) VALUES (42523334, 'Alexis', 'Romano', '3813302319');

SELECT dni FROM `ambar`.`clients`;

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `description`,`replacements`, `entry_date`, `mount`,`retired`,`fixed`) 
VALUES (DEFAULT, 42523334, 'g532m', '111111111111111','Problema en la batería', 'todos', 16072022, 3050,false,false,false);

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `description`,`replacements`, `entry_date`, `mount`,`retired`,`fixed`) 
VALUES (DEFAULT, 42523334, 'j700m', '111111111111112','Cambio de modulo y pin de carga', 'modulo-pin_carga', 27072022, 3050,false,false);


SELECT * FROM `ambar`.`clients` c INNER JOIN `ambar`.`benefits` b ON 
c.dni = b.dni WHERE c.dni = 42523334;

UPDATE `ambar`.`benefits` b
SET b.retired = false
WHERE b.idbenefits = 1;