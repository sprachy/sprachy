import { listen } from 'worktop'
import { api } from './urls'
listen(api.worktopRouter.run)