import { Router } from 'express';

import { filesRoutes } from './file.routes';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Application running' });
});

routes.use('/files', filesRoutes);

export { routes };
