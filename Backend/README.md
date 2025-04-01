Climatetracker DOKU

Generell brauchen alle Anfragen, außer /register und /authenticate einen Basic Auth Header mit username und password

USERS:

GET /users:		Gibt eine Liste aller User zurück

GET /users/find:	Gibt einen einzelnen User zurück, falls vorhanden
Param: "username"

PUT /users/elevate:	Macht den angegebenen User zum ADMIN
{„username“: String}

DELETE /users/delete:	Löscht den gegebenen User falls erlaubt
{„username“: String}

METHOD:

GET /method:	Gibt eine List mit allen Methoden zurück

POST /method:	Fügt eine neue Methode hinzu
{„name“: String, „emissionFactor“: Double, „fuelAdjustment“: Double}

DELETE /method:	Löscht die gegebene Methode und alle untergeordneten Aktivitäten
{„name“: String}

ACTIVITY:

GET /acitivity: Gibt alle Activities eines Benutzers zurück
Param: "username"

POST /activity:	Erstellt eine neue Aktivität
{„date“: String ("2015-08-04T10:11:36"), „distance“: Float, „passengerCount“: int, „methodName“: String, „username“: String}

DELETE /activity:	Löscht die Aktivität
{„date“: LocalDateTime}

AUTH: (Benötigen beide kein Authentication Header)

POST: /authentication/register: Registriert einen neuen Benutzer
{„username“: String, „password“: String}

POST: /authentication/authenticate: Authentifiziert einen vorhandenen Benutzer
{„username“: String, „password“: String}
