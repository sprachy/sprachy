import { listen } from 'worktop'
import { api } from './api'
listen(api.worktopRouter.run)