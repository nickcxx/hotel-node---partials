 const express = require("express");
const router = express.Router();
const {body, validationResult } = require ("express-validator")
 
router.get("/", (req, res)=>{
    res.render("pages/index-adm");
})
 
 
router.get("/adm-cliente-novo", (req, res)=>{
res.render("pages/adm-cliente-novo",{"resultado":null,"erros":null, "valores":{"nome":"","cep":"","senha":"","nomeUsuario":"","email":""}});
})
 
router.get("/adm-cliente", (req, res)=>{
    res.render("pages/adm-cliente");
})
 
router.post("/adm-cliente-novo",
    body("nomeUsuario").isLength(({ min: 2, max: 50 }))
    .withMessage('O nome deve ter entre 2 e 50 caracteres.'),
 
    body("nome").trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('O nome deve ter entre 2 e 100 caracteres.')
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
    .withMessage('O nome deve conter apenas letras e espaços.'),
 
   body("email").isEmail()
    .withMessage("coloque um email valido !"),
 
   body("senha").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/)
    .withMessage("A senha deve conter 8 caracteres, uma letra maiuscula e minuscula e um caractere especial"),
 
   body("cep").matches(/^\d{5}\d{3}$/)
    .withMessage("O CEP deve estar no formato 00000-000"),
 
    (req, res)=>{
 
          const errors = validationResult(req);
     if (!errors.isEmpty()){
          console.log(errors)
          return res.render("pages/adm-cliente-novo", {"erros":errors, "valores":req.body, "resultado":req.body});
     }
 
    let nome = req.body.nome
    let email = req.body.email
    let senha = req.body.senha
    let cep = req.body.cep
    let nomeUsuario = req.body.nomeUsuario;
 
 
 
 
res.render("pages/adm-cliente-novo",{"resultado":null,"erros":null, "valores":{"nome":"nome","cep":"cep","senha":"senha","nomeUsuario":"nomeUsuario","email":"email"}});
})
 
router.get("/adm-cliente-edit", (req, res)=>{
    res.render("pages/adm-cliente-edit");
})
 
router.get("/adm-cliente-list", (req, res)=>{
    res.render("pages/adm-cliente-list");
})
 
router.get("/adm-cliente-del", (req, res)=>{
    res.render("pages/adm-cliente-del");
})
 
 
 
 
 
 
 
module.exports = router;