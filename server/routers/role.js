const express =  require('express');
const router = express.Router();
const roleController = require('../controllers/role');

router.get('/', roleController.getAllRole);
router.get('/:roleId', roleController.getRoleById);
router.post('/', roleController.addNewRole);
router.delete('/:roleId', roleController.deleteRole);
router.put('/:roleId', roleController.updateRole)
router.patch('/:roleId/status', roleController.updateRoleStatus)

module.exports = router;