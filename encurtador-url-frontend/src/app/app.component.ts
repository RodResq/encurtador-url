import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {EncurtadorUrlService} from './service/encurtador-url.service';
import {Url} from './domain/url';
import {debounce, debounceTime, takeUntil} from 'rxjs/operators';
import {interval, Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('urlLink')
  urlLink: ElementRef<HTMLElement>;

  @ViewChild('urlOriginal')
  urlOriginal = new ElementRef<HTMLInputElement>(null);

  title = 'encurtador-url-frontend';
  urlReduzida: string = '';
  urlRetorno = new Url();
  destroy$: Subject<boolean> = new Subject<boolean>();
  urlForm: FormGroup;
  campoInputInvalido: boolean;

  constructor(
    private router: Router,
    private service: EncurtadorUrlService,
    private formBuilder: FormBuilder,
    private render: Renderer2,
    private elemenRef: ElementRef) {
  }


  ngOnInit(): void {
    const fb = this.formBuilder;
    this.urlForm = fb.group({
      urlOriginalControl: [null, Validators.required]
    });
  }

  get getUrl(){
    return this.urlForm.controls;
  }


  onClick(url: string) {
    this.isInvalid();
    if (url) {
      this.urlReduzida = url;
      this.service.encurtarUrl(url)
        .pipe(takeUntil(this.destroy$))
        .subscribe((retorno: Url) => {
          this.urlRetorno = retorno;
        })
    }
  }

  public isInvalid(): boolean {
    const campoUrl = this.urlForm.get('urlOriginalControl');
    if (campoUrl?.errors?.required && (campoUrl?.pristine || campoUrl.dirty)) {
      this.campoInputInvalido = true;
      return true;
    } else {
      this.campoInputInvalido = false;
      return  false;
    }
  }

  redirecionar(url: string) {
    this.service.redirecionarUrlOriginal(url);
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  buscarUrl(value: string) {
    this.service.buscarUrl(value)
      .pipe(debounceTime(500))
      .subscribe((retorno: Url) => {
        if(retorno) {
          this.urlRetorno = retorno;
        }
      });
  }
}
