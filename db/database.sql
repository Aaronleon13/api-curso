-- Creacion de tabla usuarios

CREATE TABLE users(
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_visible BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Insertar usuario de prueba
INSERT INTO users (name, email, password) VALUES
('Test User', 'test@example.com', 'password123'),
('Jane Doe', 'jane.doe@example.com', 'password456'),
('John Smith', 'john.smith@example.com', 'password789');


-- Crear indice en el campo email para optimizar busquedas
CREATE INDEX idx_email ON users(email);

SELECT name, email FROM users WHERE is_visible = TRUE;

DELETE FROM users WHERE id_user = 2;