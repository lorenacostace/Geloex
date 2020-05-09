'use strict';

class UserRepository {
    constructor(repository) {
        this.repository = repository;
    }
    getList(id, role){
      //Tipo profesor
        if(role === 'profesor'){
            //Conseguimos los usuarios
            //Filtramos
        }
 
      //Tipo administrador de sistema
        if(role === 'adminS'){
            // Conseguimos los usuarios
        }
        return this.repository.find();
    }
}

module.exports = UserRepository;