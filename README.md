# Evy Braids

Site da trancista Evellyn Guimarães, com identidade de colagem, mural de referências e pedido de agendamento personalizado.

**Site oficial:** [galpaodaevy.github.io/evybraids](https://galpaodaevy.github.io/evybraids/)  
**Instagram:** [@evygbraids](https://www.instagram.com/evygbraids/)

## O que está pronto

- Modo escuro principal e alternância para o modo claro, com preferência salva no navegador.
- Calendário aberto no início, seleção de referência, dia e horário.
- Pedido com nome, comprimento, cores, acessórios e mensagem editável para enviar à Evy.
- Mural com favoritas locais e publicações com links para o Instagram.
- Ícone, logos e imagem de compartilhamento com Evellyn e “Agendamentos”.

> A agenda é demonstrativa. Os horários são ilustrativos e não são sincronizados com a agenda da profissional. Preparar um pedido não reserva uma vaga. A cliente copia a mensagem e envia pelo Instagram; a Evy confirma disponibilidade, valor, duração e materiais. As curtidas guardam favoritas apenas neste navegador.

## Organização

```text
index.html                 Conteúdo da página publicada
assets/
  css/style.css            Estilos, colagens e adaptações para celular
  js/app.js                Calendário, mensagem, temas, favoritas e compartilhamento
  images/                  Fotos e capa de compartilhamento usadas no site
  fonts/                   Fontes locais e suas licenças
  brand/                   Ícone e logos usados no site
brand/
  source/                  Originais editáveis em SVG e VectorCraft
  exports/                 Logos exportadas em PNG e imagem para compartilhar
originals/photos/          Fotos originais preservadas
archive/previous-site/     HTML, CSS e JavaScript da versão anterior
docs/                     Guia de edição e informações sobre imagens
scripts/                  Verificação e prévia local
```

## Abrir e conferir localmente

Com Node.js 18 ou mais recente, sem instalar dependências:

```sh
npm start
```

Abra o endereço informado, normalmente `http://127.0.0.1:4173`. Encerre com `Ctrl+C`.

Para verificar os caminhos dos arquivos, as referências de compartilhamento e a sintaxe do JavaScript:

```sh
npm run check
```

## Editar e publicar

Veja [o guia de edição](docs/EDICAO.md) para alterar textos, fotos, serviços e horários. Os arquivos da marca estão em [brand](brand/) e as fontes e imagens estão descritas em [IMAGENS-E-LICENCAS.md](docs/IMAGENS-E-LICENCAS.md).

O site é estático: não precisa de compilação, conta de hospedagem adicional ou banco de dados. O `index.html` permanece na raiz para GitHub Pages. Em **Settings → Pages**, a publicação deve usar **Deploy from a branch → main → /(root)**. O arquivo `.nojekyll` permite publicar os arquivos estáticos diretamente.

As pastas `originals/` e `archive/` são públicas neste repositório. Não coloque documentos pessoais, senhas ou dados de clientes nelas.
