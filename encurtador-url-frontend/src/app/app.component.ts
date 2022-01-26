import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {EncurtadorUrlService} from './service/encurtador-url.service';
import {Url} from './domain/url';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  title = 'encurtador-url-frontend';
  urlReduzida: String = '';
  urlRetorno = new Url();
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private service: EncurtadorUrlService) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onClick(url: String) {
    this.urlReduzida = url;
    this.service.encurtarUrl(url)
      .pipe(takeUntil(this.destroy$))
      .subscribe((retorno: Url) => {
      this.urlRetorno = retorno;
      console.log(this.urlRetorno);
    })
  }

  redirecionar(url: String) {
    this.service.redirecionarUrlOriginal(url);
  }
}
