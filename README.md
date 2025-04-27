# Giroldo's Font Manager

Um gerenciador de fontes CLI para sistemas Linux que permite instalar, remover, listar e gerenciar arquivos de fonte de forma simples e eficiente.

## Recursos

- Instalar fontes no sistema ou para o usuário atual
- Remover fontes instaladas
- Listar fontes disponíveis
- Obter detalhes de fontes específicas
- Atualizar o cache de fontes

## Instalação

### Via npm (recomendado)

```bash
# Instale globalmente com npm
npm install -g giroldos-font-manager

# Ou com yarn
yarn global add giroldos-font-manager

# Ou com pnpm
pnpm add -g giroldos-font-manager
```

### Pelo repositório

```bash
# Clone o repositório
git clone https://github.com/seuusuario/GiroldosFileManager.git
cd GiroldosFileManager

# Instale as dependências
pnpm install

# Compile o projeto
pnpm build

# Instale globalmente (opcional)
pnpm link --global
```

## Uso

### Instalar Fontes

```bash
# Instalar uma fonte específica
gfm install NomeDaFonte -p /caminho/para/arquivo.ttf

# Instalar todas as fontes do diretório atual
gfm install NomeDaFonte

# Instalar para todo o sistema (requer sudo)
gfm install NomeDaFonte --system
```

### Listar Fontes

```bash
# Listar fontes do usuário
gfm list --user

# Listar fontes do sistema
gfm list --system
```

### Remover Fontes

```bash
# Remover uma fonte do usuário
gfm remove NomeDaFonte --user

# Remover uma fonte do sistema
gfm remove NomeDaFonte --system
```

### Detalhes da Fonte

```bash
# Exibir informações sobre uma fonte
gfm info NomeDaFonte

# Exibir informações detalhadas
gfm info NomeDaFonte --verbose
```

### Atualizar Cache

```bash
# Atualizar cache de fontes do usuário
gfm update-cache --user

# Atualizar cache de fontes do sistema
gfm update-cache --system
```

## Requisitos

- Node.js 18 ou superior
- Sistema operacional Linux

## Licença

MIT
