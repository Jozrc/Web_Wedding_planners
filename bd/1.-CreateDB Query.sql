CREATE SCHEMA IF NOT EXISTS `weddingPlanning`;
USE `weddingPlanning`;

-- Tabla de Genero
CREATE TABLE IF NOT EXISTS `Genero` (
  `idGenero` INT NOT NULL AUTO_INCREMENT,
  `Nombre_Genero` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idGenero`),
  UNIQUE INDEX `idGenero_UNIQUE` (`idGenero`),
  UNIQUE INDEX `Nombre_Genero_UNIQUE` (`Nombre_Genero`));

-- Tabla de Rol
CREATE TABLE IF NOT EXISTS `Rol` (
  `idRol` INT NOT NULL AUTO_INCREMENT,
  `Nombre_Rol` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idRol`),
  UNIQUE INDEX `idRol_UNIQUE` (`idRol`),
  UNIQUE INDEX `Nombre_Rol_UNIQUE` (`Nombre_Rol`));
  
-- Tabla de Usuario
CREATE TABLE IF NOT EXISTS `Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `Nombre_Usuario` VARCHAR(45) NOT NULL,
  `Apellido_Paterno_Usuario` VARCHAR(45),
  `Apellido_Materno_Usuario` VARCHAR(45),
  `Correo_Usuario` VARCHAR(45),
  `Contrasenia_Usuario` VARCHAR(45),
  `Username` VARCHAR(45),
  `Estado_Usuario` TINYINT DEFAULT 1,
  `Telefono_Usuario` VARCHAR(15),
  `Foto_Perfil` LONGBLOB NULL DEFAULT NULL,
  `Rol_User` INT,
  `Genero` INT,
  `Fecha_Nacimiento` DATE,
  `Fecha_Registro` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `Fecha_Modificacion` DATETIME ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `idUsuario_UNIQUE` (`idUsuario`),
  UNIQUE INDEX `Correo_Usuario_UNIQUE` (`Correo_Usuario`),
  UNIQUE INDEX `Username_UNIQUE` (`Username`),
  
  INDEX `Rol_index` (`Rol_User`),
  CONSTRAINT `Rol`
    FOREIGN KEY (`Rol_User`)
    REFERENCES `Rol` (`idRol`),
    
  INDEX `Genero_index` (`Genero`),
  CONSTRAINT `Genero`
    FOREIGN KEY (`Genero`)
    REFERENCES `Genero` (`idGenero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- Tabla de Categorias
CREATE TABLE IF NOT EXISTS `Categoria` (
  `idCategoria` INT NOT NULL AUTO_INCREMENT,
  `Nombre_categoria` VARCHAR(45) NOT NULL,
  `Descripcion_categoria` VARCHAR(200) NOT NULL,
  `Creador_categoria` INT NOT NULL,
  `Fecha_Creacion_categoria` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `EstadoCategoria` TINYINT DEFAULT 1,
  PRIMARY KEY (`idCategoria`),
  
  INDEX `Creador_index` (`Creador_categoria`),
  CONSTRAINT `Creador`
    FOREIGN KEY (`Creador_categoria`)
    REFERENCES `Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- Tabla de Paquetes
CREATE TABLE IF NOT EXISTS `Paquete` (
  `idPaquete` INT NOT NULL AUTO_INCREMENT,
  `Titulo_Paquete` VARCHAR(45) NOT NULL,
  `Descripcion_Paquete` VARCHAR(200) NOT NULL,
  `Fecha_Registro_Paquete` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `EstadoPaquete` TINYINT NOT NULL,
  `Precio_Paquete` DECIMAL(10,2) NOT NULL,
  `Creador_Paquete` INT NOT NULL,
  `ImagenPaquete` LONGBLOB NULL DEFAULT NULL,
  PRIMARY KEY (`idPaquete`),
  INDEX `Creador_index` (`Creador_Paquete`),
  CONSTRAINT `CreadorPaquete`
    FOREIGN KEY (`Creador_Paquete`)
    REFERENCES `Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- Crear la tabla que almacena un paquete con varias categorias
CREATE TABLE IF NOT EXISTS `CategoriaPaquete` (
  `idCategoriaPaquete` INT NOT NULL AUTO_INCREMENT,
  `idCategoria` INT NOT NULL,
  `idPaquete` INT NOT NULL,
  PRIMARY KEY (`idCategoriaPaquete`),
  
  INDEX `Categoria_index` (`idCategoria`),
  CONSTRAINT `CategoriaServicio`
    FOREIGN KEY (`idCategoria`)
    REFERENCES `Categoria` (`idCategoria`),
  INDEX `Paquete_index` (`idPaquete`),
  CONSTRAINT  `idPaqueteC`
  FOREIGN KEY (`idPaquete`)
  REFERENCES `Paquete` (`idPaquete`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- Tabla de Calificacion de paquete
CREATE TABLE IF NOT EXISTS `Calificacion` (
  `idCalificacion` INT NOT NULL AUTO_INCREMENT,
  `Nombre_calificacion` VARCHAR(45) NULL,
  `Comentario` VARCHAR(200) NULL,
  `Usuario_calificador` INT NOT NULL,
  `Paquete_Calificado` INT NOT NULL,
  `Fecha_Calificacion` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `Estado_Calificacion` TINYINT NULL DEFAULT 1,
  PRIMARY KEY (`idCalificacion`),
  
  INDEX `Calificador_index` (`Usuario_calificador`),
  INDEX `Calificacion_index` (`Paquete_Calificado`),
  CONSTRAINT `Calificador`
    FOREIGN KEY (`Usuario_calificador`)
    REFERENCES `Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Calificacion`
    FOREIGN KEY (`Paquete_Calificado`)
    REFERENCES `Paquete` (`idPaquete`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- Tabla de Mensajes entre organizadores y clientes
CREATE TABLE IF NOT EXISTS `Mensajes` (
  `idMensajes` INT NOT NULL AUTO_INCREMENT,
  `Mensaje` VARCHAR(500) NOT NULL,
  `Emisor` INT NOT NULL,
  `Receptor` INT NOT NULL,
  `Fecha_envio` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idMensajes`),
  INDEX `Emisor_index` (`Emisor`),
  INDEX `Receptor_index` (`Receptor`, `Emisor`),
  
  CONSTRAINT `Emisor`
    FOREIGN KEY (`Emisor`)
    REFERENCES `Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Receptor`
    FOREIGN KEY (`Receptor`)
    REFERENCES `Usuario` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- Tabla de servicios (donde se guardaran los servicios de los paquetes)
CREATE TABLE IF NOT EXISTS `Servicio` (
  `IdServicio` INT NOT NULL AUTO_INCREMENT,
  `Titulo_Servicio` VARCHAR(45) NOT NULL,
  `Descripcion_Servicio` VARCHAR(45) NOT NULL,
  `FechaRegServicio` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `Paquete` INT NOT NULL,
  
  PRIMARY KEY (`IdServicio`),
  
  INDEX `Paquete_index` (`Paquete`),
  CONSTRAINT `PaqueteServicio`
    FOREIGN KEY (`Paquete`)
    REFERENCES `Paquete` (`idPaquete`)
    
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- Tabla de Paquetes Comprados/Eventos (donde se guardaran los Paquetes comprados de los usuarios)
CREATE TABLE IF NOT EXISTS `PaqueteComprado` (
  `IdPaqueteComprado` INT NOT NULL AUTO_INCREMENT,
  `FechaCompra` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `FechaEvento` TIMESTAMP NOT NULL,
  `IdPaquete` INT NOT NULL,
  `IdUser` INT NOT NULL,
  `Calificacion` TINYINT DEFAULT -1,
  `PrecioPagado` DECIMAL(10,2) NOT NULL,
  `FormaPago` TINYINT DEFAULT 0,
  `Invitados` INT NOT NULL,
  
  PRIMARY KEY (`IdPaqueteComprado`),
  
  INDEX `Paquete_index` (`IdPaquete`),
  CONSTRAINT `PaqueteCompra`
    FOREIGN KEY (`IdPaquete`)
    REFERENCES `Paquete` (`idPaquete`),
    
  INDEX `User_index` (`IdUser`),
  CONSTRAINT `User`
    FOREIGN KEY (`IdUser`)
    REFERENCES `Usuario` (`idUsuario`)
    
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- Crear vista de reportes de los paquetes comprados
CREATE VIEW reporte_paquetes AS
SELECT P.idPaquete, P.Titulo_Paquete, cast(P.Fecha_Registro_Paquete as Date) as Fecha, P.EstadoPaquete, P.Creador_Paquete, FORMAT(P.Precio_Paquete, 2) AS Precio_Paquete, CAT.idCategoria, CAT.Nombre_categoria,
(SELECT COUNT(*) FROM PaqueteComprado PC WHERE PC.idPaquete = P.idPaquete) AS Clientes_Inscritos FROM Paquete P 
INNER JOIN CategoriaPaquete CATP ON CATP.idPaquete = P.idPaquete INNER JOIN Categoria CAT ON CAT.idCategoria = CATP.idCategoria
GROUP BY P.idPaquete, CAT.idCategoria;
