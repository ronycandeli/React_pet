const router = require("express-promise-router")();
const cadastroPetsController = require("../controllers/cadastroPetsController");

//Rota responsável para listar todos os Pets
router.get('/listPets', cadastroPetsController.ListPets);

//Criar um novo cadastro de um Pet ou varios 
router.post('/createPet', cadastroPetsController.Createpet);

//Atualizar um cadstro
router.put('/updatePet/:Id', cadastroPetsController.UpdatePet);

//Excluir um cadastro
router.delete('/deletePet/:Id', cadastroPetsController.DeletePet);

//Retornar um resgistro pelo Id
router.get('/petById/:Id', cadastroPetsController.PetById);


module.exports = router;

 