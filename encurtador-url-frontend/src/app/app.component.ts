import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {EncurtadorUrlService} from './service/encurtador-url.service';
import {Url} from './domain/url';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'encurtador-url-frontend';
  urlReduzida: String = '';
  urlRetorno = new Url();
  destroy$: Subject<boolean> = new Subject<boolean>();
  urlForm: FormGroup;
  campoInvalido: Boolean = false;

  constructor(
    private router: Router,
    private service: EncurtadorUrlService,
    private formBuilder: FormBuilder) {
  }


  ngOnInit(): void {
    const fb = this.formBuilder;
    this.urlForm = fb.group({
      urlOriginalControl: [null, Validators.required]
    })
  }

  onClick(url: String) {
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

  redirecionar(url: String) {
    this.service.redirecionarUrlOriginal(url);
  }


  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
