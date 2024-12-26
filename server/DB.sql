-- Active: 1735138874455@@127.0.0.1@3306@mysql
create database Gestion_Tesis

create table Especialidades(
    codigo_esp int AUTO_INCREMENT PRIMARY KEY,
    nombre_esp VARCHAR(30)
);

create table Consejos_escuela(
    nro_consejo int AUTO_INCREMENT primary key,
    fecha_consejo DATE
);

create table Tesistas(
    cedula_tesista varchar(10) primary key,
    nombre_tesista varchar (70),
    correo_ucab varchar(30),
    correo_particular varchar(30),
    telefono varchar(20)
);

create table Criterios_revision(
    codigo_cr int AUTO_INCREMENT primary key,
    nombre_cr varchar(30),
    tipo enum('I', 'E'),
    puntaje_max int
);

create table Criterios_evaluacion(
    codigo_ce int AUTO_INCREMENT primary key,
    nombre_ce varchar(30),
    tipo enum('I', 'E'),
    puntaje_max int
);

create table Tutores_emp(
    cedula_tutorEmp varchar(10) primary key,
    nombre_tutorEmp varchar(70),
    telefono varchar(20),
    empresa varchar(30)
);

create table Profesores(
    cedula_profesor varchar(10) primary key,
    nombre_profesor varchar(70),
    correo varchar(30),
    telefono varchar(20)
);

create table Externos(
    cedula_profesor varchar(10) primary key,
    institucion varchar(30),
    Foreign Key (cedula_profesor) REFERENCES Profesores(cedula_profesor)
);

create table Internos(
    cedula_profesor varchar(10) primary key,
    direccion varchar(50),
    Foreign Key (cedula_profesor) REFERENCES Profesores(cedula_profesor)
);

create table Se_especializa(
    cedula_profesor varchar(10),
    codigo_esp int,
    primary key (cedula_profesor, codigo_esp),
    Foreign Key (cedula_profesor) REFERENCES Profesores(cedula_profesor),
    Foreign Key (codigo_esp) REFERENCES Especialidades(codigo_esp)
);

create table Intereses(
    cedula_tesista varchar(10),
    interes varchar(100),
    primary key (cedula_tesista, interes),
    Foreign Key (cedula_tesista) REFERENCES Tesistas(cedula_tesista)
);

create table Propuestas(
    codigo_prop int auto_increment primary key,
    titulo varchar (100),
    f_pres_comite date,
    resultado_comite enum('Aprobado', 'No Aprobado'),
    observ_comite varchar(150),
    f_ent_escuela date,
    fecha_defensa datetime,
    nro_consejo int,
    res_consejo enum ('Aprobado', 'No Aprobado'),
    com_consejo varchar(150),
    cedula_profesorT varchar(10),
    cedula_profesorR varchar(10),
    fecha_revision date,
    res_revision enum ('PAR', 'PRR'),
    Foreign Key (nro_consejo) REFERENCES Consejos_escuela(nro_consejo),
    Foreign Key (cedula_profesorT) REFERENCES Internos(cedula_profesor),
    Foreign Key (cedula_profesorR) REFERENCES Internos(cedula_profesor)
);

create table Experimentales(
    codigo_prop int,
    Foreign Key (codigo_prop) REFERENCES Propuestas(codigo_prop)
);

create table Instrumentales(
    codigo_prop int,
    cedula_tutorEmp varchar(10),
    Foreign Key (codigo_prop) REFERENCES Propuestas(codigo_prop),
    Foreign Key (cedula_tutorEmp) REFERENCES Tutores_emp(cedula_tutorEmp)
);

create table Evaluacion_prop(
    codigo_prop int,
    codigo_cr int,
    nota decimal(18,2),
    primary key(codigo_prop, codigo_cr), 
    Foreign Key (codigo_prop) REFERENCES Propuestas(codigo_prop),
    Foreign Key (codigo_cr) REFERENCES Criterios_revision(codigo_cr)
);

create table Proponen(
    cedula_tesista varchar(10),
    codigo_prop int,
    primary key(codigo_prop, cedula_tesista),
    Foreign Key (cedula_tesista) REFERENCES Tesistas(cedula_tesista),
    Foreign Key (codigo_prop) REFERENCES Propuestas(codigo_prop)
);

create table Es_jurado(
    codigo_prop int,
    cedula_profesor varchar(10),
    primary key(codigo_prop, cedula_profesor),
    Foreign Key (codigo_prop) REFERENCES Propuestas(codigo_prop),
    Foreign Key (cedula_profesor) REFERENCES Profesores(cedula_profesor)
);

create table Evaluacion_tesista(
    codigo_prop int,
    cedula_tesista varchar(10),
    cedula_profesor varchar(10),
    codigo_ce int,
    nota decimal(18,2),
    primary key(codigo_prop, cedula_tesista, cedula_profesor, codigo_ce),
    Foreign Key (codigo_prop, cedula_tesista) REFERENCES Proponen(codigo_prop, cedula_tesista),
    Foreign Key (cedula_profesor) REFERENCES Profesores(cedula_profesor),
    Foreign Key (codigo_ce) REFERENCES Criterios_evaluacion(codigo_ce)
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
