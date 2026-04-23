CREATE DATABASE tiendanode;
USE tiendanode;

CREATE TABLE IF NOT EXISTS marcas(
                                     id					 INT AUTO_INCREMENT PRIMARY KEY,
                                     nombremarca 		 VARCHAR(100) NOT NULL,
    create_at 			 TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at 			 TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE current_timestamp
    )ENGINE= INNODB;


INSERT INTO marcas (nombremarca) VALUES ('Samsung');
UPDATE marcas SET nombremarca = 'HP' WHERE id  = 1;
Select * from marcas;


CREATE TABLE IF NOT EXISTS productos (
                                         id 			INT AUTO_INCREMENT PRIMARY KEY,
                                         idmarca		INT NOT NULL,
                                         nombre 		VARCHAR(150) NOT NULL,
    precio		DECIMAL(7,2) NOT NULL,
    garantia 	TINYINT COMMENT 'se debera indicar en meses',
    descripcion VARCHAR(100) NOT NULL,
    fechacompra DATE NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON
    UPDATE current_timestamp,
    CONSTRAINT fk_idmarca_prd FOREIGN KEY (idmarca) REFERENCES marcas(id)
    )engine = InnoDB;

INSERT INTO productos (idmarca, nombre, precio,  garantia, descripcion, fechacompra) VALUES
                                                                                         (1, 'Monitor Led', 400, 24, 'Resolucion Full HD - 60H', '2026-02-01'),
                                                                                         (2, 'Micropocesador', 700, 12, 'Ryzen 5 - 5200', '2026-03-10');

UPDATE productos SET descripcion = 'Resolucion full HD - 120Hz' WHERE id = 1;
Select * from productos;