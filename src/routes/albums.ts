import { Router } from 'express';
import { getAlbums } from '../controllers/albums';

const router = Router();

/**
 * GET Albums
 * @parm artistName
 */
router.get('/:artistName', getAlbums);

export default router;

