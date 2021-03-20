import axios from 'axios'
import dotenv from 'dotenv'
import asyncHandler from 'express-async-handler'

dotenv.config()

var options = {
    method: 'GET',
    url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis',
    params: {symbol: 'AMRN'},
    headers: {
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      'x-rapidapi-host': process.env.RAPID_API_HOST
    }
  }
  

const getAnalysis = asyncHandler( async(req, res) => {
    const response = await axios(options)
    if(response.data){
      res.json(response.data)
    }else{
      res.status(404)
      throw new Error('Query not found')
    }
})

export { getAnalysis }

