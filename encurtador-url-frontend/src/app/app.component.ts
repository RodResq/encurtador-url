import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
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
  private result$: Observable<Url>;
  campoInputInvalido: boolean;

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
    this.isInvalid();
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

  public isInvalid(): boolean {
    const campoUrl = this.urlForm.get('urlOriginalControl');
    if (campoUrl?.errors?.required && (campoUrl?.pristine || campoUrl.dirty)) {
      this.campoInputInvalido = true;
      this.urlRetorno.novaUrl = '';
      return true;
    } else {
      this.campoInputInvalido = false;
      return  false;
    }
  }

  redirecionar(url: string) {
    this.service.redirecionarUrlOriginal(url);
  }

  search(value) {
    const searchUrl  = value;
    this.result$ = this.service.buscarUrl(searchUrl);
    this.result$
      .pipe(tap(r => console.log(r)))
      .subscribe(retorno => {
        if (retorno) {
          this.urlRetorno = retorno;
        }
      });
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
