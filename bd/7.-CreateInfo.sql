USE weddingPlanning;

INSERT INTO Rol (Nombre_Rol) VALUES ('Cliente');
INSERT INTO Rol (Nombre_Rol) VALUES ('Organizador');
INSERT INTO Rol (Nombre_Rol) VALUES ('Administrador');

INSERT INTO Genero (Nombre_Genero) VALUES ('Masculino');
INSERT INTO Genero (Nombre_Genero) VALUES ('Femenino');

CALL SP_RegUsuario("Sebastian", "Solis","Cantu", "sebas@gmail.com","MyDream12_@","Zodiac",'8122996644', 1, 1, NOW());
CALL SP_RegUsuario("Javier Oziel", "Ramirez","Castañeda", "javier@gmail.com","MyDream23_@","Xodia",'8122996644', 2, 1, '2005/08/08');
CALL SP_RegUsuario("Emilio Gabriel", "Ramirez","Leos", "juan@gmail.com","MyDream23_@","Xodia11",'8122996644', 3, 1, '2005/08/08');
CALL SP_RegUsuario('Luis Jaime','Mier','Rodriguez','luis@gmail.com','rectoria','James07','8122996644', 3, 1, '2002/02/02');

select*from usuario;
CALL SP_BuscarUsuario("sebas@gmail.com", "MyDream12_@");

CALL SP_RegCategoria("Musica", "Dedicadas a musica", 2);
CALL SP_RegCategoria("Foto/Video", "Dedicadas a Foto/Video", 2);
CALL SP_RegCategoria("Comida", "Dedicadas a Comida", 2);
CALL SP_RegCategoria("Salon", "Dedicadas a Salon", 2);
CALL SP_RegCategoria("Decoración", "Dedicadas a Decoración", 2);
CALL SP_RegCategoria("Ambientación", "Dedicadas a Ambientación", 2);
CALL SP_RegCategoria("Invitaciones", "Dedicadas a Invitaciones", 2);

select* from categoria;

select * from reporte_paquetes