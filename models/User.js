const db = require('../database');

class User {

    constructor(name, email, cpf, pass) {
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.pass = pass;
        this.isadmin = 0;
    }

    salvarNoBanco() {
        let insercao = `
        INSERT INTO users (nome, cpf, email, pass, isadmin) VALUES (`+db.escape(this.name)+`, `+db.escape(this.cpf)+`, `+db.escape(this.email)+`, `+db.escape(this.pass)+`, `+db.escape(this.isadmin)+`)`;
        return db.execute(insercao);
    }

    trocarNome(){
        let update = `UPDATE users
                    SET nome = `+db.escape(this.name)+`
                        WHERE email = `+db.escape(this.email)+` AND pass = `+db.escape(this.pass)+``;

        return db.execute(update);
    }

    trocarSenha(){
        let update1 = `UPDATE users
                    SET pass = `+db.escape(this.pass)+`
                        WHERE email = `+db.escape(this.email)+``;

        return db.execute(update1);
    }
}

module.exports = User;