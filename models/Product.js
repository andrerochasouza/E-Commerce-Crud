const db = require('../database');

class aula{
    constructor(nomeAula, materiaAula, professorAula, precoAula, imageAula){
        this.nomeAula=nomeAula, 
        this.materiaAula=materiaAula,
        this.professorAula=professorAula, 
        this.precoAula=precoAula, 
        this.imageAula=imageAula
    }

    adicionarAula(){
        let insercao = `INSERT INTO aulas (nomeAula, materiaAula, professorAula, precoAula, imageAula)
        values (
            `+db.escape(this.nomeAula)+`,
            `+db.escape(this.materiaAula)+`,
            `+db.escape(this.professorAula)+`,
            `+db.escape(this.precoAula)+`,
            `+db.escape(this.imageAula)+``;

        return db.execute(insercao);
    }

};

module.exports = aula;