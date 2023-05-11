#include "DHT.h"
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecureBearSSL.h>

char* apiDHT11 = "";
char* apiPhoto = "";
char* apiSoil = "";
const char* wifi_ssid = "";
const char* wifi_password = "";
const uint8_t fingerprint[1] = {0xF1};

uint8_t DHTPin = 2;
const int sense_Pin = 16;
#define DHTTYPE DHT11 
#define sensorPin A0
DHT dht(DHTPin, DHTTYPE);
int LED0 = D0;
float t=0;
float h=0;
int idDHT11 = 107;
int idPhoto = 107;
int idSoil = 107;

void setup(void){
  Serial.begin(115200);
  delay(10);
  dht.begin();
  pinMode(DHTPin, INPUT);
  pinMode(sense_Pin, INPUT);
  NetworkSetup();
  randomSeed(analogRead(0));
}


void NetworkSetup() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(wifi_ssid, wifi_password);
  Serial.println("");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi, IP address: ");
  Serial.println(WiFi.localIP());
}


void postDHT11() {
  std::unique_ptr<BearSSL::WiFiClientSecure> client (new BearSSL::WiFiClientSecure);
  client->setFingerprint(fingerprint);
  HTTPClient https;
  
  t = dht.readTemperature();
  h = dht.readHumidity();
  
  if (https.begin(*client, apiDHT11)){
    Serial.println("[HTTP] Llamando");
    https.addHeader("Content-Type","application/json");
    int httpCode = https.POST("{\"idDHT11\":\"" + String(idDHT11) + 
    "\",\"idPlant\":\"" + String(2) + "\",\"envTemperature\":\"" + String(t)+ "\",\"envHumidity\":\"" +String(h)+"\"}");
    if (httpCode > 0 && httpCode == HTTP_CODE_OK){
      String payload = https.getString();
      Serial.println(payload);
      }
    else{
      Serial.printf("[HTTP Error] %s\n", https.errorToString(httpCode).c_str());
      }
    https.end();
    } else{
    Serial.printf("[HTTP Error] Imposible conectar al servidor");
    }
  idDHT11++;
}



void postPhoto() {
  std::unique_ptr<BearSSL::WiFiClientSecure> client (new BearSSL::WiFiClientSecure);
  client->setFingerprint(fingerprint);
  HTTPClient https;
  int fotoLight = analogRead(sensorPin);
  
  if (https.begin(*client, apiPhoto)){
    Serial.println("[HTTP] Llamando");
    https.addHeader("Content-Type","application/json");
    int httpCode = https.POST("{\"idPhotoresistor\":\"" + String(idPhoto) + "\",\"idPlant\":\"" + String(2) + "\",\"light\":\"" + String(fotoLight)+ "\"}");
    if (httpCode > 0 && httpCode == HTTP_CODE_OK){
      String payload = https.getString();
      Serial.println(payload);
      }
    else{
      Serial.printf("[HTTP Error] %s\n", https.errorToString(httpCode).c_str());
      }
    https.end();
    } else{
    Serial.printf("[HTTP Error] Imposible conectar al servidor");
    }
  idPhoto++;
}


void postSoil() {
  std::unique_ptr<BearSSL::WiFiClientSecure> client (new BearSSL::WiFiClientSecure);
  client->setFingerprint(fingerprint);
  HTTPClient https;
  
  int moisture = digitalRead(sense_Pin);

  
  if(moisture == 1){
    moisture = 0;
  }else{
    moisture = 1;
  }
  
  if (https.begin(*client, apiSoil)){
    Serial.println("[HTTP] Llamando");
    https.addHeader("Content-Type","application/json");
    int httpCode = https.POST("{\"idSoilMoisture\":\"" + String(idSoil) + "\",\"idPlant\":\"" + String(2) + "\",\"soilMoistureB\":\"" + String(moisture)+ "\"}");
    if (httpCode > 0 && httpCode == HTTP_CODE_OK){
      String payload = https.getString();
      Serial.println(payload);
      }
    else{
      Serial.printf("[HTTP Error] %s\n", https.errorToString(httpCode).c_str());
      }
    https.end();
    } else{
    Serial.printf("[HTTP Error] Imposible conectar al servidor");
    }
  idSoil++;
}

unsigned long antNow, now = 0;

void loop(void){
  now = millis();
  if(now - antNow > 1800000){
    antNow = now;
    postDHT11();
    postPhoto();
    postSoil();
  }
}
