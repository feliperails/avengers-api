const sql = require('mssql')

class HeroController {
    async all(request, response) {
        response.header("Access-Control-Allow-Origin", "*");

        const result = await sql.query`select * from avengers.hero ORDER BY name`
        var dataRender = {data: []};
        for (var item of result.recordsets[0]) {
            dataRender.data.push({
                id: item.id_hero,
                name: item.name,
                image: "assets/images/" + item.image_path
            });
        }

        response.json(dataRender.data);
    }

    async getHero(request, response) {
        response.header("Access-Control-Allow-Origin", "*");

        const result = await sql.query`select * from avengers.hero where id_hero = ${request.params.id}`

        var item = result.recordsets[0][0];
        var dataRender = {data: {
            id: item.id_hero,
            name: item.name,
            image: "assets/images/" + item.image_path
        }};

        response.json(dataRender.data);
    }
}


module.exports = HeroController;
