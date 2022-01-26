import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {EncurtadorUrlService} from './shared/service/encurtador-url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'encurtador-url-frontend';
  urlReduzida: String = '';

  constructor(
    private router: Router,
    private service: EncurtadorUrlService) {
  }

  onClick(url: String) {
    console.log(url)
    this.urlReduzida = url;
    this.service.encurtarUrl(url).subscribe(r => {
      console.log(r)
    })
  }
}
