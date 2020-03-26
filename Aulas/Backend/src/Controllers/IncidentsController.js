//VARIAVEIS
const connection = require('../database/connection');

module.exports = {

    //ROTA PARA VER TODOS INCIDENTES
    async index(request, response) {
        //paginacao
        const { page = 1 } = request.query;
        const incidentes = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp', 
                'ongs.city', 
                'ongs.uf']);

        //total de incidents
        const [count] = await connection('incidents').count();


        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidentes);
    },

    //ROTA PARA CRIAR UM INCIDENTE
    async create(request, reponse) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });
        return reponse.json({ id });
    },

    //ROTA PARA APAGAR UM INCIDENTE
    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operação nao permitida.' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};