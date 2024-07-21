import { Router } from 'express';
import {
  createResource,
  getListResources,
  getResource,
  updateResource,
  deleteResource,
} from '../service/resourceService';
import { validationMiddleware } from '../middlewares/validations/validateDto';
import { CreateResourceDto, UpdatedResourceDto } from '../dtos/resource';

const router: Router = Router();

router.post('/', validationMiddleware(CreateResourceDto),createResource);
router.get('/', getListResources);
router.get('/:id', getResource);
router.put('/:id',validationMiddleware(UpdatedResourceDto), updateResource);
router.delete('/:id', deleteResource);

export default router;
