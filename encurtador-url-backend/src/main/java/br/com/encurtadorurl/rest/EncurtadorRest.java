package br.com.encurtadorurl.rest;

import br.com.encurtadorurl.domain.Url;
import br.com.encurtadorurl.repository.UrlRepository;
import br.com.encurtadorurl.service.UrlService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/encurtador-rest/api")
@CrossOrigin(origins = "*")
public class EncurtadorRest {

    @Autowired
    private UrlRepository urlRepository;

    @Autowired
    private UrlService urlService;

    @GetMapping("/test")
    @ResponseBody
    public String encurtador() {
        System.out.println("Entrou no encurtador");
        return "www.abc.com";
    }

    @PostMapping
    public ResponseEntity<Url> salvar(@RequestBody Url url) {
        return new ResponseEntity<>(urlService.salvarUrl(url), HttpStatus.CREATED);
    }
}
