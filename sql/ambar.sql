CREATE SCHEMA IF NOT EXISTS `ambar` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `ambar`.`clients` (
  `dni` INT UNSIGNED NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `surname` VARCHAR(30) NOT NULL,
  `phone_number` VARCHAR(10) NOT NULL,
  `address` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`dni`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `ambar`.`benefits` (
  `idbenefits` INT NOT NULL AUTO_INCREMENT,
  `dni` INT UNSIGNED NOT NULL,
  `device` VARCHAR(30) NOT NULL,
  `imei` VARCHAR(15) NOT NULL,
  `problem` VARCHAR(255) NOT NULL,
  `date_received_phone` INT NOT NULL, /*CAMBIAMOS entry_date*/
  `deposited_money` INT NULL, /*CAMBIAMOS deposited*/
  `brand` VARCHAR(30) NOT NULL,
  `total_amount_for_service` INT NULL, /*CAMBIAMOS amount*/
  `fixed` BOOLEAN,
  `retired` BOOLEAN,
  `observations` VARCHAR(255) NOT NULL,
  `date_fixed` INT NOT NULL,
  PRIMARY KEY (`idbenefits`),
  INDEX `fk_client_benefits_idx` (`dni` ASC),
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



INSERT INTO `ambar`.`clients` (`dni`, `name`, `surname`, `phone_number`, `address`) VALUES (42523334, 'Alexis', 'Romano', '3813302319', 'Republica de Libano 1304');

SELECT dni FROM `ambar`.`clients`;

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

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `problem`, `date_received_phone`, `brand`, `deposited_money`, `total_amount_for_service`, `fixed`, `retired`) 
VALUES (DEFAULT, 42523334, 'g532m', '111111111111111','Problema en la batería', 20220727, 'Motorola', 3050, 6000,false,false);

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `problem`, `date_received_phone`, `brand`, `deposited_money`, `total_amount_for_service`, `fixed`, `retired`) 
VALUES (DEFAULT, 42523334, 'j700m', '111111111111111','Problema en la batería', 20220627, 'Samsung', 3050, 6000,false,false);

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `problem`, `date_received_phone`, `brand`, `deposited_money`, `total_amount_for_service`, `fixed`, `retired`) 
VALUES (DEFAULT, 42523334, 'j700m', '111111111111111', 'Problema en la batería', 20220627, 'Samsung', 3050, 6000, false, false);

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `problem`, `date_received_phone`, `brand`, `deposited_money`, `total_amount_for_service`, `fixed`, `retired`) 
VALUES (DEFAULT, 42523334, 'a10', '222222222222222', 'Pantalla rota', 20230712, 'Oppo', 2000, 5500, false, false);

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `problem`, `date_received_phone`, `brand`, `deposited_money`, `total_amount_for_service`, `fixed`, `retired`) 
VALUES (DEFAULT, 42523334, 'samsung s21', '333333333333333', 'Problema de software', 20230801, 'Samsung', 1500, 8000, false, false);

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `problem`, `date_received_phone`, `brand`, `deposited_money`, `total_amount_for_service`, `fixed`, `retired`) 
VALUES (DEFAULT, 42523334, 'iphone 11', '444444444444444', 'No enciende', 20230805, 'Apple', 1000, 4000, false, true);

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `problem`, `date_received_phone`, `brand`, `deposited_money`, `total_amount_for_service`, `fixed`, `retired`) 
VALUES (DEFAULT, 42523334, 'poco x3', '555555555555555', 'Baja duración de batería', 20230915, 'ZTE', 2300, 7000, false, false);

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `problem`, `date_received_phone`, `brand`, `deposited_money`, `total_amount_for_service`, `fixed`, `retired`) 
VALUES (DEFAULT, 42523334, 'mi 10', '666666666666666', 'Falta de señal', 20230922, 'Alcatel', 1900, 4800, false, true);

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `problem`, `date_received_phone`, `brand`, `deposited_money`, `total_amount_for_service`, `fixed`, `retired`) 
VALUES (DEFAULT, 42523334, 'huawei p30', '777777777777777', 'Problemas con cámara', 20230930, 'Huawei', 2500, 6500, false, false);

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `problem`, `date_received_phone`, `brand`, `deposited_money`, `total_amount_for_service`, `fixed`, `retired`) 
VALUES (DEFAULT, 42523334, 'nokia 5.4', '888888888888888', 'Fallo en el touch', 20231010, 'Nokia', 2100, 5500, false, false);

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `problem`, `date_received_phone`, `brand`, `deposited_money`, `total_amount_for_service`, `fixed`, `retired`) 
VALUES (DEFAULT, 42523334, 'xiaomi redmi note 10', '999999999999999', 'Fallo en la pantalla táctil', 20231018, 'Xiaomi', 3000, 6000, false, true);

INSERT INTO `ambar`.`benefits` (`idbenefits`, `dni`, `device`, `imei`, `problem`, `date_received_phone`, `brand`, `deposited_money`, `total_amount_for_service`, `fixed`, `retired`) 
VALUES (DEFAULT, 42523334, 'galaxy s20', '101010101010101', 'El dispositivo se apaga solo', 20231020, 'Samsung', 2200, 7000, false, false);

SELECT * FROM `ambar`.`clients` c INNER JOIN `ambar`.`benefits` b ON 
c.dni = b.dni WHERE c.dni = 42523334;

UPDATE `ambar`.`benefits` b
SET b.retired = false
WHERE b.idbenefits = 1;

SELECT * FROM `ambar`.`benefits`;

SELECT dni FROM `ambar`.`clients`