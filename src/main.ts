import express from 'express';
import cors from "cors";
import { db, firestore } from '../banco_de_dados/firebase';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
}))


app.get('/', (req, res) => {
    res.send('Bem vindo a minha primeira API');
})

app.post("/formulario", async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const descricao = req.body.descricao;

    console.log(req.body);
    try {
        const docRef = await firestore.addDoc(firestore.collection(db, 'formulario'), {
            nome: nome,
            telefone: telefone,
            email: email,
            descricao: descricao,
        })

        res.send("Resposta enviada com sucesso: " + docRef.id)
    } catch (e) {
        console.log("Erro ao enviar resposta:", e);

        res.status(500).send(e);
    }

})

app.put('/atualizarFormulario/:id', async (req, res) => {
    const id = req.params.id
    const nome = req.body.nome

    try {
        await firestore.updateDoc(firestore.doc(db, "formulario", id), {
            nome: nome,
        })
        res.send("Formulario atualizado com sucesso!")
    } catch (e) {
        console.log("Erro ao atualizar formulario:" + e)

        res.status(500).send("Erro ao atualizar formulario:" + e)
    }
})

app.get("/listaFormulario", async (req, res) => {


    try {
        const formulario = await firestore.getDocs(firestore.collection(db, "formulario"))
        const listaFormulario = formulario.docs.map(formulario => ({
            id: formulario.id,
            ...formulario.data()
        }))

        res.send(listaFormulario)
    } catch (error) {
        console.log('ocorreu um erro ao pegar os formulario')
        res.send(error)
    }

})

app.delete('/deletarFormulario/:id', async (req, res) => {
    const id = req.params.id

    try {
        await firestore.deleteDoc(firestore.doc(db, 'formulario', id))

        res.send('Formulario deletado com sucesso!')
    } catch (e) {
        console.log('Erro ao deletar formulario:' + e)

        res.status(500).send('Erro ao deletar formulario:' + e)
    }
})

app.listen(3000, function () {
    console.log("serviço rodando na porta http://localhost:3000");
});
