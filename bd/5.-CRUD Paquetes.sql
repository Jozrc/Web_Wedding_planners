-- Procedure Registrar Paquete
DELIMITER //
CREATE PROCEDURE SP_RegPaquete(
    IN _Titulo_Paquete VARCHAR(45),
	IN _Descripcion_Paquete VARCHAR(200),
    IN _Precio_Paquete DECIMAL(10,2),
    IN _Creador_Paquete INT,
    IN _Numero_Personas INT
)
BEGIN
    INSERT INTO Paquete(Titulo_Paquete, Descripcion_Paquete, Precio_Paquete, Creador_Paquete)
		VALUES(_Titulo_Paquete, _Descripcion_Paquete, _Precio_Paquete, _Creador_Paquete);
        
	SELECT LAST_INSERT_ID() AS Last_ID;

END//
DELIMITER ;

-- Procedure Registrar Categoria de Paquete
DELIMITER //
CREATE PROCEDURE SP_RegCategoriaPaquete(
    IN _idCategoria INT,
    IN _idPaquete INT
)
BEGIN
    INSERT INTO CategoriaPaquete(idCategoria, idPaquete)
		VALUES(_idCategoria, _idPaquete);

END//
DELIMITER ;

-- Procedure Mostrar Paquetes
DELIMITER //
CREATE PROCEDURE SP_MostrarPaquetes(

)
BEGIN
    SELECT * FROM Paquete;

END//
DELIMITER ;

-- Procedure Mostrar Paquetes por ID
DELIMITER //
CREATE PROCEDURE SP_MostrarPaqueteByID(
	IN _idPaquete INT
)
BEGIN
    SELECT * FROM Paquete WHERE idPaquete = _idPaquete;

END//
DELIMITER ;