import publicacionRepository from '../repository/publicacionRepository.js';

export default class publicacionService {
    constructor() {
        this.repositoryUso = new publicacionRepository;
    }

     getAllAsync = async () => {
        const returnArray = await this.repositoryUso.getAll();
        if (returnArray == null) return null;
        return returnArray
    }

    getByIdAsync = async (id) => {
        const returnEntity = await this.repositoryUso.getByIdAsync(id)
        return returnEntity;
    }

    createAsync = async (entity) => {
        const rowsAffected = await this.repositoryUso.createAsync(entity);
        return rowsAffected;
    }

    updateAsync = async (entity) => {  
        const rowsAffected = await this.repositoryUso.updateAsync(entity);
        return rowsAffected;
    }

    deleteByIdAsync = async (id) => {
        const rowsAffected = await this.repositoryUso.deleteByIdAsync(id);
        return rowsAffected;
    }

}