const jwt = require("jsonwebtoken");
const db = require("../config/db");
const dotenv = require("dotenv");

dotenv.config();

//Função para listar todos os Pets cadastrados
exports.ListPets = async (req, res) => {
  const response = await db.query(
    "select * from cadastroPets ORDER BY nomePet ASC"
  );

  if(response.rowCount == 0)
  throw({Message: "Nenhum registro encontrado"})
  res.status(200).send(response.rows);
};

//Criar novos registros de Pets
exports.Createpet = async (req, res) => {
  const { nomePet, idade, racaId } = req.body;

try {
  if (!nomePet || nomePet.length === 0)
      throw { Error: "O campo nomePet não pode ser vazio." };

    if (!idade) throw { Error: "O idade não pode ser vazio." };

    if (!racaId) throw { Error: "O raca não pode ser vazio." };

    const { rows } = await db.query(
      "insert into cadastroPets (nomePet, idade, racaId ) VALUES ($1,$2,$3)",
      [nomePet, idade, racaId]
    );

  res.status(201).send({
    Message: "Salvo com sucesso",
    body: {
      nomePet,
      idade,
      racaId,
    },
  }); 
} catch (error) {
  res.status(500).send(error)
}

};

exports.DeletePet = async (req, res) => {
  const Id = parseInt(req.params.Id);
  const { rows } = await db.query(
    "Delete from cadastroPets where petsId = $1",
    [Id]
  );
  res.status(200).send({
    Message: "Registro deletado com sucesso!",
    ID: Id,
  });
};

//Atualizar registros de Pets existentes
exports.UpdatePet = async (req, res) => {
  const Id = parseInt(req.params.Id);
  const { nomePet, idade, racaId } = req.body;

  try
  {
   const response = await db.query(
     "update cadastroPets SET nomePet = $1, idade=$2, racaId =$3 where petsId = $4",
     [nomePet, idade, racaId, Id]
   );

   res.status(200).send({
     Message: "Atualziado com sucesso",
     body: {
       nomePet,
       idade,
       racaId,
     },
   }); 
  }
   catch (e)
  {
    res.status(500).send({Error : "Erro"})
  }


};

exports.PetById = async (req, res) => {
  const Id = parseInt(req.params.Id);

  try {
    if (!Id) 
      throw ({Error : "Id inválido."});
    
    const response = await db.query(
      "select * from cadastroPets where petsId = $1",
      [Id]
    );

    if (response.rowCount == 0) 
      throw ({ Error: "Nenhum registro encontrado." });
    
    res.status(200).send(response.rows);

  } catch (e) {
    res.status(500).send(e)
  }

};

 function validadeteToken(req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) return res.status(401).send({Authorize:false, Message: "Token não encontrado."})

  jwt.verify(token, process.env.SECRET, function(err,decoded) {
    if(err) 
      {return res
              .status(403) 
              .send({Authorize: false, Message: "Token Inválido" });

              req.userId = decoded.userId;
              next();
      
    }

  })
}

