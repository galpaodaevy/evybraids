# Guia de edição

## Textos e links

Edite `index.html`. Os blocos estão identificados por `inicio`, `agenda`, `mural` e `a-evy`. Mantenha os identificadores dos campos de formulário, pois o JavaScript usa esses nomes.

O endereço oficial está no link `canonical`, nos metadados `og:url` e nas imagens `og:image` e `twitter:image`. O botão de compartilhar usa o endereço definido em `assets/js/app.js`. Se o domínio mudar, atualize esses lugares juntos.

## Agendamento

Em `index.html`, o campo `service` contém as referências oferecidas. Os botões do mural usam `data-service`; seu valor deve corresponder exatamente a uma opção do campo.

Em `assets/js/app.js`:

- `available()` define os dias ilustrativos: terça a sábado, a partir de amanhã, até 90 dias à frente.
- `renderTimes()` define os horários: sábado às 09:00 e 13:00; demais dias às 09:00, 14:00 e 17:00.
- `generatedMessage()` define a mensagem sugerida. A cliente pode editá-la.

Essas regras são de demonstração. Para receber reservas reais, é necessário conectar uma agenda com disponibilidade compartilhada, prevenir conflitos e confirmar os pedidos. O site atual não coleta nem armazena dados de agendamento em servidor.

## Fotos

Coloque fotos usadas pela página em `assets/images/` e atualize o `src` e o texto `alt` no HTML. Guarde originais em `originals/photos/` somente quando houver intenção de mantê-los públicos. Prefira WebP e dimensões adequadas à exibição para reduzir o tempo de carregamento.

Cada publicação do Instagram tem um link para o post original. Ao trocar uma foto, atualize também esse link e o registro em `assets/images/instagram-sources.json`.

## Cores, fontes e marca

As cores estão nas variáveis no início de `assets/css/style.css`. O modo escuro é o padrão. Os ajustes do modo claro ficam em `[data-theme=light]`.

As fontes Anton, Permanent Marker e Barlow são servidas de `assets/fonts/`. Os caminhos de fonte no CSS são relativos à pasta `assets/css/`.

- `assets/brand/evy-icon.svg`: ícone vermelho com silhueta preta.
- `assets/brand/evy-logo-site.svg`: logo para fundo escuro.
- `assets/brand/evy-logo-site-light.svg`: logo para fundo claro.
- `assets/brand/evy-profile.png`: imagem quadrada para perfil.
- `brand/source/`: versões SVG e VectorCraft editáveis.
- `brand/exports/`: arquivos PNG e JPG prontos para uso.

## Imagem do link compartilhado

`assets/images/agendamentos.jpg` tem 1200 × 630 pixels, foto de Evellyn e o título “Agendamentos”. O HTML aponta para a URL pública dessa imagem em Open Graph e Twitter Card. Cada rede decide quando atualizar sua prévia; links já compartilhados podem manter a imagem antiga em cache.

## Conferência antes de publicar

Rode `npm run check`. Depois abra a prévia com `npm start` e confira no computador e no celular: tema, escolha de referência, dia e horário, edição e cópia da mensagem, favoritas e links do Instagram.

Faça commit e envie para `main`. Acompanhe a publicação em **Actions** no GitHub. A versão anterior do código foi preservada em `archive/previous-site/`; as imagens que ela referenciava foram organizadas em outras pastas, portanto esse arquivo é um registro de código, não uma segunda página ativa.
