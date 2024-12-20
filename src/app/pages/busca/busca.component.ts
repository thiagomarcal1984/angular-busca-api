import { Passagem } from 'src/app/core/types/type';
import { PassagensService } from './../../core/services/passagens.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {
  passagens: Passagem[] = []
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
      res => {
        console.log(res)
        this.passagens = res.resultado
        console.log(this.passagens)
      }
    )
  }
}
