drop database plantsdb;
create database Plantsdb;
use Plantsdb;

create table plants(
    idPlant int(3),
    plantName varchar(20),
    primary key (idPlant)
);

create table dht11(
    idDHT11 int(10),
    idPlant int(3),
    envTemperature int(3),
    envHumidity int(3),
    dateDHT11 DATE,
    timeDHT11 time,
    primary key(idDHT11, idPlant),
    constraint fk_DHT11_plants1
        foreign key(idPlant)
        references plants(idPlant)
);

create table photoresistor(
    idPhotoresistor int(10),
    idPlant int(3),
    light int(5),
    datePhoto date,
    timePhoto time,
    primary key(idPhotoresistor, idPlant),
    constraint fk_photoresistor_plants1
        foreign key(idPlant)
        references plants(idPlant)
);

create table soilMoisture(
    idSoilMoisture int(10),
    idPlant int(3),
    soilMoistureB tinyint(4),
    dateSoil date,
    timeSoil time,
    primary key(idSoilMoisture, idPlant),
    constraint fk_soilMoisture_plants1
        foreign key(idPlant)
        references plants(idPlant)
);