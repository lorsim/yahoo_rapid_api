import axios from 'axios'
import dotenv from 'dotenv'
import redis from 'redis'
import asyncHandler from 'express-async-handler'

dotenv.config()

const redisPort = process.env.REDIS_PORT || 6379
const client = redis.createClient(redisPort)

const getAnalysis = asyncHandler( async(req, res) => {

    var symbol = req.query.symbol
    var region = req.query.region

    client.get(symbol, async (err, result) => {
      if (err) throw err

      if (result) {
          res.status(200)
          res.json(JSON.parse(result))
      } else {

          var options = {
            method: 'GET',
            url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-analysis',
            params: {symbol: symbol, region: region},
            headers: {
              'x-rapidapi-key': process.env.RAPID_API_KEY,
              'x-rapidapi-host': process.env.RAPID_API_HOST
            }
          }

        const response = await axios(options)
        if(response.data){
          client.setex(symbol, 600, JSON.stringify(response.data))
          res.status(200)
          res.json(response.data)
        }else{
          res.status(404)
          throw new Error('Query not found')
        }
      }
    })
})

export { getAnalysis }

