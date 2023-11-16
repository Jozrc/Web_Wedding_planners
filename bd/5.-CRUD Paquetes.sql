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
    INSERT INTO Paquete(Titulo_Paquete, Descripcion_Paquete, Precio_Paquete, Creador_Paquete, Capacidad)
		VALUES(_Titulo_Paquete, _Descripcion_Paquete, _Precio_Paquete, _Creador_Paquete, _Numero_Personas);
        
	SELECT LAST_INSERT_ID() AS Last_ID;

END//
DELIMITER ;


-- Procedure Editar Paquete
DELIMITER //
CREATE PROCEDURE SP_EditPaquete(
	IN _idPaquete INT,
    IN _Titulo_Paquete VARCHAR(45),
	IN _Descripcion_Paquete VARCHAR(200),
    IN _Precio_Paquete DECIMAL(10,2),
    IN _Numero_Personas INT
)
BEGIN
	IF _Precio_Paquete < (SELECT Precio_Paquete FROM Paquete WHERE idPaquete = _idPaquete) THEN
		UPDATE Paquete SET Oferta = 1;
	ELSE
		UPDATE Paquete SET Oferta = 0;
	END IF;

	UPDATE Paquete SET Titulo_Paquete = _Titulo_Paquete,  Descripcion_Paquete=_Descripcion_Paquete,
    Precio_Paquete = _Precio_Paquete, Capacidad = _Numero_Personas
    WHERE idPaquete = _idPaquete;
    
    DELETE FROM CategoriaPaquete WHERE idPaquete = _idPaquete;

END//
DELIMITER ;


-- Procedure Eliminar Logicamente Paquete
DELIMITER //
CREATE PROCEDURE SP_CambiarEstadoPaquete(
	IN _idPaquete INT
)
BEGIN
	DECLARE Estado INT;
    DECLARE Mensaje VARCHAR(50);
    
	SET @Estado = (SELECT EstadoPaquete FROM Paquete WHERE idPaquete = _idPaquete);
    IF (@Estado = 1) THEN 
		UPDATE Paquete SET EstadoPaquete = 0 WHERE idPaquete = _idPaquete;
        SET @Mensaje = 'Paquete Deshabilitado Exitosamente';
	ELSE
        UPDATE Paquete SET EstadoPaquete = 1 WHERE idPaquete = _idPaquete;
        SET @Mensaje = 'Paquete Habilitado Exitosamente';
	END IF;
    SELECT @Mensaje AS Mensaje;
END//
DELIMITER ;


-- Procedure Mostrar Paquetes
DELIMITER //
CREATE PROCEDURE SP_MostrarPaquetes(
	IN _Categoria INT
)
BEGIN
    SELECT DISTINCT P.idPaquete, P.Titulo_Paquete, P.Descripcion_Paquete, P.Fecha_Registro_Paquete, P.EstadoPaquete,
    P.Precio_Paquete, P.Capacidad, P.Creador_Paquete, P.ImagenPaquete
    FROM Paquete P
    INNER JOIN CategoriaPaquete CP ON CP.idPaquete = P.idPaquete
    INNER JOIN Categoria C ON C.idCategoria = CP.idCategoria
    WHERE EstadoPaquete = 1 AND
    CASE
		WHEN _Categoria = 3 THEN P.Oferta = 1
		WHEN _Categoria = 2 THEN C.Nombre_categoria = 'Foto/Video' OR C.Nombre_categoria = 'Musica'
        WHEN _Categoria = 1 THEN C.Nombre_categoria = 'Salon' OR C.Nombre_categoria = 'Decoración' OR C.Nombre_categoria = 'Ambientación'
		WHEN _Categoria = 0 THEN TRUE
    END;
END//
DELIMITER ;


-- Procedure Mostrar Paquetes por ID
DELIMITER //
CREATE PROCEDURE SP_MostrarPaqueteByID(
	IN _idPaquete INT
)
BEGIN
    SELECT P.idPaquete, P.Titulo_Paquete, P.Descripcion_Paquete, P.Precio_Paquete, P.Capacidad, P.EstadoPaquete, P.Creador_Paquete, U.Username, P.ImagenPaquete
    FROM Paquete P 
    INNER JOIN Usuario U ON U.idUsuario = P.Creador_Paquete
    WHERE P.idPaquete = _idPaquete;

END//
DELIMITER ;


-- Procedure Mostrar Mis Paquetes
DELIMITER //
CREATE PROCEDURE SP_MostrarMisPaquetes(
	IN _idUser INT
)
BEGIN
    SELECT * FROM Paquete
    WHERE Creador_Paquete = _idUser;

END//
DELIMITER ;


-- Procedure Registrar Compra Paquete
DELIMITER //
CREATE PROCEDURE SP_RegCompraPaquete(
	IN _idPaquete INT,
    IN _idCliente INT,
    IN _FechaEvento DATE,
    IN _HoraEvento TIME,
    IN _NombreCliente VARCHAR(45),
	IN _CorreoCliente VARCHAR(45),
    IN _TelefonoCliente INT,
    IN _NumPersonas INT,
    IN _Comentarios VARCHAR(200),
    IN _PrecioPagado DECIMAL(10,2)
)
BEGIN
    INSERT INTO PaqueteComprado(FechaEvento, HoraEvento, IdPaquete, IdUser, Invitados, Comentarios, PrecioPagado)
		VALUES(_FechaEvento, _HoraEvento, _idPaquete, _idCliente, _NumPersonas, _Comentarios, _PrecioPagado);

END//
DELIMITER ;


-- Procedure Mostrar Paquetes Comprados
DELIMITER //
CREATE PROCEDURE SP_MostrarPaquetesComprados(
	IN _idUser INT
)
BEGIN
    SELECT *
    FROM PaqueteComprado PC 
    INNER JOIN Paquete P ON PC.IdPaquete = P.idPaquete
    INNER JOIN Usuario U ON U.idUsuario = P.Creador_Paquete
    WHERE PC.IdUser = _idUser;
END//
DELIMITER ;

-- Procedure Mostrar Paquetes Vendidos
DELIMITER //
CREATE PROCEDURE SP_MostrarPaquetesVendidos(
	IN _idUser INT
)
BEGIN
    SELECT *
    FROM PaqueteComprado PC 
    INNER JOIN Paquete P ON PC.IdPaquete = P.idPaquete
    INNER JOIN Usuario U ON U.idUsuario = P.Creador_Paquete
    WHERE P.Creador_Paquete = _idUser;
END//
DELIMITER ;

-- Procedure Mostrar Paquetes Vendidos Por Id Paquete
DELIMITER //
CREATE PROCEDURE SP_MostrarPaqueteVendidoByID(
    IN _idPaquete INT
)
BEGIN
    SELECT PC.IdPaqueteComprado, PC.FechaCompra, DATE_FORMAT(PC.FechaEvento, '%Y-%m-%d') AS FechaEvento, PC.HoraEvento, PC.IdPaquete, PC.Calificacion, cast(PC.PrecioPagado AS DECIMAL(10,2)) AS PrecioPaquete,
			cast(SUM(PP.PrecioPagado) AS DECIMAL(10,2)) AS PrecioPagado, PC.Pagado,
			PC.FormaPago, PC.Invitados, PC.Comentarios, P.Titulo_Paquete, P.Capacidad, P.Creador_Paquete, P.ImagenPaquete, 
            U.idUsuario AS idUserCreador, U.Username AS UsernameCreador, 
            UC.idUsuario AS idUserCliente, UC.Username AS UsernameCliente
    FROM PaqueteComprado PC 
    INNER JOIN Paquete P ON PC.IdPaquete = P.idPaquete
    INNER JOIN Usuario U ON U.idUsuario = P.Creador_Paquete
    INNER JOIN Usuario UC ON UC.idUsuario = PC.IdUser
    INNER JOIN PagosPaqueteComprado PP ON PP.IdPaqueteComprado = PC.IdPaqueteComprado
    WHERE PC.IdPaqueteComprado = _idPaquete;
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


-- Procedure Mostrar Servicios de Paquetes por ID
DELIMITER //
CREATE PROCEDURE SP_MostrarServiciosByPaqueteID(
	IN _idPaquete INT
)
BEGIN
    SELECT P.idPaquete, C.idCategoria, C.Nombre_categoria, C.Descripcion_categoria FROM Paquete P 
    INNER JOIN CategoriaPaquete CP ON CP.idPaquete = P.idPaquete
    INNER JOIN Categoria C ON C.idCategoria = CP.idCategoria
    WHERE P.idPaquete = _idPaquete;

END//
DELIMITER ;
