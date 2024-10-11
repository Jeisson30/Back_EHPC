import { Router } from "express";
import { pool } from "../../src/db.js";

const router = Router()

router.get('/payments', (req, res) => {
  const query = 'select * from family where id = ?'
  const id = 1
  
  pool.query(query, [id], (error, results) => {
    if(error){
      console.error('error: ', error)
      return res.status(500).send('Error en la consulta')
    }

    if(results.length > 0){
      return res.json(results)
    } else {
      return res.status(404).send('No se encuentra el ID')
    }
  })
})

export default router