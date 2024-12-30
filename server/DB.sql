create database Gestion_Tesis

CREATE TABLE Especialidades (--Form listo
    codigo_esp INT IDENTITY(1,1) PRIMARY KEY,
    nombre_esp VARCHAR(30) NOT NULL
);

CREATE TABLE Consejos_escuela (--Form listo
    nro_consejo VARCHAR(30) PRIMARY KEY,
    fecha_consejo DATE NOT NULL
);

CREATE TABLE Tesistas (--Form listo
    cedula_tesista VARCHAR(10) PRIMARY KEY,
    nombre_tesista VARCHAR(70) NOT NULL,
    correo_ucab VARCHAR(30) NOT NULL,
    correo_particular VARCHAR(30) NOT NULL,
    telefono VARCHAR(20)
);

CREATE TABLE Criterios_revision (
    codigo_cr INT IDENTITY(1,1) PRIMARY KEY,
    nombre_cr VARCHAR(30) NOT NULL,
    tipo VARCHAR(1) NOT NULL CHECK (tipo IN ('I', 'E')),
    puntaje_max INT NOT NULL
);

CREATE TABLE Criterios_evaluacion (
    codigo_ce INT IDENTITY(1,1) PRIMARY KEY,
    nombre_ce VARCHAR(30) NOT NULL,
    tipo VARCHAR(1) NOT NULL CHECK (tipo IN ('I', 'E')),
    puntaje_max INT NOT NULL
);

CREATE TABLE Tutores_emp (--Form listo
    cedula_tutorEmp VARCHAR(10) PRIMARY KEY,
    nombre_tutorEmp VARCHAR(70) NOT NULL,
    telefono VARCHAR(20),
    empresa VARCHAR(30) NOT NULL
);

CREATE TABLE Profesores (--Form listo
    cedula_profesor VARCHAR(10) PRIMARY KEY,
    nombre_profesor VARCHAR(70) NOT NULL,
    correo VARCHAR(30) NOT NULL,
    telefono VARCHAR(20)
);

CREATE TABLE Externos (--Form listo
    cedula_profesor VARCHAR(10) PRIMARY KEY,
    institucion VARCHAR(30) NOT NULL,
    FOREIGN KEY (cedula_profesor) REFERENCES Profesores(cedula_profesor)
);

CREATE TABLE Internos (--Form listo
    cedula_profesor VARCHAR(10) PRIMARY KEY,
    direccion VARCHAR(50),
    FOREIGN KEY (cedula_profesor) REFERENCES Profesores(cedula_profesor)
);

CREATE TABLE Se_especializa (
    cedula_profesor VARCHAR(10) NOT NULL,
    codigo_esp INT NOT NULL,
    PRIMARY KEY (cedula_profesor, codigo_esp),
    FOREIGN KEY (cedula_profesor) REFERENCES Profesores(cedula_profesor),
    FOREIGN KEY (codigo_esp) REFERENCES Especialidades(codigo_esp)
);

CREATE TABLE Intereses (--Form listo
    cedula_tesista VARCHAR(10) NOT NULL,
    interes VARCHAR(100),
    PRIMARY KEY (cedula_tesista, interes),
    FOREIGN KEY (cedula_tesista) REFERENCES Tesistas(cedula_tesista)
);

CREATE TABLE Propuestas (
    codigo_prop INT IDENTITY(1,1) PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    f_pres_comite DATE NOT NULL,
    resultado_comite VARCHAR(20) NOT NULL CHECK (resultado_comite IN ('Aprobado', 'No Aprobado')), 
    observ_comite VARCHAR(150),
    f_ent_escuela DATE NOT NULL,
    fecha_defensa DATETIME NOT NULL,
    nro_consejo varchar(30) NOT NULL,
    res_consejo VARCHAR(20) NOT NULL CHECK (res_consejo IN ('Aprobado', 'No Aprobado')), 
    com_consejo VARCHAR(150),
    cedula_profesorT VARCHAR(10) NOT NULL,
    cedula_profesorR VARCHAR(10) NOT NULL,
    fecha_revision DATE NOT NULL,
    res_revision VARCHAR(20) NOT NULL CHECK (res_revision IN ('PAR', 'PRR')), 
    FOREIGN KEY (nro_consejo) REFERENCES Consejos_escuela(nro_consejo),
    FOREIGN KEY (cedula_profesorT) REFERENCES Internos(cedula_profesor),
    FOREIGN KEY (cedula_profesorR) REFERENCES Internos(cedula_profesor)
);

create table Experimentales(
    codigo_prop int PRIMARY KEY,
    FOREIGN KEY (codigo_prop) REFERENCES Propuestas(codigo_prop)
);

create table Instrumentales(
    codigo_prop int PRIMARY KEY,
    cedula_tutorEmp varchar(10) NOT NULL,
    FOREIGN KEY (codigo_prop) REFERENCES Propuestas(codigo_prop),
    FOREIGN KEY (cedula_tutorEmp) REFERENCES Tutores_emp(cedula_tutorEmp)
);

create table Evaluacion_prop(
    codigo_prop int NOT NULL,
    codigo_cr int NOT NULL,
    nota decimal(18,2) NOT NULL,
    PRIMARY KEY(codigo_prop, codigo_cr), 
    FOREIGN KEY (codigo_prop) REFERENCES Propuestas(codigo_prop),
    FOREIGN KEY (codigo_cr) REFERENCES Criterios_revision(codigo_cr)
);

create table Proponen(
    cedula_tesista varchar(10) NOT NULL,
    codigo_prop int NOT NULL,
    PRIMARY KEY(codigo_prop, cedula_tesista),
    FOREIGN KEY (cedula_tesista) REFERENCES Tesistas(cedula_tesista),
    FOREIGN KEY (codigo_prop) REFERENCES Propuestas(codigo_prop)
);

create table Es_jurado(
    codigo_prop int NOT NULL,
    cedula_profesor varchar(10) NOT NULL,
    PRIMARY KEY(codigo_prop, cedula_profesor),
    FOREIGN KEY (codigo_prop) REFERENCES Propuestas(codigo_prop),
    FOREIGN KEY (cedula_profesor) REFERENCES Profesores(cedula_profesor)
);

create table Evaluacion_tesista(
    codigo_prop int NOT NULL,
    cedula_tesista varchar(10) NOT NULL,
    cedula_profesor varchar(10) NOT NULL,
    codigo_ce int NOT NULL,
    nota decimal(18,2) NOT NULL,
    PRIMARY KEY(codigo_prop, cedula_tesista, cedula_profesor, codigo_ce),
    FOREIGN KEY (codigo_prop, cedula_tesista) REFERENCES Proponen(codigo_prop, cedula_tesista),
    FOREIGN KEY (cedula_profesor) REFERENCES Profesores(cedula_profesor),
    FOREIGN KEY (codigo_ce) REFERENCES Criterios_evaluacion(codigo_ce)
);

--If needed
DROP TABLE IF EXISTS Evaluacion_tesista;

DROP TABLE IF EXISTS Es_jurado;

DROP TABLE IF EXISTS Proponen;

DROP TABLE IF EXISTS Evaluacion_prop;

DROP TABLE IF EXISTS Instrumentales;

DROP TABLE IF EXISTS Experimentales;

DROP TABLE IF EXISTS Propuestas;

DROP TABLE IF EXISTS Intereses;

DROP TABLE IF EXISTS Se_especializa;

DROP TABLE IF EXISTS Internos;

DROP TABLE IF EXISTS Externos;

DROP TABLE IF EXISTS Profesores;

DROP TABLE IF EXISTS Tutores_emp;

DROP TABLE IF EXISTS Criterios_evaluacion;

DROP TABLE IF EXISTS Criterios_revision;

DROP TABLE IF EXISTS Tesistas;

DROP TABLE IF EXISTS Consejos_escuela;

DROP TABLE IF EXISTS Especialidades;

DROP DATABASE IF EXISTS Gestion_Tesis;
