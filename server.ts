import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory backend cache & health checks
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      system: 'KSG DEMO GYM SaaS Core',
      version: '3.0.0',
      timestamp: new Date().toISOString()
    });
  });

  // REST API Endpoints for Full-Stack SaaS Architecture
  app.get('/api/stats', (req, res) => {
    res.json({
      totalMembers: 542,
      activeTrainers: 12,
      monthlyRevenue: 1626000,
      activeLeads: 28,
      retentionRate: '94.8%'
    });
  });

  // Notifications Dispatcher Webhook Simulation
  app.post('/api/notifications/dispatch', (req, res) => {
    const { channel, recipient, message, event } = req.body;
    console.log(`[Notification Engine] Sent ${channel} to ${recipient}: [${event}] ${message}`);
    res.json({
      success: true,
      deliveryId: `DEL-${Date.now()}`,
      status: 'Delivered',
      channel,
      timestamp: new Date().toISOString()
    });
  });

  // Payment Webhook Simulation
  app.post('/api/payments/verify-webhook', (req, res) => {
    const { paymentId, amount, status } = req.body;
    res.json({
      verified: true,
      paymentId,
      amount,
      status: status || 'Captured',
      settledAt: new Date().toISOString()
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 KSG DEMO GYM SaaS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
