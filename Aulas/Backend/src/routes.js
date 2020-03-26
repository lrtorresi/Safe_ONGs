const express = require('express');
const routes = express.Router();
const Ong = require('./Controllers/OngController'); //importanto a controller ONGS
const Incidents = require('./Controllers/IncidentsController'); //importanto a controller Incidents
const Profile = require('./Controllers/ProfileController'); //importanto a controller Profile
const Session = require('./Controllers/SessionController'); //importanto a controller Session

//ROTA DE LOGIN
routes.post('/session', Session.create);

//ROTA PARA VER TODAS AS ONGS
routes.get('/ongs', Ong.index);

//ROTA PARA CRIAR UMA ONG
routes.post('/ongs', Ong.create);

//ROTA PARA LOSTAR TODOS INCIDENTS
routes.get('/incidents', Incidents.index);

//ROTA PARA CRIAR UM INCIDENTS
routes.post('/incidents', Incidents.create);

//ROTA PARA APAGAR UM INCIDENTE
routes.delete('/incidents/:id', Incidents.delete);

//ROTA PARA LISTAR APENAS OS INCIDENTES DA ONG ESPECIFICA
routes.get('/profile', Profile.index)

module.exports = routes;