-- Procedure Registrar Pago Paquete
DELIMITER //
CREATE PROCEDURE SP_RegPagoPaquete(
	IN _idPaqueteComprado INT,
    IN _PrecioPagado DECIMAL(10,2),
    IN _FormaPago INT
)
BEGIN
	DECLARE MontoPagado DECIMAL(10,2);
    DECLARE MontoTotal DECIMAL(10,2);
    DECLARE Mensaje VARCHAR(100);
    
    SET @MontoPagado = (SELECT SUM(PrecioPagado) FROM PagosPaqueteComprado WHERE IdPaqueteComprado = 5);
    SET @MontoTotal = (SELECT PrecioPagado FROM PaqueteComprado WHERE IdPaqueteComprado = _idPaqueteComprado);
    
    IF (@MontoPagado + _PrecioPagado <= @MontoTotal) THEN 
		INSERT INTO PagosPaqueteComprado(IdPaqueteComprado, PrecioPagado, FormaPago)
			VALUES(_idPaqueteComprado, _PrecioPagado, _FormaPago);
		SET @Mensaje = CONCAT('Pago Completado, Monto Restante: ', CAST((@MontoTotal - @MontoPagado) AS DECIMAL(10,2)));
	ELSE
        SET @Mensaje = CONCAT("Monto a pagar excede el monto restante :", CAST((@MontoTotal - @MontoPagado)AS DECIMAL(10,2)));
	END IF;
    
    SELECT @Mensaje AS mensaje;
END//
DELIMITER ;


-- Procedure Mostrar Historial de Pagos
DELIMITER //
CREATE PROCEDURE SP_MostrarHistorialPagoByID(
    IN _idUser INT,
    IN _idPaqueteComprado INT
)
BEGIN
    SELECT PP.IdPagoPaquete, PC.IdPaqueteComprado, P.idPaquete, PP.PrecioPagado, DATE_FORMAT(PP.FechaPago, '%Y-%m-%d') AS FechaPago, 
    P.Titulo_Paquete, U.Correo_Usuario, U.Username FROM PagosPaqueteComprado PP
    INNER JOIN PaqueteComprado PC ON PC.IdPaqueteComprado = PP.IdPaqueteComprado
    INNER JOIN Paquete P ON P.idPaquete = PC.IdPaquete
    INNER JOIN Usuario U ON U.idUsuario = PC.IdUser
    WHERE P.Creador_Paquete = _idUser AND PC.IdPaqueteComprado = _idPaqueteComprado;
END//
DELIMITER ;


DELIMITER $$
CREATE TRIGGER After_Insert_PagoPaquete
AFTER INSERT
ON PagosPaqueteComprado FOR EACH ROW
BEGIN
	DECLARE MontoPagado DECIMAL(10,2);
    DECLARE MontoTotal DECIMAL(10,2);
    
    IF NEW.IdPaqueteComprado THEN
    
		SET @MontoPagado = (SELECT SUM(PrecioPagado) FROM PagosPaqueteComprado WHERE IdPaqueteComprado = NEW.IdPaqueteComprado);
		SET @MontoTotal = (SELECT PrecioPagado FROM PaqueteComprado WHERE IdPaqueteComprado = NEW.IdPaqueteComprado);
		
        IF @MontoPagado = @MontoTotal THEN
			UPDATE PaqueteComprado SET Pagado = 1 WHERE IdPaqueteComprado = NEW.IdPaqueteComprado;
        END IF;
        
    END IF;
END$$
DELIMITER ;
