import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'AMK Balkan API Server is running',
    timestamp: new Date().toISOString(),
  })
})

app.post('/api/sos/create', (req: Request, res: Response) => {
  const { memberId, location, issue } = req.body
  if (!memberId || !location) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }
  res.json({
    sosId: `SOS-${Date.now()}`,
    status: 'pending',
    memberId,
    location,
    issue,
    createdAt: new Date().toISOString(),
  })
})

app.get('/api/drivers/nearby', (req: Request, res: Response) => {
  const { lat, lng } = req.query
  if (!lat || !lng) {
    res.status(400).json({ error: 'Missing required query parameters: lat and lng' })
    return
  }
  res.json({
    drivers: [{
      driverId: 'driver1',
      name: 'Milan Predic',
      lat: parseFloat(lat as string),
      lng: parseFloat(lng as string),
      rating: 4.8,
      distance: 2.5,
    }],
  })
})

app.listen(port, () => {
  console.log(`✓ AMK Balkan API Server running at http://localhost:${port}`)
})
