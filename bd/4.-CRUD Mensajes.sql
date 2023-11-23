-- Procedure Enviar Mensaje
DELIMITER //
CREATE PROCEDURE SP_EnviarMensaje(
    IN _idEmisor INT,
	IN _idReceptor INT,
    IN _Mensaje VARCHAR(500)
)
BEGIN
    INSERT INTO Mensajes(Mensaje, Emisor, Receptor)
		VALUES(_Mensaje, _idEmisor, _idReceptor);
END//
DELIMITER ;

-- Procedure Mostrar Mensajes
DELIMITER //
CREATE PROCEDURE SP_MostrarMensajes(
    IN _idEmisor INT,
	IN _idReceptor INT
)
BEGIN
    SELECT DISTINCT M.Emisor, E.Username AS Username_Emisor, M.Receptor, R.Username AS Username_Receptor, M.Mensaje,
    CONCAT(DATE_FORMAT(M.Fecha_envio, '%Y-%m-%d')," ",TIME_FORMAT(M.Fecha_envio, "%T")) AS Fecha_envio, TO_BASE64(E.Foto_Perfil) AS Foto_Perfil FROM Mensajes M 
    INNER JOIN usuario E ON E.idUsuario = M.Emisor 
    INNER JOIN usuario R ON R.idUsuario = M.Receptor 
    WHERE (M.Emisor = _idReceptor AND M.Receptor = _idEmisor) 
    OR (M.Emisor = _idEmisor AND M.Receptor = _idReceptor) 
    ORDER BY Fecha_envio ASC;
END//
DELIMITER ;

-- Procedure Mostrar Chats
DELIMITER //
CREATE PROCEDURE SP_MostrarChats(
	IN _idReceptor INT
)
BEGIN
	SELECT DISTINCT
	CASE
        WHEN m.Receptor = _idReceptor THEN u.idUsuario
        ELSE uR.idUsuario
    END AS idUser,
    CASE
        WHEN m.Receptor = _idReceptor THEN u.Username
        ELSE uR.Username
    END AS Username,
    
    (SELECT Mensaje 
     FROM mensajes m2 
     WHERE (m2.Emisor = u.idUsuario AND m2.Receptor = uR.idUsuario)
        OR (m2.Emisor = uR.idUsuario AND m2.Receptor = u.idUsuario)
     ORDER BY m2.Fecha_envio DESC
     LIMIT 1) AS UltimoMensaje,
     
     CONCAT(DATE_FORMAT(MAX(m.Fecha_envio), '%Y-%m-%d')," ",TIME_FORMAT(MAX(m.Fecha_envio), "%T")) AS Fecha_envio, 
     
     CASE
        WHEN m.Receptor = _idReceptor THEN TO_BASE64(u.Foto_Perfil)
        ELSE TO_BASE64(uR.Foto_Perfil)
	 END AS Foto_Perfil
    
	FROM mensajes m
	INNER JOIN usuario uR ON m.Receptor = uR.idUsuario
	INNER JOIN usuario u ON m.Emisor = u.idUsuario
	WHERE m.Emisor = _idReceptor OR m.Receptor = _idReceptor
    GROUP BY idUser, Username, UltimoMensaje
    ORDER BY Fecha_envio DESC;
END//
DELIMITER ;

