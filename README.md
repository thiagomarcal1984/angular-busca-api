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

## Navegando com os dados
Vamos criar um novo evento de realização de busca em `FormBuscaComponent` e criar um método para emitir esse evento:
```TypeScript
// src\app\shared\form-busca\form-busca.component.ts

import { Component, EventEmitter, Output } from '@angular/core';

// Resto do código
export class FormBuscaComponent {
  @Output() realizarBusca = new EventEmitter()

  // Resto do código

    buscar () {
      const formBuscaValue = this.formBuscaService.formBusca.value
      this.realizarBusca.emit(formBuscaValue)
    }
}
```

Vamos criar em `HomeComponent` um método para tratar o evento de realização de busca:
```TypeScript
// src\app\pages\home\home.component.ts

import { Router } from '@angular/router';
// Resto do código

export class HomeComponent implements OnInit {
  constructor(
    // Resto do código
    private router : Router,
  ) { }
  // Resto do código
  navegarParaBusca(ev: any) {
    this.router.navigate(['busca'])
  }
}
```

E finalmente vamos atualizar o HTML para ligar o evento emitido ao método de tratamento do evento:
```HTML
<!-- src\app\pages\home\home.component.html -->

<!-- Resto do código -->
  <app-form-busca (realizarBusca)="navegarParaBusca($event)"></app-form-busca>
<!-- Resto do código -->
```

## Listando as passagens
Vamos exibir as passagens no console do browser, por ora.

Criando o `PassagensService`:
```bash
ng g s core/services/passagens --skip-tests 
# Output
CREATE src/app/core/services/passagens.service.ts (138 bytes)
```

Implementação  do `PassagensService`:
```TypeScript
// src\app\core\services\passagens.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PassagensService {
  apiUrl : string = environment.apiUrl

  constructor(
    private httpClient : HttpClient,
  ) { }

  getPassagens(search: any) {
    const params = search
    return this.httpClient.get(this.apiUrl + '/passagem/search', {params})
  }
}
```

Uso do `PassagensService` em `BuscaComponent`:
```TypeScript
// src\app\pages\busca\busca.component.ts

import { PassagensService } from './../../core/services/passagens.service';
import { Component, OnInit } from '@angular/core';

@Component({
  // Resto do código
})
export class BuscaComponent implements OnInit {
  constructor(
    private passagensService: PassagensService,
  ) {}

  ngOnInit(): void {
    const buscaPadrao = {
      data: new Date().toISOString,
      pagina: 1,
      porPagina: 25,
      somenteIda: false,
      passageirosAdultos: 1,
      tipo: 'Executiva',
    }
    this.passagensService.getPassagens(buscaPadrao).subscribe(
      res => console.log(res)
    )
  }
}
```

Quando visitamos o `BuscaComponent`, o console do browser exibe na saída todas as passagens do tipo "Executiva", conforme a variável `buscaPadrao` de `BuscaComponent`:
```JSON
{
    "paginaAtual": "1",
    "ultimaPagina": 1,
    "total": 10,
    "precoMin": 20,
    "precoMax": 5000,
    "resultado": [
        {
            "id": 2,
            "tipo": "Executiva",
            "precoIda": 2800,
            "precoVolta": 2700,
            "taxaEmbarque": 175,
            "conexoes": 2,
            "tempoVoo": 6,
            "origem": {
                "id": 11,
                "nome": "Paraíba",
                "sigla": "PB"
            },
            "destino": {
                "id": 19,
                "nome": "Roraima",
                "sigla": "RR"
            },
            "companhia": {
                "id": 4,
                "nome": "Latam"
            },
            "dataIda": null,
            "dataVolta": null,
            "orcamento": [
                {
                    "descricao": "1 adulto, executiva",
                    "preco": 2800,
                    "taxaEmbarque": 175,
                    "total": 2975
                }
            ],
            "total": 2975
        },
        // Outros resultados
    ]
}
```
