
import config from './../configs/db-config.js';     
import pool from "../configs/connections.js";

export default class publicacionRepository {
    constructor() {
        this.DBPool = null;
    }

    getDBPool = () => {
        if (this.DBPool == null) {
        this.DBPool = pool;
        }
        return this.DBPool;
    };

     getAll = async () => {
        let returnArray = null;
        try {
            const sql = `SELECT * FROM publicacion`;
            const result = await this.getDBPool().query(sql);
            returnArray = result.rows;
        } catch (error) {
            console.log(error)
        }
        return returnArray;
    }


    //use el usuario id para traer las publicaciones del usuario
    getByIdAsync = async (id) => {
        let returnEntity = null;
        try {
            const sql = `SELECT * FROM publicacion WHERE usuarioId=$1`;
            const values = [id];
            const result = await this.getDBPool().query(sql, values);
            if (result.rows.length > 0){
                returnEntity = result.rows[0];
            }
        } catch (error) {
            console.log(error);
        } 
        return returnEntity;
    }

    // deleteByIdAsync = async (id) => {
    //     let returnRows = null;
    //      try {
    //         const sql = `DELETE FROM publicacion WHERE id=$1`;
    //         const values = [id];
    //         const result = await this.getDBPool().query(sql, values);
    //         returnRows = result.rowCount;
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     return returnRows;
    // }

    //  updateAsync = async (entity) => {
    //     let returnRows = null;
    //      try {
    //         let id = entity.id;
    //         const previousEntity = await this.getByIdAsync(id);
    //         if (previousEntity == null) return 0;
    //         const sql = `UPDATE provincias SET
    //                     name              = $2,
    //                     latitude            = $3,
    //                     longitude            = $4,
    //                     fullname    = $5,
    //                     displayorder       = $6
    //                 WHERE id = $1`;
    //         const values = [
    //         id,
    //         entity?.name           ?? previousEntity?.name,
    //         entity?.latitude         ?? previousEntity?.latitude,
    //         entity?.longitude         ?? previousEntity?.longitude,
    //         entity?.fullname ?? previousEntity?.fullname,
    //         entity?.displayorder    ?? previousEntity?.displayorder
    //     ];
    //         const result = await this.getDBPool().query(sql, values);
    //         returnRows = result.rowCount;
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     return returnRows;
    // }


    // createAsync = async (entity) => {
    //     let newId = 0;

    //     try {
    //         const sql = ` INSERT INTO provincias (
    //                         usuarioID              , 
    //                         urlImagen           , 
    //                         descripcion            
    //                     ) VALUES (
    //                         $1, 
    //                         $2, 
    //                         $3
    //                     ) RETURNING id`;
    //         const values =  [   entity.usuarioID,
    //                             entity.urlImagen,
    //                             entity.descripcion
    //                         ];
    //         const resultPg = await this.getDBPool().query(sql, values);
    //         newId = resultPg.rows[0].id;
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     return newId;
    // }
}