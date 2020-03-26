//VARIAVEIS
const connection = require('../database/connection');//importando a string de conexao 
const crypto = require('crypto'); //Pacote que ja vem no JS para criptografia e gerar strings aleatoria


module.exports = {

    //LISTAR TODAS AS ONGS
    async index (request, response) {
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    //Criar nova ONG
    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        //criar o ID (string aleatoria)
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
        return response.json({ id });
    }
};