# Buscando passagens
## Preparando o ambiente
- [Layout do Figma](https://www.figma.com/community/file/1416571124509342695)
- [Download do projeto inicial](https://github.com/alura-cursos/3325-jornada-milhas/archive/refs/heads/main.zip)
- [Imagens para o projeto](https://cdn3.gnarususercontent.com.br/3325-angular/Interface%20Desktop.zip)
- [Código do backend](https://github.com/viniciosneves/jornada-milhas-api)

## Criando componente de busca
Criando o `BuscaComponent` com a Angular CLI:
```bash
ng g c pages/busca
# Output
CREATE src/app/pages/busca/busca.component.html (20 bytes)
CREATE src/app/pages/busca/busca.component.spec.ts (552 bytes)
CREATE src/app/pages/busca/busca.component.ts (199 bytes)
CREATE src/app/pages/busca/busca.component.scss (0 bytes)
```

Acrescentaremos o componente ao roteamento:
```TypeScript
// src\app\app-routing.module.ts

// Resto do código
import { BuscaComponent } from './pages/busca/busca.component';

const routes: Routes = [
  // Resto do código
  {
    path: 'busca',
    component: BuscaComponent
  },
];
// Resto do código
```

E finalmente vamos estruturar o HTML de `BuscaComponent`:
```HTML
<!-- src\app\pages\busca\busca.component.html -->
 
<div class="busca-page">
  <app-banner src="assets/imagens/banner-busca.png" alt=""/>
  <app-container>
    <app-form-busca/>
    <section class="conteudo">
      Filtros, Cards de Recomendados e Cards de Passagens
    </section>
  </app-container>
</div>
```
