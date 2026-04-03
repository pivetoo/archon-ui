# archon-ui

Base inicial do framework frontend do `Archon`, derivada da camada visual do `dRTS`.

## Estado atual

- componentes e estrutura visual copiados do `dRTS`;
- setup de build como biblioteca React com Vite;
- exports públicos preservados para facilitar a transição.

## Próximos passos

- adaptar `httpClient` para o padrão de resposta do `Archon`;
- trocar o acoplamento de `IdentityProvider` para `IdentityManagement`;
- remover o acoplamento estrutural com OData;
- revisar exemplos e textos ainda herdados do `dRTS`.
