import pool from "../../config/db.js";

//TODO

// 1. Lista de pokemons
// 2. Detalle de un pokemon
// 3. Crear un pokemon
// 4. Actualizar un pokemon
// 5. Borrar un pokemon



const getPokemons = async (id) => {
    const [rows] = await pool.query("SELECT * FROM pokemons WHERE id_user = ?", [id]);
    return rows;
};

const getPokemonsBySlug = async (slug) => {
    const [rows] = await pool.query("SELECT * FROM pokemons WHERE slug = ?", [slug]);
    return rows;
};