import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EncurtadorUrlService} from './service/encurtador-url.service';
import {Url} from './domain/url';
import {filter, takeUntil, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { debounce } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'encurtador-url-frontend';
  urlReduzida: string = '';
  urlRetorno = new Url();
  destroy$: Subject<boolean> = new Subject<boolean>();
  urlForm: FormGroup;
  campoInvalido: Boolean = false;
  private result$: Observable<Url>;

  constructor(
    private router: Router,
    private service: EncurtadorUrlService,
    private formBuilder: FormBuilder) {
    this.search = debounce(this.search, 1000);
  }


  ngOnInit(): void {
    const fb = this.formBuilder;
    this.urlForm = fb.group({
      urlOriginalControl: [null, Validators.required]
    })
  }

  onClick(url: string) {
    console.log(this.urlForm);
    this.validaCampoUrl(this.urlForm);
    if (url) {
      this.urlReduzida = url;
      this.service.encurtarUrl(url)
        .pipe(takeUntil(this.destroy$))
        .subscribe((retorno: Url) => {
          this.urlRetorno = retorno;
          console.log(this.urlRetorno);
        })
    }
  }

  private validaCampoUrl(urlForm: FormGroup) {
    console.log(urlForm.get('urlOriginalControl'));
    const campoUrl = urlForm.get('urlOriginalControl');
    if (campoUrl?.errors?.required && (campoUrl?.pristine || campoUrl.dirty)) {
      this.campoInvalido = true;
    } else {
      this.campoInvalido = false;
    }
  }

  redirecionar(url: string) {
    this.service.redirecionarUrlOriginal(url);
  }

  search(value) {
    const searchUrl  = value;
    console.log(searchUrl)
    this.result$ = this.service.buscarUrl(searchUrl);
    this.result$
      .subscribe();
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
